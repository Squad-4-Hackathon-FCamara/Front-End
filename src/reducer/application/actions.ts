// Nesse arquivo são definidas as ações que o reducer pode executar

export enum ActionTypes {
  TOGGLE_ADD_PROJECT_DIALOG = "TOGGLE_ADD_PROJECT_DIALOG",
  LOGIN_WITH_EMAIL = "LOGIN_WITH_EMAIL",
  LOGIN_WITH_GOOGLE = "LOGIN_WITH_GOOGLE",
  REGISTER_USER = "REGISTER_USER",
  ADD_NEW_PROJECT = "ADD_NEW_PROJECT",
}

export function toggleAddProjectDialogAction(isOpen: boolean) {
  return {
    type: ActionTypes.TOGGLE_ADD_PROJECT_DIALOG,
    payload: {
      isOpen,
    },
  };
}

// Login com email
export function loginWithEmailAction(email: string, password: string) {
  return {
    type: ActionTypes.LOGIN_WITH_EMAIL,
    payload: {
      email,
      password,
    },
  };
}

// Login com google
export function loginWithGoogleAction() {
  return {
    type: ActionTypes.LOGIN_WITH_EMAIL,
  };
}

// Cadastro de usuário
export function registerUserAction(
  firstName: string,
  lastName: string,
  email: string,
  password: string
) {
  return {
    type: ActionTypes.REGISTER_USER,
    payload: {
      firstName,
      lastName,
      email,
      password,
    },
  };
}

// Adicionar novo projeto
export function addNewProjectAction(
  title: string,
  tags: number[],
  link: string,
  description: string,
  thumbnail: File
) {
  return {
    type: ActionTypes.ADD_NEW_PROJECT,
    payload: {
      title,
      tags,
      link,
      description,
      thumbnail,
    },
  };
}
