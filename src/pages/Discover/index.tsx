/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { SyntheticEvent, useContext, useEffect, useState } from 'react'
import { ApplicationContext } from '../../contexts/ApplicationContext'
import { SuccessDialog } from '../../components/SuccessDialog'
import { useScreenWidth } from '../../hooks/useScreenWidth'
import { ViewProjectDialog } from '../../components/ViewProjectDialog'
import defaultThumbnail from './../../assets/images/default-thumbnail.jpg'
import { DeleteDialog } from '../../components/DeleteDialog'
import { AxiosAPI } from '../../AxiosConfig'
import { ProjectDataType, Tag } from '../../reducer/application/reducer'

export function Discover() {
  const {
    applicationState,
    toggleViewProjectDialogIsOpen,
    storeProjectIdToHandle,
  } = useContext(ApplicationContext)

  // type ProjectType = {
  //   createdAt: string
  //   id: string
  //   title: string
  //   description: string
  //   thumbnailUrl: string
  //   tags: Tag[]
  //   url: string
  //   user: any
  // }

  const [projects, setProjects] = useState([] as ProjectDataType[])

  const screenWidth = useScreenWidth()

  function handleViewProject(projectId: string) {
    storeProjectIdToHandle(projectId)
    toggleViewProjectDialogIsOpen(true)
  }

  function filterByTags(_event: SyntheticEvent<Element, Event>, value: any) {
    const params = new URLSearchParams()

    const tagIds = value.map((tag: Tag) => tag.id)
    tagIds.map((id: string) => {
      params.append('tags', id)
    })

    const request = {
      params: params,
    }

    AxiosAPI.get('project/tags', request)
      .then()
      .catch((error) => {
        console.error('Erro: ', error)
      })
  }

  function getProjects() {
    AxiosAPI.get('/project/discovery')
      .then((response) => {
        const projectsList: ProjectDataType[] = response.data.message.map(
          (obj: any) => {
            const projectData: ProjectDataType = {
              createdAt: obj.createdAt,
              id: obj.id,
              title: obj.title,
              description: obj.description,
              thumbnail_url: obj.thumbnail_url,
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
        <BaseAutocomplete
          items={applicationState.tags}
          onChange={(event: SyntheticEvent<Element, Event>, values: any) =>
            filterByTags(event, values)
          }
        />
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
                    project.thumbnail_url
                      ? project.thumbnail_url
                      : defaultThumbnail
                  }
                  onClick={() => handleViewProject(project.id)}
                ></ProjectCard>
                <ProjectInfo>
                  <div id="avatar">
                    <img src={project.user.avatar_url} alt="" />
                    <span>
                      <h5 id="name-tag">
                        {project.user.firstName + ' ' + project.user.lastName}
                      </h5>
                      {screenWidth > 768 ? <h5> • </h5> : <></>}
                      <h5>01/24</h5>
                    </span>
                  </div>
                  {screenWidth > 768 ? (
                    <div id="tag-chips">
                      {project.tags.slice(0, 2).map((tag) => {
                        return <Chip key={tag.id} label={tag.tagName} />
                      })}
                    </div>
                  ) : project.tags.length > 0 ? (
                    <div id="tag-chips">
                      <Chip
                        key={project.tags[0].id}
                        label={project.tags[0].tagName}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </ProjectInfo>
              </Grid>
            ))}
          </Grid>
        )}
      </ProjectsList>

      <ProjectDialog />
      <SuccessDialog />
      <ViewProjectDialog discoveryProjectData={projects} />
      <DeleteDialog />
    </PortfolioContainer>
  )
}
