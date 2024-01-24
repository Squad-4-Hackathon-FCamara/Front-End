// Arquivo que vai renderizar todos os nossos componentes em tela

import "./styles/global.css"
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router"
import { defaultTheme } from "./styles/themes/default";
import { ThemeProvider } from "styled-components";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  )
}
