import { Dialog, Button } from '@mui/material'
import { useContext } from 'react'
import { ApplicationContext } from '../../contexts/ApplicationContext'
import { DialogWrapper } from './style'

export function DeleteDialog() {
  const { applicationState, toggleDeleteDialog, toggleSuccessDialog } =
    useContext(ApplicationContext)

  function handleCloseDialog() {
    toggleDeleteDialog(false)
  }

  function handleDelete() {
    toggleSuccessDialog(true, 'Projeto deletado com sucesso!')
    toggleDeleteDialog(false)
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
