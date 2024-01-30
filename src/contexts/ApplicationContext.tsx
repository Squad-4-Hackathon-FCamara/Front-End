// Contexto é uma forma de compartilhar estados entre todos os componentes da aplicação
// Em outras palavras, é um forma de compartilhar um ou mais useState entre os componentes
// Para isso, será utilizado um provedor de contexto no App.tsx

import { ReactNode, createContext, useEffect, useReducer } from 'react'
import {
  ApplicationState,
  Project,
  applicationReducer,
} from '../reducer/application/reducer'
import {
  addNewProjectAction,
  cleanProjectDialogAction,
  deleteProjectAction,
  loginWithEmailAction,
  loginWithGoogleAction,
  registerUserAction,
  toggleAddProjectDialogAction,
  toggleSuccessDialogAction,
  toggleViewProjectDialogAction,
} from '../reducer/application/actions'

// Tipagem do contexto
interface ApplicationContextType {
  applicationState: ApplicationState
  toggleAddProjectDialogIsOpen: (isOpen: boolean) => void
  toggleViewProjectDialogIsOpen: (isOpen: boolean) => void
  cleanProjectDialog: () => void
  toggleSuccessDialog: (isOpen: boolean, message: string) => void
  loginWithEmail: (email: string, password: string) => void
  loginWithGoogle: () => void
  registerUser: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => void
  addNewProject: (
    id: string,
    userId: string,
    title: string,
    tags: string[],
    link: string,
    description: string,
    thumbnail: File,
  ) => void
  deleteProject: (id: string) => void
  projectsList: Project[]
}

// Tipagem do context provider
interface ApplicationContextProviderProps {
  children: ReactNode
}

export type SuccessDialogType = {
  isOpen: boolean
  message: string
}

// Inicia e exporta o contexto
export const ApplicationContext = createContext({} as ApplicationContextType)

// Inicia e exporta o provedor de contexto
export function ApplicationContextProvider({
  children,
}: ApplicationContextProviderProps) {
  // usa o reducer, os parâmetros de useReducer são:
  /*
    reducer: A função criada no reducer.ts
    initialArg: O valor inicial do estado
    init: A função de inicialização do estado
  */
  const initialArg: ApplicationState = {
    addProjectDialogIsOpen: false,
    viewProjectDialogIsOpen: false,
    successDialogIsOpen: false,
    successDialogMessage: '',
    projectInEditor: {
      id: '',
      userId: '',
      title: '',
      tags: [],
      link: '',
      description: '',
      thumbnail: {} as File,
    },
    projectsList: [],
  }

  const [applicationState, dispatch] = useReducer(
    applicationReducer,
    initialArg,
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem(
        '@orange-portfolio:application-state-1.0.0',
      )

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }

      return initialState
    },
  )

  // useEffect para salvar o estado no localStorage
  useEffect(() => {
    const stateJSON = JSON.stringify(applicationState)

    localStorage.setItem('@orange-portfolio:application-state-1.0.0', stateJSON)
  })

  // ▼▼▼ Funções/ações do reducer, são elas que nós vamos de fato usar nos componentes ▼▼▼
  function toggleAddProjectDialogIsOpen(isOpen: boolean) {
    dispatch(toggleAddProjectDialogAction(isOpen))
  }

  function toggleViewProjectDialogIsOpen(isOpen: boolean) {
    dispatch(toggleViewProjectDialogAction(isOpen))
  }

  function cleanProjectDialog() {
    dispatch(cleanProjectDialogAction())
  }

  function toggleSuccessDialog(isOpen: boolean, message: string = '') {
    dispatch(toggleSuccessDialogAction(isOpen, message))
  }

  function loginWithEmail(email: string, password: string) {
    dispatch(loginWithEmailAction(email, password))
  }

  function loginWithGoogle() {
    dispatch(loginWithGoogleAction())
  }

  function registerUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) {
    dispatch(registerUserAction(firstName, lastName, email, password))
  }

  function addNewProject(
    id: string,
    userId: string,
    title: string,
    tags: string[],
    link: string,
    description: string,
    thumbnail: File,
  ) {
    dispatch(
      addNewProjectAction(
        id,
        userId,
        title,
        tags,
        link,
        description,
        thumbnail,
      ),
    )
  }

  function deleteProject(id: string) {
    dispatch(deleteProjectAction(id))
  }

  return (
    <ApplicationContext.Provider
      value={{
        applicationState,
        toggleAddProjectDialogIsOpen,
        toggleViewProjectDialogIsOpen,
        cleanProjectDialog,
        toggleSuccessDialog,
        loginWithEmail,
        loginWithGoogle,
        registerUser,
        addNewProject,
        deleteProject,
        projectsList: applicationState.projectsList,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  )
}
