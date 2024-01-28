import { useContext } from "react";
import { ApplicationContext } from "../../../../contexts/ApplicationContext";
import { useScreenWidth } from "../../../../hooks/useScreenWidth";
import {
  ActionsWrapper,
  DialogContainer,
  FormWrapper,
  ThumbnailContainer,
} from "./style";
import {
  Autocomplete,
  Button,
  Checkbox,
  Dialog,
  TextField,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CollectionsImage from "./../../../../assets/images/collections.svg";

export function ProjectDialog() {
  const screenWidth = useScreenWidth();
  const { applicationState, toggleAddProjectDialogIsOpen } =
    useContext(ApplicationContext);

  function handleClose() {
    toggleAddProjectDialogIsOpen(false);
  }

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  // Apenas para testes, eventualmente essas informações virão do back end
  const tagsMockUp = [
    { id: 1, name: "Front End" },
    { id: 2, name: "Back End" },
    { id: 3, name: "UX/UI" },
    { id: 4, name: "IA" },
    { id: 5, name: "Design" },
    { id: 6, name: "DevOps" },
    { id: 7, name: "Soft Skills" },
  ];

  return (
    <Dialog
      open={applicationState.addProjectDialogIsOpen}
      onClose={handleClose}
      maxWidth={"xl"}
    >
      <DialogContainer>
        <h5>{"Adicionar Projeto"}</h5>
        <FormWrapper>
          <div>
            <p>Selecione o conteúdo que você deseja fazer upload</p>
            <ThumbnailContainer>
              <img src={CollectionsImage} alt="" />
              <div>
                <p>Compartilhe seu talento com milhares de pessoas</p>
              </div>
            </ThumbnailContainer>
          </div>

          <div id="fields-wrapper">
            <TextField
              label="Título"
              sx={{ width: screenWidth < 960 ? "100%" : "413px" }}
            />
            <Autocomplete
              multiple
              freeSolo
              limitTags={screenWidth < 960 ? 1 : 3}
              disableCloseOnSelect
              options={tagsMockUp}
              getOptionLabel={(tags) =>
                typeof tags === "string" ? tags : tags.name
              }
              sx={{ width: screenWidth < 960 ? "100%" : "413px" }}
              renderInput={(params) => (
                <TextField {...params} label="Buscar tags" placeholder="" />
              )}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.name}
                </li>
              )}
            />
            <TextField
              label="Link"
              sx={{ width: screenWidth < 960 ? "100%" : "413px" }}
            ></TextField>
            <TextField
              label="Descrição"
              multiline
              rows={4}
              maxRows={4}
              sx={{ width: screenWidth < 960 ? "100%" : "413px" }}
            />
          </div>
        </FormWrapper>

        <ActionsWrapper>
          <p>Visualizar publicação</p>
          <div>
            <Button id="action-button" variant="contained">
              Salvar
            </Button>
            <Button
              id="action-button"
              variant="contained"
              onClick={handleClose}
            >
              Cancelar
            </Button>
          </div>
        </ActionsWrapper>
      </DialogContainer>
    </Dialog>
  );
}
