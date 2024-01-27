import { Dialog, TextField } from "@mui/material";
import { FormEvent, useContext } from "react";
import { ApplicationContext } from "../../../../contexts/ApplicationContext";

export function ProjectDialog() {
  const { applicationState, toggleAddProjectDialogIsOpen } =
    useContext(ApplicationContext);

  function handleClose() {
    toggleAddProjectDialogIsOpen(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(event);
  }

  return (
    <Dialog
      open={applicationState.addProjectDialogIsOpen}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit,
      }}
    >
      <TextField placeholder="Teste" />
    </Dialog>
  );
}
