/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  MouseEvent,
  ChangeEvent,
  useContext,
  useRef,
  useState,
  useEffect,
} from 'react'
import { ApplicationContext } from '../../contexts/ApplicationContext'
import { useScreenWidth } from '../../hooks/useScreenWidth'
import * as zod from 'zod'
import {
  ActionsWrapper,
  DialogContainer,
  FormWrapper,
  ThumbnailContainer,
  ThumbnailPreview,
} from './style'
import {
  Autocomplete,
  Button,
  Checkbox,
  Dialog,
  IconButton,
  TextField,
  Tooltip,
} from '@mui/material'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CollectionsImage from './../../assets/images/collections.svg'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ViewProjectDialog } from '../ViewProjectDialog'
import { AxiosAPI } from '../../AxiosConfig'
import { DeleteOutline } from '@mui/icons-material'
import {
  ProjectDataType,
  ProjectPreview,
  Tag,
} from '../../reducer/application/reducer'

export function ProjectDialog() {
  const {
    applicationState,
    toggleViewProjectDialogIsOpen,
    toggleAddProjectDialogIsOpen,
    toggleSuccessDialog,
    storeUserData,
    storeProjectPreview,
    storeProjectIdToHandle,
  } = useContext(ApplicationContext)

  const screenWidth = useScreenWidth()

  // Validação e formulário com Zod e React Hook Form
  const projectValidationSchema = zod.object({
    id: zod.string(),
    title: zod.string().min(1, { message: 'Insira o nome do projeto' }),
    tagsList: zod.any(),
    link: zod.string().min(1, { message: 'Insira o link do projeto' }),
    description: zod.string(),
    thumbnail: zod.any(),
  })

  type ProjectFormData = zod.infer<typeof projectValidationSchema>

  const projectForm = useForm<ProjectFormData>({
    resolver: zodResolver(projectValidationSchema),
    defaultValues: {
      id: '',
      title: '',
      tagsList: [] as string[],
      link: '',
      description: '',
      thumbnail: null,
    },
  })

  const { register, setValue, getValues, handleSubmit } = projectForm

  // Mecanismo para fazer o upload de uma imagem
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState('')

  const imageInputRef = useRef<HTMLInputElement>(null)
  function handleUploadImage(event: MouseEvent<HTMLDivElement>) {
    if (event) imageInputRef.current?.click()
  }

  function handleChangeImage(event: ChangeEvent<HTMLInputElement>) {
    const image = event.target?.files?.[0]
    if (image) {
      setThumbnail(image)
      setThumbnailPreview(URL.createObjectURL(image ?? ({} as File)))
    }
  }

  function handleRemovePreviewImage() {
    setThumbnail(null)
    setThumbnailPreview('')
  }

  function handleOpenPreview() {
    const projectData = getValues()
    const previewData: ProjectPreview = {
      description: projectData.description,
      link: projectData.link,
      tagsList: projectData.tagsList,
      thumbnail: thumbnailPreview,
      title: projectData.title,
    }

    storeProjectPreview(previewData)

    toggleViewProjectDialogIsOpen(true)
  }

  function cleanForm() {
    setValue('id', '')
    setValue('title', '')
    setValue('tagsList', [])
    setValue('link', '')
    setValue('description', '')
    setValue('thumbnail', null)
    setThumbnail(null)
    setThumbnailPreview('')
  }

  // Fecha o dialog
  function handleClose() {
    storeProjectPreview({
      description: '',
      link: '',
      tagsList: [],
      thumbnail: '',
      title: '',
    } as ProjectPreview)

    storeProjectIdToHandle('')
    cleanForm()
    toggleAddProjectDialogIsOpen(false)
  }

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
  const checkedIcon = <CheckBoxIcon fontSize="small" />

  // Quando eu tento fazer essa busca usando um hook customizado, eu tenho um loop infinito
  // Buscar outra forma de reaproveitar essa função em outros componentes
  const updateUserData = async () => {
    await AxiosAPI.get('user/me/data')
      .then((response) => {
        storeUserData(
          response.data.id,
          response.data.firstName,
          response.data.lastName,
          response.data.avatar_url,
          response.data.projects,
        )
      })
      .catch((error) => {
        console.error(error)
      })
  }

  // Salva um novo projeto
  function saveProjectPost(request: any) {
    AxiosAPI.post('/project', request, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        if (response.status === 201) {
          updateUserData()
          storeProjectIdToHandle('')
          toggleAddProjectDialogIsOpen(false)
          toggleSuccessDialog(true, 'Projeto adicionado com sucesso!')
          cleanForm()
        }
      })
      .catch((error) => console.error(error))
  }

  // Edita um projeto existente
  function updateRequestPatch(request: any) {
    AxiosAPI.patch(`/project/${request.id}`, request, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        if (response.status === 200) {
          updateUserData()
          storeProjectIdToHandle('')
          toggleAddProjectDialogIsOpen(false)
          toggleSuccessDialog(true, 'Edição concluída com sucesso!')
          cleanForm()
        }
      })
      .catch((error) => console.error(error))
  }

  function handleSaveProject(data: ProjectFormData) {
    const createRequest = {
      title: data.title,
      tags: data.tagsList.map((tag: any) => tag.id),
      url: data.link,
      description: data.description,
      file: thumbnail,
    }

    const updateRequest = { ...createRequest, id: data.id }

    data.id ? updateRequestPatch(updateRequest) : saveProjectPost(createRequest)
  }

  // useEffect para carregar as informações do projeto para edição
  const [editProjectData, setEditProjectData] = useState({
    createdAt: '',
    description: '',
    id: '',
    tags: [],
    thumbnail_url: '',
    title: '',
    url: '',
  } as ProjectDataType)

  useEffect(() => {
    function loadProjectData() {
      try {
        if (
          applicationState.projectIdToHandle !== '' &&
          applicationState.userData.projects.length > 0
        ) {
          const project = applicationState.userData.projects.find(
            (obj: any) => obj.id === applicationState.projectIdToHandle,
          )
          setEditProjectData(project)
          setValue('id', project.id ?? '')
          setValue('title', project.title ?? '')
          setValue('tagsList', project.tags ?? ([] as Tag[]))
          setValue('link', project.url ?? '')
          setValue('description', project.description ?? '')
          setValue('thumbnail', null) // Como obter novamente o arquivo de imagem?
          setThumbnailPreview(project.thumbnail_url ?? '')
          console.log(project)
        }
      } catch (error) {
        console.error(error)
      }
    }

    loadProjectData()
  }, [
    setValue,
    applicationState.addProjectDialogIsOpen,
    applicationState.projectIdToHandle,
    applicationState.userData.projects,
  ])

  // useEffect para limpar o formulário quando a página for recarregada
  useEffect(() => {
    const handleBeforeUnload = () => {
      toggleAddProjectDialogIsOpen(false)
      toggleViewProjectDialogIsOpen(false)
      toggleSuccessDialog(false, '')
      cleanForm()
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  })

  return (
    <Dialog open={applicationState.addProjectDialogIsOpen} maxWidth={'xl'}>
      <form>
        <DialogContainer>
          <h5>{editProjectData.id ? 'Editar projeto' : 'Adicionar Projeto'}</h5>
          <FormWrapper>
            <Tooltip
              title="Imagem nos formatos: JPG, PNG e GIF. Tamanho máximo: 1mb"
              followCursor
            >
              <div>
                <p>Selecione o conteúdo que você deseja fazer upload</p>
                {!thumbnailPreview ? (
                  <ThumbnailContainer onClick={handleUploadImage}>
                    <img src={CollectionsImage} alt="" />
                    <div>
                      <p>Compartilhe seu talento com milhares de pessoas</p>
                    </div>
                  </ThumbnailContainer>
                ) : (
                  <ThumbnailPreview
                    $url={thumbnailPreview}
                    onClick={handleUploadImage}
                  />
                )}
                <input
                  {...register('thumbnail')}
                  id="image-input"
                  type="file"
                  src=""
                  alt=""
                  accept="image/*"
                  ref={imageInputRef}
                  onChange={handleChangeImage}
                ></input>
              </div>
            </Tooltip>

            <div id="fields-wrapper">
              <TextField
                {...register('title')}
                label="Título"
                sx={{ width: screenWidth < 960 ? '100%' : '413px' }}
              />
              <Autocomplete
                {...register('tagsList')}
                multiple
                freeSolo
                limitTags={screenWidth < 960 ? 1 : 3}
                disableCloseOnSelect
                options={applicationState.tags}
                onChange={(event, values) =>
                  event ? setValue('tagsList', values) : undefined
                }
                getOptionLabel={(tags) =>
                  typeof tags === 'string' ? tags : tags.tagName
                }
                sx={{ width: screenWidth < 960 ? '100%' : '413px' }}
                renderInput={(params) => (
                  <TextField {...params} label="Tags" placeholder="" />
                )}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.tagName}
                  </li>
                )}
              />
              <TextField
                {...register('link')}
                label="Link"
                sx={{ width: screenWidth < 960 ? '100%' : '413px' }}
              ></TextField>
              <TextField
                {...register('description')}
                label="Descrição"
                multiline
                rows={4}
                sx={{ width: screenWidth < 960 ? '100%' : '413px' }}
              />
            </div>
          </FormWrapper>

          <ActionsWrapper>
            <div id="form-actions">
              <p onClick={handleOpenPreview}>Visualizar publicação</p>
              <Tooltip title="Remover imagem" arrow>
                <IconButton
                  id="basic-button"
                  onClick={handleRemovePreviewImage}
                >
                  <DeleteOutline id="delete-image" />
                </IconButton>
              </Tooltip>
            </div>
            <div>
              <Button
                id="action-button"
                variant="contained"
                type="submit"
                onClick={handleSubmit(handleSaveProject)}
              >
                Salvar
              </Button>
              <Button
                id="action-button"
                variant="contained"
                onClick={handleClose}
                type="button"
              >
                Cancelar
              </Button>
            </div>
          </ActionsWrapper>
        </DialogContainer>
      </form>

      <ViewProjectDialog />
    </Dialog>
  )
}
