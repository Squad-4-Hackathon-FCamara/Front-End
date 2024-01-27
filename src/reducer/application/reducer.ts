// Reducer é uma forma de organizar as funções da aplicação em um só lugar
// Ele ajuda muito a manter o código mais limpo nos componentes

import { produce } from "immer";
import { ActionTypes } from "./actions";

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
    default:
      return state;
  }
}
