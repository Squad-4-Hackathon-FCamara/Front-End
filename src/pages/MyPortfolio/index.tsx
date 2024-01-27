import { Button, Hidden, Skeleton } from "@mui/material";
import {
  AddProjectCard,
  PortfolioContainer,
  ProfileCard,
  ProjectSkeleton,
  ProjectsList,
  SearchBar,
} from "./style";
import { BaseAutocomplete } from "../../components/BaseAutocomplete";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import CollectionsImage from "./../../assets/images/collections.svg";
import { defaultTheme } from "../../styles/themes/default";
import { ProjectDialog } from "./components/ProjectDialog";
import { useContext } from "react";
import { ApplicationContext } from "../../contexts/ApplicationContext";

export function MyPortfolio() {
  const { toggleAddProjectDialogIsOpen } = useContext(ApplicationContext);

  function handleOpenDialog() {
    toggleAddProjectDialogIsOpen(true);
  }
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

  // Apenas para testes, eventualmente essas informações virão do back end
  const projectsMockUp = [
    // { title: "Projeto 1", createdAt: "01/24", tags: ["Front End", "Design"] },
    // { title: "Projeto 2", createdAt: "01/24", tags: ["Front End", "Design"] },
    // { title: "Projeto 3", createdAt: "01/24", tags: ["Front End", "Design"] },
    // { title: "Projeto 4", createdAt: "01/24", tags: ["Front End", "Design"] },
    // { title: "Projeto 5", createdAt: "01/24", tags: ["Front End", "Design"] },
    // { title: "Projeto 6", createdAt: "01/24", tags: ["Front End", "Design"] },
    // { title: "Projeto 7", createdAt: "01/24", tags: ["Front End", "Design"] },
    // { title: "Projeto 8", createdAt: "01/24", tags: ["Front End", "Design"] },
  ];

  return (
    <PortfolioContainer>
      {/* Card com as informações do perfil do usuário */}
      <ProfileCard>
        <img
          src="https://api.dicebear.com/7.x/thumbs/svg?seed=Giov&scale=150&radius=50&eyes=variant1W16,variant2W10,variant2W12,variant2W14,variant2W16,variant3W10,variant3W12,variant3W14,variant3W16,variant4W10,variant4W12,variant4W14,variant4W16,variant5W10,variant5W12,variant5W14,variant5W16,variant6W10,variant6W12,variant6W14,variant6W16,variant7W10,variant7W12,variant7W14,variant7W16,variant8W10,variant8W12,variant8W14,variant8W16,variant9W10,variant9W12,variant9W14,variant9W16,variant1W12,variant1W10,variant1W14&eyesColor=FFEECC&mouthColor=FFEECC&shapeColor=FFAA66,FF5522,315FCE,183594"
          alt="Avatar"
        />
        <div>
          <h5>Giovani de Oliveira</h5>
          <h6>Brasil</h6>
          <Button
            id="add-project-button"
            variant="contained"
            onClick={handleOpenDialog}
          >
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
      <ProjectsList>
        {projectsMockUp.length === 0 ? (
          <Grid container spacing={2}>
            <Grid xs={12} sm={12} md={6} lg={4} xl={3}>
              <AddProjectCard onClick={handleOpenDialog}>
                <img src={CollectionsImage} alt="" />
                <div>
                  <h6>Adicione seu primeiro projeto</h6>
                  <p>Compartilhe seu talento com milhares de pessoas</p>
                </div>
              </AddProjectCard>
            </Grid>
            {Array.from({ length: 3 }).map((_, index) => (
              <Hidden key={index} only={["xs", "sm"]}>
                <Grid xs={12} sm={12} md={6} lg={4} xl={3}>
                  <Skeleton
                    variant="rectangular"
                    animation={false}
                    width={390}
                    height={258}
                    sx={{
                      bgcolor: defaultTheme["color-neutral-70"],
                      borderRadius: "4px",
                    }}
                  />
                </Grid>
              </Hidden>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={2}>
            <Grid xs={12} sm={12} md={6} lg={4} xl={3}></Grid>
          </Grid>
        )}
      </ProjectsList>

      <ProjectDialog />
    </PortfolioContainer>
  );
}
