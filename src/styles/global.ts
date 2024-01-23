import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background: ${(props) => props.theme.white};
        color: ${(props) => props.theme["color-neutral-120"]};
        -webkit-font-smoothing: antialiased;
    }
`