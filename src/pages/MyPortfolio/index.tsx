/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Chip,
  Hidden,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
} from '@mui/material'
import {
  AddProjectCard,
  PortfolioContainer,
  ProfileCard,
  ProjectCard,
  ProjectInfo,
  ProjectsList,
  SearchBar,
} from './style'
import { BaseAutocomplete } from '../../components/BaseAutocomplete'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import CollectionsImage from './../../assets/images/collections.svg'
import { defaultTheme } from '../../styles/themes/default'
import { ProjectDialog } from '../../components/ProjectDialog'
import { MouseEvent, SyntheticEvent, useContext, useState } from 'react'
import { ApplicationContext } from '../../contexts/ApplicationContext'
import { SuccessDialog } from '../../components/SuccessDialog'
import { Edit } from '@mui/icons-material'
import { useScreenWidth } from '../../hooks/useScreenWidth'
import { ViewProjectDialog } from '../../components/ViewProjectDialog'
import defaultThumbnail from './../../assets/images/default-thumbnail.jpg'
import { DeleteDialog } from '../../components/DeleteDialog'
import { AxiosAPI } from '../../AxiosConfig'
import { format } from 'date-fns'
import { Tag } from '../../reducer/application/reducer'

export function MyPortfolio() {
  const {
    applicationState,
    toggleAddProjectDialogIsOpen,
    toggleViewProjectDialogIsOpen,
    toggleDeleteDialog,
    storeProjectIdToHandle,
  } = useContext(ApplicationContext)

  const screenWidth = useScreenWidth()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const isMenuOpen = Boolean(anchorEl)

  function handleOpenProjectMenu(
    event: MouseEvent<HTMLButtonElement>,
    projectId: string,
  ) {
    event.stopPropagation()
    storeProjectIdToHandle(projectId)
    setAnchorEl(event.currentTarget)
  }

  function handleCloseProjectMenu() {
    storeProjectIdToHandle('')
    setAnchorEl(null)
  }

  function handleOpenDialog() {
    toggleAddProjectDialogIsOpen(true)
  }

  function handleViewProject(projectId: string) {
    storeProjectIdToHandle(projectId)
    toggleViewProjectDialogIsOpen(true)
  }

  function handleEdit() {
    setAnchorEl(null)
    toggleAddProjectDialogIsOpen(true)
  }

  function handleDelete() {
    setAnchorEl(null)
    toggleDeleteDialog(true)
  }

  function formatDate(date: Date): string {
    return format(date, 'MM/yy')
  }

  // É possível descartar um parâmetro que não será usado com underscore _
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

  return (
    <PortfolioContainer>
      {/* Card com as informações do perfil do usuário */}
      <ProfileCard>
        <img src={applicationState.userData.avatarUrl} alt="Avatar" />
        <div>
          <h5>
            {applicationState.userData.firstName +
              ' ' +
              applicationState.userData.lastName}
          </h5>
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

        <BaseAutocomplete
          items={applicationState.tags}
          onChange={(event: SyntheticEvent<Element, Event>, value: any) =>
            filterByTags(event, value)
          }
        />
      </SearchBar>

      {/* Lista dos projetos do usuário */}
      <ProjectsList>
        {applicationState.userData.projects.length === 0 ? (
          <Grid container spacing={3}>
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
            {applicationState.userData.projects.map((project: any) => (
              <Grid key={project.id} xs={12} sm={12} md={6} lg={4} xl={3}>
                <ProjectCard
                  $thumbnailurl={
                    project.thumbnail_url
                      ? project.thumbnail_url
                      : defaultThumbnail
                  }
                  onClick={() => handleViewProject(project.id)}
                >
                  <IconButton
                    id="project-menu-button"
                    aria-controls={isMenuOpen ? 'project-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={isMenuOpen ? 'true' : undefined}
                    onClick={(e) => handleOpenProjectMenu(e, project.id)}
                  >
                    <Edit
                      sx={{
                        width: '24px',
                        height: '24px',
                        color: defaultTheme['color-neutral-120'],
                      }}
                    />
                  </IconButton>
                  <Menu
                    id="project-menu"
                    anchorEl={anchorEl}
                    open={isMenuOpen}
                    onClose={handleCloseProjectMenu}
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    MenuListProps={{
                      'aria-labelledby': 'project-menu-button',
                    }}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    <MenuItem
                      onClick={() => handleEdit()}
                      sx={{
                        width: '208px',
                        '&:hover': {
                          backgroundColor: defaultTheme['color-secondary-60'],
                          transition: 'background-color 0.2s',
                        },
                      }}
                    >
                      Editar
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleDelete()}
                      sx={{
                        width: '208px',
                        '&:hover': {
                          backgroundColor: defaultTheme['color-secondary-60'],
                          transition: 'background-color 0.2s',
                        },
                      }}
                    >
                      Excluir
                    </MenuItem>
                  </Menu>
                </ProjectCard>
                <ProjectInfo>
                  <div id="avatar">
                    <img src={applicationState.userData.avatarUrl} alt="" />
                    <span>
                      <h5 id="name-tag">
                        {applicationState.userData.firstName +
                          ' ' +
                          applicationState.userData.lastName}
                      </h5>
                      {screenWidth > 768 ? <h5> • </h5> : <></>}
                      <h5>{formatDate(project.createdAt)}</h5>
                    </span>
                  </div>
                  {screenWidth > 768 ? (
                    <div id="tag-chips">
                      {project.tags.slice(0, 2).map((tag: any) => {
                        return (
                          <Chip
                            key={tag.id}
                            label={tag.tagName}
                            onClick={() => {}}
                          />
                        )
                      })}
                    </div>
                  ) : project.tags.length > 0 ? (
                    <div id="tag-chips">
                      <Chip
                        key={project.tags[0].id}
                        label={project.tags[0].tagName}
                        onClick={() => {}}
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
      <ViewProjectDialog />
      <DeleteDialog />
    </PortfolioContainer>
  )
}
