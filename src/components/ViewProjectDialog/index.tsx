import { Chip, Dialog, DialogContent } from "@mui/material";
import { DialogContainer } from "../../pages/MyPortfolio/components/ProjectDialog/style";
import { useContext } from "react";
import { ApplicationContext } from "../../contexts/ApplicationContext";
import {
  DialogCloseWrapper,
  DialogContentWrapper,
  DialogHeader,
} from "./styles";
import { Close } from "@mui/icons-material";

export function ViewProjectDialog() {
  const { applicationState, toggleViewProjectDialogIsOpen } =
    useContext(ApplicationContext);

  function handleCloseDialog() {
    toggleViewProjectDialogIsOpen(false);
  }

  // Apenas para testes, eventualmente essas informações virão do back end
  const tagsMockUp = [
    { id: 1, name: "Front End" },
    { id: 3, name: "UX/UI" },
  ];

  return (
    <Dialog open={applicationState.viewProjectDialogIsOpen} maxWidth={"xl"}>
      <DialogContainer>
        <DialogCloseWrapper>
          <Close onClick={handleCloseDialog} sx={{ cursor: "pointer" }} />
        </DialogCloseWrapper>

        <DialogContentWrapper>
          <DialogHeader>
            <div id="user-info">
              <img
                id="avatar"
                src="https://api.dicebear.com/7.x/thumbs/svg?seed=Giov&scale=150&radius=50&eyes=variant1W16,variant2W10,variant2W12,variant2W14,variant2W16,variant3W10,variant3W12,variant3W14,variant3W16,variant4W10,variant4W12,variant4W14,variant4W16,variant5W10,variant5W12,variant5W14,variant5W16,variant6W10,variant6W12,variant6W14,variant6W16,variant7W10,variant7W12,variant7W14,variant7W16,variant8W10,variant8W12,variant8W14,variant8W16,variant9W10,variant9W12,variant9W14,variant9W16,variant1W12,variant1W10,variant1W14&eyesColor=FFEECC&mouthColor=FFEECC&shapeColor=FFAA66,FF5522,315FCE,183594"
                alt="Avatar"
              />
              <div id="user-name">
                <h5>{"Giovani de Oliveira"}</h5>
                <h6>{"01/24"}</h6>
              </div>
            </div>

            <h1>{"Título do projeto"}</h1>

            <div id="tag-chips">
              {tagsMockUp.map((tag) => {
                return <Chip key={tag.id} label={tag.name} />;
              })}
            </div>
          </DialogHeader>

          <DialogContent sx={{ padding: 0, overflow: "hidden" }}>
            <img src="https://source.unsplash.com/random" alt="" />
            <p>
              {
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
              }
            </p>

            <br />
            <br />
            <p>Download</p>
            <a href="#">https://project-download.com</a>
          </DialogContent>
        </DialogContentWrapper>
      </DialogContainer>
    </Dialog>
  );
}
