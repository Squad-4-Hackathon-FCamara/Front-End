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
import { ProjectDialog } from './components/ProjectDialog'
import { MouseEvent, useContext, useState } from 'react'
import { ApplicationContext } from '../../contexts/ApplicationContext'
import { SuccessDialog } from '../../components/SuccessDialog'
import { Edit } from '@mui/icons-material'
import { useScreenWidth } from '../../hooks/useScreenWidth'
import { ViewProjectDialog } from '../../components/ViewProjectDialog'
import defaultThumbnail from './../../assets/images/default-thumbnail.jpg'

export function MyPortfolio() {
  const { toggleAddProjectDialogIsOpen, toggleViewProjectDialogIsOpen } =
    useContext(ApplicationContext)

  const screenWidth = useScreenWidth()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const isMenuOpen = Boolean(anchorEl)

  function handleOpenProjectMenu(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  function handleCloseProjectMenu() {
    setAnchorEl(null)
  }

  function handleOpenDialog() {
    toggleAddProjectDialogIsOpen(true)
  }

  function handleViewProject() {
    toggleViewProjectDialogIsOpen(true)
  }

  function handleEdit(event: MouseEvent<HTMLElement>) {
    event.stopPropagation()
  }

  function handleDelete(event: MouseEvent<HTMLElement>) {
    event.stopPropagation()
  }
  // Apenas para testes, eventualmente essas informações virão do back end
  const tagsMockUp = [
    { id: '1', name: 'Front End' },
    { id: '2', name: 'Back End' },
    { id: '3', name: 'UX/UI' },
    { id: '4', name: 'IA' },
    { id: '5', name: 'Design' },
    { id: '6', name: 'DevOps' },
    { id: '7', name: 'Soft Skills' },
  ]

  // Apenas para testes, eventualmente essas informações virão do back end
  const projectsMockUp = [
    {
      id: '1',
      title: 'Projeto 1',
      createdAt: '01/24',
      tags: ['Front End', 'Design'],
      thumbnail: 'https://source.unsplash.com/random',
    },
    {
      id: '2',
      title: 'Projeto 2',
      createdAt: '01/24',
      tags: ['Front End', 'Design'],
      thumbnail: '',
    },
    {
      id: '3',
      title: 'Projeto 3',
      createdAt: '01/24',
      tags: ['Front End', 'Design'],
      thumbnail: 'https://source.unsplash.com/random',
    },
    {
      id: '4',
      title: 'Projeto 4',
      createdAt: '01/24',
      tags: ['Front End', 'Design'],
      thumbnail: '',
    },
  ]

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
                      bgcolor: defaultTheme['color-neutral-70'],
                      borderRadius: '4px',
                    }}
                  />
                </Grid>
              </Hidden>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={2}>
            {projectsMockUp.map((index) => (
              <Grid key={index.id} xs={12} sm={12} md={6} lg={4} xl={3}>
                <ProjectCard
                  $thumbnailurl={
                    index.thumbnail ? index.thumbnail : defaultThumbnail
                  }
                  onClick={handleViewProject}
                >
                  <IconButton
                    id="project-menu-button"
                    aria-controls={isMenuOpen ? 'project-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={isMenuOpen ? 'true' : undefined}
                    onClick={handleOpenProjectMenu}
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
                    <MenuItem onClick={handleEdit} sx={{ width: '208px' }}>
                      Editar
                    </MenuItem>
                    <MenuItem onClick={handleDelete} sx={{ width: '208px' }}>
                      Excluir
                    </MenuItem>
                  </Menu>
                </ProjectCard>
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
                      {index.tags.map((tag) => {
                        return <Chip key={tag} label={tag} />
                      })}
                    </div>
                  ) : (
                    <div id="tag-chips">
                      <Chip key={index.tags[0]} label={index.tags[0]} />
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
    </PortfolioContainer>
  )
}
