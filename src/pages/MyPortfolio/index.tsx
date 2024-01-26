import { Button } from "@mui/material";
import {
  PortfolioContainer,
  ProfileCard,
  ProjectsList,
  SearchBar,
} from "./style";

export function MyPortfolio() {
  return (
    <PortfolioContainer>
      <ProfileCard>
        <img
          src="https://api.dicebear.com/7.x/thumbs/svg?seed=Gio?scale=200"
          alt="Avatar"
        />
        <div>
          <h1>Giovani de Oliveira</h1>
          <h3>Brasil</h3>
          <Button id="add-project-button" variant="contained">
            <p>ADICIONAR PROJETO</p>
          </Button>
        </div>
      </ProfileCard>

      <SearchBar></SearchBar>

      <ProjectsList></ProjectsList>
    </PortfolioContainer>
  );
}
