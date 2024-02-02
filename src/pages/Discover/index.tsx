import { Chip, Hidden, Skeleton } from '@mui/material'
import {
  PortfolioContainer,
  ProfileCard,
  ProjectCard,
  ProjectInfo,
  ProjectsList,
  SearchBar,
} from './style'
import { BaseAutocomplete } from '../../components/BaseAutocomplete'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { defaultTheme } from '../../styles/themes/default'
import { ProjectDialog } from '../../components/ProjectDialog'
import { useContext, useEffect, useState } from 'react'
import { ApplicationContext } from '../../contexts/ApplicationContext'
import { SuccessDialog } from '../../components/SuccessDialog'
import { useScreenWidth } from '../../hooks/useScreenWidth'
import { ViewProjectDialog } from '../../components/ViewProjectDialog'
import defaultThumbnail from './../../assets/images/default-thumbnail.jpg'
import { DeleteDialog } from '../../components/DeleteDialog'
import { AxiosAPI } from '../../AxiosConfig'
import { Tag } from '../../reducer/application/reducer'

export function Discover() {
  const { applicationState, toggleViewProjectDialogIsOpen } =
    useContext(ApplicationContext)

  type ProjectType = {
    createdAt: string
    id: string
    title: string
    description: string
    thumbnailUrl: string
    tags: Tag[]
    url: string
    user: any
  }

  const [projects, setProjects] = useState([] as ProjectType[])

  const screenWidth = useScreenWidth()

  function handleViewProject() {
    toggleViewProjectDialogIsOpen(true)
  }

  function filterByTags() {
    const params = new URLSearchParams()
    params.append('tags', '1')
    params.append('tags', '2')
    params.append('tags', '3')
    const request = {
      params: params,
    }

    AxiosAPI.get('project/tags', request)
      .then()
      .catch((error) => {
        console.log('Erro: ', error)
      })
  }

  function getProjects() {
    AxiosAPI.get('/project/discovery')
      .then((response) => {
        const projectsList: ProjectType[] = response.data.message.map(
          (obj: any) => {
            const projectData: ProjectType = {
              createdAt: obj.createdAt,
              id: obj.id,
              title: obj.title,
              description: obj.description,
              thumbnailUrl: obj.thumbnail_url,
              tags: obj.tags,
              url: obj.url,
              user: obj.user,
            }

            return projectData
          },
        )

        setProjects(projectsList)
      })
      .catch((error) => {
        console.error('Erro: ', error)
      })
  }

  useEffect(() => {
    getProjects()
  }, [])

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
          <BaseAutocomplete items={applicationState.tags} />
        </div>
      </SearchBar>

      {/* Lista dos projetos do usuário */}
      <ProjectsList>
        {projects.length === 0 ? (
          <Grid container spacing={3}>
            {Array.from({ length: 3 }).map((_, index) => (
              <Hidden key={index} only={['xs', 'sm']}>
                <Grid xs={12} sm={12} md={6} lg={4} xl={3}>
                  <Skeleton
                    variant="rectangular"
                    animation={false}
                    width={'100%'}
                    height={258}
                    sx={{
                      bgcolor: defaultTheme['color-neutral-60'],
                      borderRadius: '4px',
                    }}
                  />
                </Grid>
              </Hidden>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={2}>
            {projects.map((project) => (
              <Grid key={project.id} xs={12} sm={12} md={6} lg={4} xl={3}>
                <ProjectCard
                  $thumbnailurl={
                    project.thumbnailUrl
                      ? project.thumbnailUrl
                      : defaultThumbnail
                  }
                  onClick={handleViewProject}
                ></ProjectCard>
                <ProjectInfo>
                  <div id="avatar">
                    <img
                      src={
                        'https://api.dicebear.com/7.x/thumbs/svg?seed=Giov&scale=150&radius=50&eyes=variant1W16,variant2W10,variant2W12,variant2W14,variant2W16,variant3W10,variant3W12,variant3W14,variant3W16,variant4W10,variant4W12,variant4W14,variant4W16,variant5W10,variant5W12,variant5W14,variant5W16,variant6W10,variant6W12,variant6W14,variant6W16,variant7W10,variant7W12,variant7W14,variant7W16,variant8W10,variant8W12,variant8W14,variant8W16,variant9W10,variant9W12,variant9W14,variant9W16,variant1W12,variant1W10,variant1W14&eyesColor=FFEECC&mouthColor=FFEECC&shapeColor=FFAA66,FF5522,315FCE,183594'
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
                        return <Chip key={tag.id} label={tag.tagName} />
                      })}
                    </div>
                  ) : (
                    <div id="tag-chips">
                      <Chip
                        key={project.tags[0].id}
                        label={project.tags[0].tagName}
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
  )
}
