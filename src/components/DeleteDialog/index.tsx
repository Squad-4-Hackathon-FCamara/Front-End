import { Dialog, Button } from '@mui/material'
import { useContext } from 'react'
import { ApplicationContext } from '../../contexts/ApplicationContext'
import { DialogWrapper } from './style'
import { AxiosAPI } from '../../AxiosConfig'

export function DeleteDialog() {
  // Contexto da aplicação
  const {
    applicationState,
    toggleDeleteDialog,
    toggleSuccessDialog,
    storeProjectIdToHandle,
    storeUserData,
  } = useContext(ApplicationContext)

  // Fecha a janela
  function handleCloseDialog() {
    storeProjectIdToHandle('')
    toggleDeleteDialog(false)
  }

  // Obtém o token de autenticação do usuário
  const token = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith('token='))
    ?.split('=')[1]

  // Requisição para login
  const updateUserData = async () => {
    await AxiosAPI.get('user/me/data', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        storeUserData(
          response.data.id,
          response.data.firstName,
          response.data.lastName,
          response.data.avatar_url,
          response.data.projects,
        )
      })
      .catch((error) => {
        console.error(error)
      })
  }

  // Exclui um projeto pelo seu ID
  function handleDelete() {
    AxiosAPI.delete(`/project/${applicationState.projectIdToHandle}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        updateUserData()
        storeProjectIdToHandle('')
        toggleSuccessDialog(true, response.data.message)
        toggleDeleteDialog(false)
      })
      .catch((error) => {
        console.error('Erro: ', error)
      })
  }

  return (
    <Dialog open={applicationState.deleteDialogIsOpen}>
      <DialogWrapper>
        <h1>Deseja Excluir?</h1>

        <h3>Se você prosseguir irá excluir o projeto do seu portfólio</h3>

        <div>
          <Button id="close-button" variant="contained" onClick={handleDelete}>
            EXCLUIR
          </Button>

          <Button
            id="close-button"
            variant="contained"
            onClick={handleCloseDialog}
          >
            CANCELAR
          </Button>
        </div>
      </DialogWrapper>
    </Dialog>
  )
}
