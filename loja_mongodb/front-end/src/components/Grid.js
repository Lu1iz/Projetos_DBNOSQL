import React from "react";
import styled from "styled-components";
import {FaTrash, FaEdit} from "react-icons/fa";
import axios from "axios";
import {toast} from "react-toastify";

const Table = styled.table`
    width: 100%;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    max-width: 800px;
    margin: 20px auto;
    word-break: break-all;
`

const Th = styled.th`
    text-align: start;
    border-bottom: inset;
    padding-bottom: 5px;
`

const Td = styled.td`
    padding-top: 15px;
`

const Grid = ({items = [], setItems, setOnEdit}) => {
    const handleDelete = async (id) => {
        if (!window.confirm("Deseja realmente excluir este item?")) return;

        try {
            await axios.delete(`http://localhost:4000/items/${id}`);
            const newArray = items.filter((item) => item._id !== id);
            setItems(newArray);
            toast.success('Item deletado com sucesso');
        } catch (error) {
            toast.error(error.response?.data || 'Erro ao deletar');
        }
    }

    const handleEdit = (it) => setOnEdit(it);

    return(
        <Table>
            <thead>
                <tr>
                    <Th>Nome</Th>
                    <Th>Preço</Th>
                    <Th>Estoque</Th>
                </tr>
            </thead>

            <tbody>
                {items.length === 0 ? (
                    <tr>
                        <Td>Nenhum item cadastrado</Td>
                    </tr>
                ) :
                items.map((it) => (
                    <tr key={it._id}>
                        <Td>{it.name}</Td>
                        <Td>{it.price}</Td>
                        <Td>{it.stock}</Td>
                        <Td>
                            <FaEdit onClick={() => handleEdit(it)}/>
                        </Td>   
                        <Td>    
                            <FaTrash onClick={() => handleDelete(it._id)}/>
                        </Td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default Grid;