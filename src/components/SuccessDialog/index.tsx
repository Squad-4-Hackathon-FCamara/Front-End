import { Dialog, Button } from '@mui/material'
import { useContext } from 'react'
import { ApplicationContext } from '../../contexts/ApplicationContext'
import { DialogWrapper } from './style'
import { CheckCircleRounded } from '@mui/icons-material'

export function SuccessDialog() {
  const { applicationState, toggleSuccessDialog } =
    useContext(ApplicationContext)

  function handleCloseDialog() {
    toggleSuccessDialog(false, '')
  }

  return (
    <Dialog open={applicationState.successDialogIsOpen}>
      <DialogWrapper>
        <h1>{applicationState.successDialogMessage}</h1>

        {/* <img src={SuccessGreen} alt="Sucesso" /> */}
        <CheckCircleRounded id="check-icon" />

        <Button
          id="close-button"
          variant="contained"
          onClick={handleCloseDialog}
        >
          VOLTAR PARA PROJETOS
        </Button>
      </DialogWrapper>
    </Dialog>
  )
}
