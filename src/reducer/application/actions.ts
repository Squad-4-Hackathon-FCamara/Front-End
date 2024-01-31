// Nesse arquivo são definidas as ações que o reducer pode executar

export enum ActionTypes {
  TOGGLE_ADD_PROJECT_DIALOG = 'TOGGLE_ADD_PROJECT_DIALOG',
  TOGGLE_VIEW_PROJECT_DIALOG = 'TOGGLE_VIEW_PROJECT_DIALOG',
  TOGGLE_SUCCESS_DIALOG = 'TOGGLE_SUCCESS_DIALOG',
  TOGGLE_DELETE_DIALOG = 'TOGGLE_DELETE_DIALOG',
  STORE_PROJECT_ID_TO_DELETE = 'STORE_PROJECT_ID_TO_DELETE',
  // CLEAN_PROJECT_DIALOG = 'CLEAN_PROJECT_DIALOG',
  // LOGIN_WITH_EMAIL = 'LOGIN_WITH_EMAIL',
  // LOGIN_WITH_GOOGLE = 'LOGIN_WITH_GOOGLE',
  // REGISTER_USER = 'REGISTER_USER',
  // ADD_NEW_PROJECT = 'ADD_NEW_PROJECT',
  // DELETE_PROJECT = 'DELETE_PROJECT',
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

// Limpa o dialog de projeto
// export function cleanProjectDialogAction() {
//   return {
//     type: ActionTypes.CLEAN_PROJECT_DIALOG,
//   }
// }

// Login com email
// export function loginWithEmailAction(email: string, password: string) {
//   return {
//     type: ActionTypes.LOGIN_WITH_EMAIL,
//     payload: {
//       email,
//       password,
//     },
//   }
// }

// Login com google
// export function loginWithGoogleAction() {
//   return {
//     type: ActionTypes.LOGIN_WITH_EMAIL,
//   }
// }

// Cadastro de usuário
// export function registerUserAction(
//   firstName: string,
//   lastName: string,
//   email: string,
//   password: string,
// ) {
//   return {
//     type: ActionTypes.REGISTER_USER,
//     payload: {
//       firstName,
//       lastName,
//       email,
//       password,
//     },
//   }
// }

// Adicionar novo projeto
// export function addNewProjectAction(
//   id: string,
//   userId: string,
//   title: string,
//   tags: string[],
//   link: string,
//   description: string,
//   thumbnail: File,
// ) {
//   return {
//     type: ActionTypes.ADD_NEW_PROJECT,
//     payload: {
//       id,
//       userId,
//       title,
//       tags,
//       link,
//       description,
//       thumbnail,
//     },
//   }
// }

// Exclui um projeto pelo ID
// export function deleteProjectAction(id: string) {
//   return {
//     type: ActionTypes.DELETE_PROJECT,
//     payload: {
//       id,
//     },
//   }
// }
