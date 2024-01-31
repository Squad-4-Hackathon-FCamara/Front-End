// Arquivo que vai renderizar todos os nossos componentes em tela

import "./styles/global.css";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { defaultTheme } from "./styles/themes/default";
import { ThemeProvider } from "styled-components";
import { ApplicationContextProvider } from "./contexts/ApplicationContext";
import { useEffect, useState } from "react";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <ApplicationContextProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ApplicationContextProvider>
    </ThemeProvider>
  );
}
