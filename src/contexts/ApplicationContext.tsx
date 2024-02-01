// Contexto é uma forma de compartilhar estados entre todos os componentes da aplicação
// Em outras palavras, é um forma de compartilhar informações entre os componentes
// Para isso, será utilizado um provedor de contexto no App.tsx

import { ReactNode, createContext, useEffect, useReducer } from 'react'
import {
  ApplicationState,
  UserData,
  applicationReducer,
} from '../reducer/application/reducer'
import {
  toggleAddProjectDialogAction,
  toggleDeleteDialogAction,
  toggleSuccessDialogAction,
  toggleViewProjectDialogAction,
  storeProjectIdToDeleteAction,
  storeUserDataAction,
  storeProjectIdToViewAction,
} from '../reducer/application/actions'

// Tipagem do contexto
interface ApplicationContextType {
  applicationState: ApplicationState
  toggleAddProjectDialogIsOpen: (isOpen: boolean) => void
  toggleViewProjectDialogIsOpen: (isOpen: boolean) => void
  toggleSuccessDialog: (isOpen: boolean, message: string) => void
  toggleDeleteDialog: (isOpen: boolean) => void
  storeProjectIdToDelete: (projectId: string) => void
  storeUserData: (
    id: string,
    firstName: string,
    lastName: string,
    avatarUrl: string,
    projects: any,
  ) => void
  storeProjectIdToView: (projectId: string) => void
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
    deleteDialogIsOpen: false,
    successDialogMessage: '',
    projectIdToDelete: '',
    userData: {
      id: '',
      firstName: '',
      lastName: '',
      avatarUrl: '',
      projects: [],
    } as UserData,
    projectIdToView: '',
  }

  const [applicationState, dispatch] = useReducer(
    applicationReducer,
    initialArg,
    (initialState) => {
      try {
        const storedStateAsJSON = localStorage.getItem(
          '@orange-portfolio:application-state-1.0.0',
        )

        if (storedStateAsJSON) {
          return JSON.parse(storedStateAsJSON)
        }
      } catch (error) {
        console.error('Erro: ', error)
      }

      return initialState
    },
  )

  // useEffect para salvar o estado no localStorage
  useEffect(() => {
    const stateJSON = JSON.stringify(
      applicationState ?? ({} as ApplicationState),
    )

    localStorage.setItem('@orange-portfolio:application-state-1.0.0', stateJSON)
  })

  // ▼▼▼ Funções/ações do reducer, são elas que nós vamos de fato usar nos componentes ▼▼▼
  function toggleAddProjectDialogIsOpen(isOpen: boolean) {
    dispatch(toggleAddProjectDialogAction(isOpen))
  }

  function toggleViewProjectDialogIsOpen(isOpen: boolean) {
    dispatch(toggleViewProjectDialogAction(isOpen))
  }

  function toggleSuccessDialog(isOpen: boolean, message: string = '') {
    dispatch(toggleSuccessDialogAction(isOpen, message))
  }

  function toggleDeleteDialog(isOpen: boolean) {
    dispatch(toggleDeleteDialogAction(isOpen))
  }

  function storeProjectIdToDelete(projectId: string) {
    dispatch(storeProjectIdToDeleteAction(projectId))
  }

  function storeUserData(
    id: string,
    firstName: string,
    lastName: string,
    avatarUrl: string,
    projects: any,
  ) {
    dispatch(storeUserDataAction(id, firstName, lastName, avatarUrl, projects))
  }

  function storeProjectIdToView(projectId: string) {
    dispatch(storeProjectIdToViewAction(projectId))
  }

  return (
    <ApplicationContext.Provider
      value={{
        applicationState,
        toggleAddProjectDialogIsOpen,
        toggleViewProjectDialogIsOpen,
        toggleDeleteDialog,
        toggleSuccessDialog,
        storeProjectIdToDelete,
        storeUserData,
        storeProjectIdToView,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  )
}
