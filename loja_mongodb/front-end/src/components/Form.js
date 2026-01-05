import React, {useEffect, useRef} from "react";
import styled from "styled-components";
import axios from "axios";
import {toast} from "react-toastify";

const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
`

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`

const Input = styled.input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #808080ff;
    color: #fff;
    height: 42px;
`

const Form = ({onEdit, setOnEdit, getItems}) => {
    const ref = useRef();

    useEffect(() => {
        if(!onEdit) return; 

        const form = ref.current;

        form.name.value = onEdit.name;
        form.price.value = onEdit.price;
        form.stock.value = onEdit.stock;
        form.fone.value = onEdit.fone || "";
    }, [onEdit]);

    const handleSubmit = async (e) => { 
        e.preventDefault();

        const form = ref.current;

        const data = {
            name: form.name.value,
            price: Number(form.price.value),
            stock: Number(form.stock.value),
            fone: form.fone.value
        };

        if (!data.name || isNaN(data.price) || isNaN(data.stock)) {
            return toast.warn("Preencha todos os campos obrigatórios!");
        }

        try {
            if(onEdit) {
                await axios.put(`http://localhost:4000/items/${onEdit._id}`, data);
                toast.success('Item atualizado com sucesso!');
            }else {
                await axios.post('http://localhost:4000/items', data);
                toast.success('Item adicionado com sucesso!');
            }
            
            setOnEdit(null);
            ref.current.reset();
            getItems();
        } catch (error) {
            toast.error(error.response?.data || 'Erro ao salvar item!');
        }

    };

    return(
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <label>Nome</label>
                <Input name="name" type="text" autoComplete="off" />
            </InputArea>
            <InputArea>
                <label>Preço</label>
                <Input name="price" type="number" step="0.01" autoComplete="off" />
            </InputArea>
            <InputArea>
                <label>Estoque</label>
                <Input name="stock" type="number" autoComplete="off" />
            </InputArea>
            <InputArea>
                <label>Fone</label>
                <Input name="fone" type="text" autoComplete="off" />
            </InputArea>
            <Button type="submit">
                {onEdit ? 'Atualizar' : 'Salvar'}
            </Button>
        </FormContainer>
    );
}

export default Form;