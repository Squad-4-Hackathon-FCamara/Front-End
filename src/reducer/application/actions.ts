// Nesse arquivo são definidas as ações que o reducer pode executar

export enum ActionTypes {
  TOGGLE_ADD_PROJECT_DIALOG = "TOGGLE_ADD_PROJECT_DIALOG",
}

export function toggleAddProjectDialogAction(isOpen: boolean) {
  return {
    type: ActionTypes.TOGGLE_ADD_PROJECT_DIALOG,
    payload: {
      isOpen,
    },
  };
}
