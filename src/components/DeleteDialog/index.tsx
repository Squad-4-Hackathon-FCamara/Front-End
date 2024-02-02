import { Dialog, Button } from '@mui/material'
import { useContext } from 'react'
import { ApplicationContext } from '../../contexts/ApplicationContext'
import { DialogWrapper } from './style'
import { AxiosAPI } from '../../AxiosConfig'
import { useUserData } from '../../hooks/userDataUtils'

export function DeleteDialog() {
  const {
    applicationState,
    toggleDeleteDialog,
    toggleSuccessDialog,
    storeProjectIdToHandle,
    storeUserData,
  } = useContext(ApplicationContext)

  function handleCloseDialog() {
    toggleDeleteDialog(false)
  }

  // Quando eu tento fazer essa busca usando um hook customizado, eu tenho um loop infinito
  // Buscar outra forma de reaproveitar essa função em outros componentes
  const updateUserData = async () => {
    await AxiosAPI.get('user/me/data')
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

  function handleDelete() {
    AxiosAPI.delete(`/project/${applicationState.projectIdToHandle}`)
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
