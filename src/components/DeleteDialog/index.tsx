import { Dialog, Button } from '@mui/material'
import { useContext } from 'react'
import { ApplicationContext } from '../../contexts/ApplicationContext'
import { DialogWrapper } from './style'

export function DeleteDialog() {
  const { applicationState, toggleDeleteDialog } =
    useContext(ApplicationContext)

  function handleCloseDialog() {
    toggleDeleteDialog(false)
  }

  function handleDelete() {}

  return (
    <Dialog open={applicationState.successDialogIsOpen}>
      <DialogWrapper>
        <h1>Deseja Excluir?</h1>

        <h3>Se você prosseguir irá excluir o projeto do seu portfólio</h3>

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
      </DialogWrapper>
    </Dialog>
  )
}
