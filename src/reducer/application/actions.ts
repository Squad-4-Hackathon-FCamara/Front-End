// Nesse arquivo são definidas as ações que o reducer pode executar

export enum ActionTypes {
  TOGGLE_ADD_PROJECT_DIALOG = 'TOGGLE_ADD_PROJECT_DIALOG',
  TOGGLE_VIEW_PROJECT_DIALOG = 'TOGGLE_VIEW_PROJECT_DIALOG',
  TOGGLE_SUCCESS_DIALOG = 'TOGGLE_SUCCESS_DIALOG',
  TOGGLE_DELETE_DIALOG = 'TOGGLE_DELETE_DIALOG',
  STORE_PROJECT_ID_TO_DELETE = 'STORE_PROJECT_ID_TO_DELETE',
  STORE_USER_DATA = 'STORE_USER_DATA',
  STORE_PROJECT_ID_TO_VIEW = 'STORE_PROJECT_ID_TO_VIEW',
}

// Abre dialog de criação de projetos
export function toggleAddProjectDialogAction(isOpen: boolean) {
  return {
    type: ActionTypes.TOGGLE_ADD_PROJECT_DIALOG,
    payload: {
      isOpen,
    },
  }
}

// Abre dialog de visualização de projetos
export function toggleViewProjectDialogAction(isOpen: boolean) {
  return {
    type: ActionTypes.TOGGLE_VIEW_PROJECT_DIALOG,
    payload: {
      isOpen,
    },
  }
}

// Abre dialog de sucesso
export function toggleSuccessDialogAction(
  isOpen: boolean,
  successDialogMessage: string,
) {
  return {
    type: ActionTypes.TOGGLE_SUCCESS_DIALOG,
    payload: {
      isOpen,
      successDialogMessage,
    },
  }
}
// Abre dialog de exclusão
export function toggleDeleteDialogAction(isOpen: boolean) {
  return {
    type: ActionTypes.TOGGLE_DELETE_DIALOG,
    payload: {
      isOpen,
    },
  }
}

// Armazena o ID do projeto que será excluído
export function storeProjectIdToDeleteAction(projectId: string) {
  return {
    type: ActionTypes.STORE_PROJECT_ID_TO_DELETE,
    payload: {
      projectId,
    },
  }
}

// Armazena dados do usuário logado
export function storeUserDataAction(
  id: string,
  firstName: string,
  lastName: string,
  avatarUrl: string,
  projects: any,
) {
  return {
    type: ActionTypes.STORE_USER_DATA,
    payload: {
      id,
      firstName,
      lastName,
      avatarUrl,
      projects,
    },
  }
}

// Armazena o ID do projeto que será visualizado
export function storeProjectIdToViewAction(projectId: string) {
  return {
    type: ActionTypes.STORE_PROJECT_ID_TO_VIEW,
    payload: {
      projectId,
    },
  }
}
