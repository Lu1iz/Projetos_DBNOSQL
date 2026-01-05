import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import GlobalStyle from "./globalStyle";
import Form from "./components/Form.js";
import Grid from "./components/Grid.js";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

const Title = styled.h1``

function App() {
  const [items, setItems] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getItems = async () => {
    try {
      const res = await axios.get('http://localhost:4000/items');
      setItems(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getItems();
  }, []);

  return(
    <>
      <GlobalStyle />
      <Container>
        <Title>Cadastro Itens</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getItems={getItems} />
        <Grid items={items} setItems={setItems} setOnEdit={setOnEdit} />
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left" />
    </>
  )
}

export default App;
