// Reducer é uma forma de organizar as funções da aplicação em um só lugar
// Ele ajuda muito a manter o código mais limpo nos componentes

import { produce } from "immer";
import { ActionTypes } from "./actions";
import { AxiosAPI } from "../../AxiosConfig";

// Interface com as informações da aplicação
export interface ApplicationState {
  addProjectDialogIsOpen: boolean;
}

// Inicia o reducer
export function applicationReducer(state: ApplicationState, action: any) {
  // O switch case é usado para acessar as diferentes ações do reducer
  // Também estamos usando a função produce do immer, para facilitar o trabalho com imutabilidade
  switch (action.type) {
    case ActionTypes.TOGGLE_ADD_PROJECT_DIALOG:
      return produce(state, (draft) => {
        draft.addProjectDialogIsOpen = action.payload.isOpen;
      });

    // Login com email
    case ActionTypes.LOGIN_WITH_EMAIL:
      // Exemplo de uso do Axios
      // Endpoint de teste da api adviceslip, retorna uma piada sobre o Chuck Norris
      AxiosAPI.get("/jokes/random")
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error("HTTP Error code: ", error.statusCode);
        });
      return state;

    // Login com Google
    case ActionTypes.LOGIN_WITH_GOOGLE:
      return state;

    // Cadastro de usuário
    case ActionTypes.REGISTER_USER:
      return state;

    // Adicionar projeto
    case ActionTypes.ADD_NEW_PROJECT:
      console.log(action);
      return state;

    default:
      return state;
  }
}
