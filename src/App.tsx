// Arquivo que vai renderizar todos os nossos componentes em tela

import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router"

export function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}
