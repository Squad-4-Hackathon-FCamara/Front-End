/* eslint-disable @typescript-eslint/no-explicit-any */
import { Chip, Dialog, DialogContent } from '@mui/material'
import { DialogContainer } from '../ProjectDialog/style'
import { useContext, useEffect, useState } from 'react'
import { ApplicationContext } from '../../contexts/ApplicationContext'
import {
  DialogCloseWrapper,
  DialogContentWrapper,
  DialogHeader,
} from './styles'
import { Close } from '@mui/icons-material'
import { useScreenWidth } from '../../hooks/useScreenWidth'
import defaultThumbnail from './../../assets/images/default-thumbnail.jpg'
import { format } from 'date-fns'
import {
  ProjectDataType,
  ProjectPreview,
  Tag,
} from '../../reducer/application/reducer'

interface ViewProjectDialogProps {
  discoveryProjectData?: ProjectDataType[] // Prop opcional
}

export function ViewProjectDialog({
  discoveryProjectData,
}: ViewProjectDialogProps) {
  const {
    applicationState,
    toggleViewProjectDialogIsOpen,
    storeProjectIdToHandle,
    storeProjectPreview,
  } = useContext(ApplicationContext)

  const screenWidth = useScreenWidth()

  function handleCloseDialog() {
    storeProjectIdToHandle('')
    storeProjectPreview({
      description: '',
      link: '',
      tagsList: [],
      thumbnail: '',
      title: '',
    } as ProjectPreview)
    toggleViewProjectDialogIsOpen(false)
  }

  const [projectData, setProjectData] = useState({
    createdAt: '',
    description: '',
    id: '',
    tags: [] as Tag[],
    thumbnail_url: '',
    title: '',
    url: '',
  } as ProjectDataType)

  useEffect(() => {
    function loadProjectData() {
      try {
        let project: any = {}

        if (
          applicationState.projectIdToHandle !== '' &&
          applicationState.userData.projects.length > 0 &&
          !discoveryProjectData
        ) {
          console.log('A')
          project = applicationState.userData.projects.find(
            (obj: any) => obj.id === applicationState.projectIdToHandle,
          )
        } else if (
          applicationState.projectIdToHandle !== '' &&
          discoveryProjectData
        ) {
          console.log('B')
          // trocar application.userData.projects pelos projetos da tela de descoberta
          project = discoveryProjectData.find(
            (obj: any) => obj.id === applicationState.projectIdToHandle,
          )
        }

        setProjectData(project)
      } catch (error) {
        console.error(error)
      }
    }

    loadProjectData()
  }, [
    discoveryProjectData,
    applicationState.viewProjectDialogIsOpen,
    applicationState.projectIdToHandle,
    applicationState.userData.projects,
  ])

  function formatDate(date: string): string {
    if (date) return format(date, 'MM/yy')
    return ''
  }

  /// Agrupa todas as verificações de dados usadas no componente dentro de um objeto
  /// Dessa forma, o return do componente fica um pouco mais legível
  type DataSourceType = {
    createdAt: string
    description: string
    tags: Tag[]
    thumbnail: string
    title: string
    url: string
    userAvatar: string
    userName: string
  }
  const projectDataSource: DataSourceType = {
    createdAt:
      formatDate(projectData.createdAt) ?? formatDate(String(new Date())),
    description:
      applicationState.projectPreview.description ||
      projectData.description ||
      '',
    tags: applicationState.projectPreview.tagsList || projectData.tags,
    thumbnail:
      applicationState.projectPreview.thumbnail ||
      projectData.thumbnail_url ||
      defaultThumbnail,
    title: applicationState.projectPreview.title || projectData.title || '',
    url: applicationState.projectPreview.link || projectData.url || '',
    userAvatar: applicationState.userData.avatarUrl ?? '',
    userName:
      applicationState.userData.firstName +
      ' ' +
      applicationState.userData.lastName,
  }

  return (
    <Dialog
      open={applicationState.viewProjectDialogIsOpen}
      maxWidth={'xl'}
      fullScreen={screenWidth > 1100 ? false : true}
    >
      <DialogContainer>
        <DialogCloseWrapper>
          <Close onClick={handleCloseDialog} sx={{ cursor: 'pointer' }} />
        </DialogCloseWrapper>

        <DialogContentWrapper>
          <h1>{projectDataSource.title}</h1>
          <DialogHeader>
            <div id="general-info">
              <div id="user-info">
                <img
                  id="avatar"
                  src={projectDataSource.userAvatar}
                  alt="Avatar"
                />
                <div id="user-name">
                  <h5 id="name-tag">{projectDataSource.userName}</h5>
                  <h6>{projectDataSource.createdAt}</h6>
                </div>
              </div>

              <div id="tag-chips">
                {projectDataSource.tags.map((tag: any, index) => {
                  if (index < 2) {
                    return (
                      <Chip
                        key={tag.id}
                        label={tag.tagName}
                        onClick={() => {}}
                      />
                    )
                  }
                })}
              </div>
            </div>

            <img
              id="project-thumbnail"
              src={projectDataSource.thumbnail}
              alt=""
            />
          </DialogHeader>

          <DialogContent sx={{ padding: 0, overflow: 'hidden' }}>
            <p>{projectDataSource.description}</p>

            <br />
            <br />
            <p>Download</p>
            <a href={projectDataSource.url} target="blank">
              {projectDataSource.url}
            </a>
          </DialogContent>
        </DialogContentWrapper>
      </DialogContainer>
    </Dialog>
  )
}
