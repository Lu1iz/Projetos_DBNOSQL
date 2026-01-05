import {createGlobalStyle} from "styled-components";

const globalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        font-family: 'popins', 'sans-serif';
    }

    body {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        background-color: rgb(192, 192, 192);
    }
`

export default globalStyle;