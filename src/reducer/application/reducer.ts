/* eslint-disable @typescript-eslint/no-explicit-any */
// Reducer é uma forma de organizar as funções da aplicação em um só lugar

import { produce } from 'immer'
import { ActionTypes } from './actions'

export type UserData = {
  id: ''
  firstName: ''
  lastName: ''
  avatarUrl: ''
  projects: any
}

export type Tag = {
  id: string
  tagName: string
}

export type ProjectPreview = {
  description: string
  link: string
  tagsList: Tag[]
  thumbnail: string
  title: string
}

export type ProjectDataType = {
  createdAt: string
  description: string
  id: string
  tags: Tag[]
  thumbnail_url: string
  title: string
  url: string
  user: any
}

// Interface com as informações da aplicação
export interface ApplicationState {
  addProjectDialogIsOpen: boolean
  viewProjectDialogIsOpen: boolean
  successDialogIsOpen: boolean
  successDialogMessage: string
  deleteDialogIsOpen: boolean
  projectIdToHandle: string
  userData: UserData
  // projectIdToView: string
  projectPreview: ProjectPreview
  tags: Tag[]
}

// Inicia o reducer
export function applicationReducer(state: ApplicationState, action: any) {
  // O switch case é usado para acessar as diferentes ações do reducer
  // Também estamos usando a função produce do immer, para facilitar o trabalho com imutabilidade
  switch (action.type) {
    // Abre dialog de criação de projetos
    case ActionTypes.TOGGLE_ADD_PROJECT_DIALOG:
      return produce(state, (draft) => {
        draft.addProjectDialogIsOpen = action.payload.isOpen
      })

    // Abre visualização de projetos
    case ActionTypes.TOGGLE_VIEW_PROJECT_DIALOG:
      return produce(state, (draft) => {
        draft.viewProjectDialogIsOpen = action.payload.isOpen
      })

    // Abre dialog de sucesso
    case ActionTypes.TOGGLE_SUCCESS_DIALOG:
      return produce(state, (draft) => {
        draft.successDialogIsOpen = action.payload.isOpen
        draft.successDialogMessage = action.payload.successDialogMessage
      })

    // Abre dialog de exclusão
    case ActionTypes.TOGGLE_DELETE_DIALOG:
      return produce(state, (draft) => {
        draft.deleteDialogIsOpen = action.payload.isOpen
      })

    // Armazena id do projeto a ser excluído
    case ActionTypes.STORE_PROJECT_ID_TO_HANDLE:
      return produce(state, (draft) => {
        draft.projectIdToHandle = action.payload.projectId
      })

    // Armazena dados do usuário logado
    case ActionTypes.STORE_USER_DATA:
      return produce(state, (draft) => {
        draft.userData = {
          id: action.payload.id,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          avatarUrl: action.payload.avatarUrl,
          projects: action.payload.projects,
        } as UserData
      })

    // Armazena id do projeto a ser visualizado
    // case ActionTypes.STORE_PROJECT_ID_TO_VIEW:
    //   return produce(state, (draft) => {
    //     draft.projectIdToView = action.payload.projectId
    //   })

    // Armazena o projeto não salvo para ser pré-visualizado
    case ActionTypes.STORE_PROJECT_PREVIEW:
      return produce(state, (draft) => {
        draft.projectPreview = {} as ProjectPreview // Inicia projectPreview
        draft.projectPreview = action.payload.project
      })

    // Armazena as tags
    case ActionTypes.STORE_TAGS:
      return produce(state, (draft) => {
        draft.tags = action.payload.tags
      })

    default:
      return state
  }
}
