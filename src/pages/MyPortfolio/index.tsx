import { Button } from "@mui/material";
import {
  PortfolioContainer,
  ProfileCard,
  ProjectsList,
  SearchBar,
} from "./style";
import { BaseAutocomplete } from "../../components/BaseAutocomplete";

export function MyPortfolio() {
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
    <PortfolioContainer>
      {/* Card com as informações do perfil do usuário */}
      <ProfileCard>
        <img
          src="https://api.dicebear.com/7.x/thumbs/svg?seed=Gio?scale=200"
          alt="Avatar"
        />
        <div>
          <h5>Giovani de Oliveira</h5>
          <h6>Brasil</h6>
          <Button id="add-project-button" variant="contained" disabled>
            <p>ADICIONAR PROJETO</p>
          </Button>
        </div>
      </ProfileCard>

      {/* Autocomplete para pesquisa */}
      <SearchBar>
        <h6>Meus projetos</h6>
        <BaseAutocomplete items={tagsMockUp} />
      </SearchBar>

      {/* Lista dos projetos do usuário */}
      <ProjectsList></ProjectsList>
    </PortfolioContainer>
  );
}
