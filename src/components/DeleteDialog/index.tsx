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
  } = useContext(ApplicationContext)

  function handleCloseDialog() {
    toggleDeleteDialog(false)
  }

  function useUserDataHook() {
    useUserData()
  }

  function handleDelete() {
    AxiosAPI.delete(`/project/${applicationState.projectIdToHandle}`)
      .then((response) => {
        useUserDataHook
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
