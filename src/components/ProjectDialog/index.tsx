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
} from './style'
import {
  Autocomplete,
  Button,
  Checkbox,
  Dialog,
  TextField,
} from '@mui/material'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CollectionsImage from './../../assets/images/collections.svg'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ViewProjectDialog } from '../ViewProjectDialog'

export function ProjectDialog() {
  const {
    applicationState,
    toggleViewProjectDialogIsOpen,
    toggleAddProjectDialogIsOpen,
    toggleSuccessDialog,
  } = useContext(ApplicationContext)

  const screenWidth = useScreenWidth()

  // Validação e formulário com Zod e React Hook Form
  const projectValidationSchema = zod.object({
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
      title: '',
      tagsList: [] as string[],
      link: '',
      description: '',
      thumbnail: null,
    },
  })

  const { register, setValue, handleSubmit } = projectForm

  // Mecanismo para fazer o upload de uma imagem
  const [thumbnail, setThumbnail] = useState<File | null>(null)

  const imageInputRef = useRef<HTMLInputElement>(null)
  function handleUploadImage(event: MouseEvent<HTMLDivElement>) {
    console.log(event)
    imageInputRef.current?.click()
  }

  function handleChangeImage(event: ChangeEvent<HTMLInputElement>) {
    const image = event.target?.files?.[0]
    if (image) {
      setThumbnail(image)
      console.log('Imagem: ', image)
    }
  }

  function handleOpenPreview() {
    toggleViewProjectDialogIsOpen(true)
  }

  // Fecha o dialog
  function handleClose() {
    toggleAddProjectDialogIsOpen(false)
  }

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
  const checkedIcon = <CheckBoxIcon fontSize="small" />

  function handleSaveProject(data: ProjectFormData) {
    console.log(data)

    if (thumbnail) {
      console.log('Estado: ', thumbnail)
    }

    // Se o projeto tiver id, a mensagem do toggleSuccessDialog será:
    // "Edição concluída com sucesso!"

    toggleAddProjectDialogIsOpen(false)
    toggleSuccessDialog(true, 'Projeto adicionado com sucesso!')
  }

  // useEffect para limpar o formulário quando a página for recarregada
  useEffect(() => {
    const handleBeforeUnload = () => {
      toggleAddProjectDialogIsOpen(false)
      toggleViewProjectDialogIsOpen(false)
      toggleSuccessDialog(false, '')
      // cleanProjectDialog()
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  })

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

  return (
    <Dialog open={applicationState.addProjectDialogIsOpen} maxWidth={'xl'}>
      <form>
        <DialogContainer>
          <h5>{'Adicionar Projeto'}</h5>
          <FormWrapper>
            <div>
              <p>Selecione o conteúdo que você deseja fazer upload</p>
              <ThumbnailContainer onClick={handleUploadImage}>
                <img src={CollectionsImage} alt="" />
                <div>
                  <p>Compartilhe seu talento com milhares de pessoas</p>
                </div>
              </ThumbnailContainer>
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
                options={tagsMockUp}
                onChange={(event, values) =>
                  event ? setValue('tagsList', values) : undefined
                }
                getOptionLabel={(tags) =>
                  typeof tags === 'string' ? tags : tags.name
                }
                sx={{ width: screenWidth < 960 ? '100%' : '413px' }}
                renderInput={(params) => (
                  <TextField {...params} label="Buscar tags" placeholder="" />
                )}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.name}
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
            <p onClick={handleOpenPreview}>Visualizar publicação</p>
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
