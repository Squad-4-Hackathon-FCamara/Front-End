// Reducer é uma forma de organizar as funções da aplicação em um só lugar
// Ele ajuda muito a manter o código mais limpo nos componentes

import { produce } from 'immer'
import { ActionTypes } from './actions'

// export type Project = {
//   id: string
//   userId: string
//   title: string
//   tags: string[]
//   link: string
//   description: string
//   thumbnail: File
// }

// Interface com as informações da aplicação
export interface ApplicationState {
  addProjectDialogIsOpen: boolean
  viewProjectDialogIsOpen: boolean
  successDialogIsOpen: boolean
  successDialogMessage: string
  deleteDialogIsOpen: boolean
  projectIdToDelete: string
  // projectInEditor: {
  //   id: string
  //   userId: string
  //   title: string
  //   tags: string[]
  //   link: string
  //   description: string
  //   thumbnail: File
  // }
  // projectsList: Project[]
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
    case ActionTypes.STORE_PROJECT_ID_TO_DELETE:
      return produce(state, (draft) => {
        draft.projectIdToDelete = action.payload.projectId
      })

    // Limpa dialog de projetos
    // case ActionTypes.CLEAN_PROJECT_DIALOG:
    //   return produce(state, (draft) => {
    //     draft.projectInEditor = {
    //       id: '',
    //       userId: '',
    //       title: '',
    //       tags: [] as string[],
    //       link: '',
    //       description: '',
    //       thumbnail: {} as File,
    //     }
    //   })

    // Login com email
    // case ActionTypes.LOGIN_WITH_EMAIL:
    //   return state

    // Login com Google
    // case ActionTypes.LOGIN_WITH_GOOGLE:
    //   return state

    // Cadastro de usuário
    // case ActionTypes.REGISTER_USER:
    //   return state

    // Adicionar projeto
    // case ActionTypes.ADD_NEW_PROJECT:
    //   return produce(state, (draft) => {
    //     console.log('Thumbnail: ', action.payload.thumbnail)
    //     if (!draft.projectsList) draft.projectsList = []

    //     const project: Project = {
    //       id: action.payload.id
    //         ? action.payload.id
    //         : String(draft.projectsList.length + 1),
    //       userId: '',
    //       title: action.payload.title,
    //       tags: action.payload.tags,
    //       link: action.payload.link,
    //       description: action.payload.description,
    //       thumbnail: action.payload.thumbnail,
    //     }

    //     draft.projectsList.push(project)
    //     draft.projectInEditor = project
    //   })

    // Exclui um projeto pelo ID
    // case ActionTypes.DELETE_PROJECT:
    //   return produce(state, (draft) => {
    //     draft.projectsList = draft.projectsList.filter(
    //       (project) => project.id !== action.payload.id,
    //     )
    //   })

    default:
      return state
  }
}
