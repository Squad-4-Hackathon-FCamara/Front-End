import { Dialog, Button } from "@mui/material";
import { useContext } from "react";
import { ApplicationContext } from "../../contexts/ApplicationContext";
import { DialogWrapper } from "./style";
import SuccessGreen from "./../../assets/images/success-green.svg";

export function SuccessDialog() {
  const { applicationState, toggleSuccessDialog } =
    useContext(ApplicationContext);

  function handleCloseDialog() {
    toggleSuccessDialog(false, "");
  }

  return (
    <Dialog open={applicationState.successDialogIsOpen}>
      <DialogWrapper>
        <h1>{applicationState.successDialogMessage}</h1>

        <img src={SuccessGreen} alt="Sucesso" />

        <Button
          id="close-button"
          variant="contained"
          onClick={handleCloseDialog}
        >
          VOLTAR PARA PROJETOS
        </Button>
      </DialogWrapper>
    </Dialog>
  );
}
