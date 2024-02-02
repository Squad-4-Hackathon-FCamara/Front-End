import { Chip, Hidden, Skeleton } from "@mui/material";
import {
  PortfolioContainer,
  ProfileCard,
  ProjectCard,
  ProjectInfo,
  ProjectsList,
  SearchBar,
} from "./style";
import { BaseAutocomplete } from "../../components/BaseAutocomplete";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { defaultTheme } from "../../styles/themes/default";
import { ProjectDialog } from "../../components/ProjectDialog";
import { useContext } from "react";
import { ApplicationContext } from "../../contexts/ApplicationContext";
import { SuccessDialog } from "../../components/SuccessDialog";
import { useScreenWidth } from "../../hooks/useScreenWidth";
import { ViewProjectDialog } from "../../components/ViewProjectDialog";
import defaultThumbnail from "./../../assets/images/default-thumbnail.jpg";
import { DeleteDialog } from "../../components/DeleteDialog";
import { AxiosAPI } from "../../AxiosConfig";

export function Discover() {
  const { toggleViewProjectDialogIsOpen } = useContext(ApplicationContext);

  const screenWidth = useScreenWidth();

  function handleViewProject() {
    toggleViewProjectDialogIsOpen(true);
  }

  function filterByTags() {
    const params = new URLSearchParams();
    params.append("tags", "1");
    params.append("tags", "2");
    params.append("tags", "3");
    const request = {
      params: params,
    };

    AxiosAPI.get("project/tags", request)
      .then()
      .catch((error) => {
        console.log("Erro: ", error);
      });
  }
  // Apenas para testes, eventualmente essas informações virão do back end
  const tagsMockUp = [
    { id: "1", name: "Front End" },
    { id: "2", name: "Back End" },
    { id: "3", name: "UX/UI" },
    { id: "4", name: "IA" },
    { id: "5", name: "Design" },
    { id: "6", name: "DevOps" },
    { id: "7", name: "Soft Skills" },
  ];

  // Apenas para testes, eventualmente essas informações virão do back end
  const projectsList = [
    {
      id: "1",
      title: "Projeto 1",
      createdAt: "01/24",
      tags: [
        { id: "1", name: "Front End" },
        { id: "2", name: "Design" },
      ],
      thumbnail: "https://source.unsplash.com/random",
    },
    {
      id: "2",
      title: "Projeto 2",
      createdAt: "01/24",
      tags: [
        { id: "1", name: "Front End" },
        { id: "2", name: "Design" },
      ],
      thumbnail: "",
    },
    {
      id: "3",
      title: "Projeto 3",
      createdAt: "01/24",
      tags: [
        { id: "1", name: "Front End" },
        { id: "2", name: "Design" },
      ],
      thumbnail: "https://source.unsplash.com/random",
    },
    {
      id: "4",
      title: "Projeto 4",
      createdAt: "01/24",
      tags: [
        { id: "1", name: "Front End" },
        { id: "2", name: "Design" },
      ],
      thumbnail: "",
    },
  ];

  return (
    <PortfolioContainer>
      {/* Card com as informações do perfil do usuário */}
      <ProfileCard>
        <div>
          <h5>
            Junte-se à comunidade de inovação, inspiração e descobertas,
            transformando experiências em conexões inesquecíveis
          </h5>
        </div>
      </ProfileCard>

      {/* Autocomplete para pesquisa */}
      <SearchBar>
        <div onBlur={filterByTags}>
          <BaseAutocomplete items={tagsMockUp} />
        </div>
      </SearchBar>

      {/* Lista dos projetos do usuário */}
      <ProjectsList>
        {projectsList.length === 0 ? (
          <Grid container spacing={3}>
            {Array.from({ length: 3 }).map((_, index) => (
              <Hidden key={index} only={["xs", "sm"]}>
                <Grid xs={12} sm={12} md={6} lg={4} xl={3}>
                  <Skeleton
                    variant="rectangular"
                    animation={false}
                    width={"100%"}
                    height={258}
                    sx={{
                      bgcolor: defaultTheme["color-neutral-60"],
                      borderRadius: "4px",
                    }}
                  />
                </Grid>
              </Hidden>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={2}>
            {projectsList.map((project) => (
              <Grid key={project.id} xs={12} sm={12} md={6} lg={4} xl={3}>
                <ProjectCard
                  $thumbnailurl={
                    project.thumbnail ? project.thumbnail : defaultThumbnail
                  }
                  onClick={handleViewProject}
                ></ProjectCard>
                <ProjectInfo>
                  <div id="avatar">
                    <img
                      src={
                        "https://api.dicebear.com/7.x/thumbs/svg?seed=Giov&scale=150&radius=50&eyes=variant1W16,variant2W10,variant2W12,variant2W14,variant2W16,variant3W10,variant3W12,variant3W14,variant3W16,variant4W10,variant4W12,variant4W14,variant4W16,variant5W10,variant5W12,variant5W14,variant5W16,variant6W10,variant6W12,variant6W14,variant6W16,variant7W10,variant7W12,variant7W14,variant7W16,variant8W10,variant8W12,variant8W14,variant8W16,variant9W10,variant9W12,variant9W14,variant9W16,variant1W12,variant1W10,variant1W14&eyesColor=FFEECC&mouthColor=FFEECC&shapeColor=FFAA66,FF5522,315FCE,183594"
                      }
                      alt=""
                    />
                    <span>
                      <h5>Giovani de Oliveira</h5>
                      {screenWidth > 768 ? <h5> • </h5> : <></>}
                      <h5>01/24</h5>
                    </span>
                  </div>
                  {screenWidth > 768 ? (
                    <div id="tag-chips">
                      {project.tags.map((tag) => {
                        return <Chip key={tag.id} label={tag.name} />;
                      })}
                    </div>
                  ) : (
                    <div id="tag-chips">
                      <Chip
                        key={project.tags[0].id}
                        label={project.tags[0].name}
                      />
                    </div>
                  )}
                </ProjectInfo>
              </Grid>
            ))}
          </Grid>
        )}
      </ProjectsList>

      <ProjectDialog />
      <SuccessDialog />
      <ViewProjectDialog />
      <DeleteDialog />
    </PortfolioContainer>
  );
}
