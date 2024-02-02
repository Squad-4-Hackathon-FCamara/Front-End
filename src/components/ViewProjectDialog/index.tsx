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

export function ViewProjectDialog() {
  const {
    applicationState,
    toggleViewProjectDialogIsOpen,
    storeProjectIdToView,
  } = useContext(ApplicationContext)

  const screenWidth = useScreenWidth()

  function handleCloseDialog() {
    storeProjectIdToView('')
    toggleViewProjectDialogIsOpen(false)
  }

  type projectDataType = {
    createdAt: string
    description: string
    id: string
    tags: []
    thumbnail_url: string
    title: string
    url: string
    user: any
  }
  const [projectData, setProjectData] = useState({
    createdAt: '',
    description: '',
    id: '',
    tags: [],
    thumbnail_url: '',
    title: '',
    url: '',
  } as projectDataType)

  useEffect(() => {
    function loadProjectData() {
      try {
        if (
          applicationState.projectIdToView !== '' &&
          applicationState.userData.projects.length > 0
        ) {
          const project = applicationState.userData.projects.find(
            (obj: any) => obj.id === applicationState.projectIdToView,
          )
          setProjectData(project)
        }
      } catch (error) {
        console.error(error)
      }
    }

    loadProjectData()
  }, [
    applicationState.viewProjectDialogIsOpen,
    applicationState.projectIdToView,
    applicationState.userData.projects,
  ])

  function formatDate(date: string): string {
    if (date) return format(date, 'MM/yy')

    return ''
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
          <h1>{projectData.title ?? ''}</h1>
          <DialogHeader>
            <div id="general-info">
              <div id="user-info">
                <img
                  id="avatar"
                  src={applicationState.userData.avatarUrl ?? ''}
                  alt="Avatar"
                />
                <div id="user-name">
                  <h5>
                    {applicationState.userData.firstName +
                      ' ' +
                      applicationState.userData.lastName}
                  </h5>
                  <h6>{formatDate(projectData.createdAt)}</h6>
                </div>
              </div>

              <div id="tag-chips">
                {projectData.tags.map((tag: any, index) => {
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
              src={projectData.thumbnail_url ?? defaultThumbnail}
              alt=""
            />
          </DialogHeader>

          <DialogContent sx={{ padding: 0, overflow: 'hidden' }}>
            <p>{projectData.description}</p>

            <br />
            <br />
            <p>Download</p>
            <a href={projectData.url} target="blank">
              {projectData.url}
            </a>
          </DialogContent>
        </DialogContentWrapper>
      </DialogContainer>
    </Dialog>
  )
}
