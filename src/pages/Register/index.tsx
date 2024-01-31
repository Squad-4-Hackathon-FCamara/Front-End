import { defaultTheme } from '../../styles/themes/default.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Alert,
  Snackbar,
  FormHelperText,
} from '@mui/material'
import IMGRegister from './../../assets/images/img-cadastro.svg'
import { ImageContainer, MainWrapper, RegisterContainer } from './style'
import { ChangeEvent, useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { AxiosAPI } from '../../AxiosConfig.ts'
import { useNavigate } from 'react-router'

export function Register() {
  // Estados locais
  const [showPassword, setShowPassword] = useState(false)
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [isPasswordValid, setIsPasswordValid] = useState(true)
  const [isFirstNameValid, setIsFirstNameValid] = useState(true)
  const [isLastNameValid, setIsLastNameValid] = useState(true)

  const navigate = useNavigate()

  const registerValidationSchema = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    email: zod.string(),
    password: zod.string(),
  })

  type RegisterFormData = zod.infer<typeof registerValidationSchema>

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerValidationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  })

  const { register, handleSubmit } = registerForm

  /* Essas funções serão passadas pra validação no front end */
  function handleEmailInputChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.value) setIsEmailValid(true)
  }

  function handlePasswordInputChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.value) setIsPasswordValid(true)
  }

  function handleFirstNameInputChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.value) setIsFirstNameValid(true)
  }

  function handleLastNameInputChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.value) setIsLastNameValid(true)
  }

  // Função para atualizar o estado que os campos usam para exibir erros
  function updateValidation(error: any, fieldName: string, stateCallback: any) {
    if (
      error.response.data.message?.find((msg: string) =>
        msg.includes(fieldName),
      )
    ) {
      stateCallback(false)
    }
  }

  function handleRegisterClick(data: RegisterFormData) {
    const request = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    }

    AxiosAPI.post('/auth/register', request)
      .then((response) => {
        console.log('Response: ', response)
        setIsSnackbarOpen(true)
        // Adicionar um delay para fazer a navegação?
        navigate('/login')
      })
      .catch((error) => {
        updateValidation(error, 'firstName', setIsFirstNameValid)
        updateValidation(error, 'lastName', setIsLastNameValid)
        updateValidation(error, 'email', setIsEmailValid)
        updateValidation(error, 'password', setIsPasswordValid)
      })
  }

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (event && reason === 'clickaway') {
      return
    }

    setIsSnackbarOpen(false)
  }

  const handleShowPassword = () => setShowPassword((show) => !show)

  return (
    <MainWrapper>
      <ImageContainer>
        <img src={IMGRegister} alt="" />
      </ImageContainer>

      <RegisterContainer>
        <Snackbar
          id="snackbar"
          open={isSnackbarOpen}
          autoHideDuration={10000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Alert
            variant="filled"
            severity="success"
            sx={{ backgroundColor: defaultTheme['success-main'] }}
            iconMapping={{
              success: <CheckCircleOutlineIcon fontSize="inherit" />,
            }}
          >
            Cadastro feito com sucesso
          </Alert>

          {/* <Alert
            variant="filled"
            severity="warning"
            sx={{ backgroundColor: defaultTheme["warning-main"] }}
            iconMapping={{
              success: <CheckCircleOutlineIcon fontSize="inherit" />,
            }}
          >
            Dados de cadastro inválidos
          </Alert> */}
        </Snackbar>
        <h1>Cadastre-se</h1>

        <form>
          <div id="names-container">
            <TextField
              {...register('firstName')}
              label="Nome"
              variant="outlined"
              error={!isFirstNameValid}
              helperText={!isFirstNameValid ? 'Insira um nome válido' : ''}
              onChange={handleFirstNameInputChange}
              sx={{ width: '100%' }}
            />

            <TextField
              {...register('lastName')}
              label="Sobrenome"
              variant="outlined"
              error={!isLastNameValid}
              helperText={!isLastNameValid ? 'Insira um sobrenome válido' : ''}
              onChange={handleLastNameInputChange}
              sx={{ width: '100%' }}
            />
          </div>

          {/* Campo para email */}
          <TextField
            {...register('email')}
            label="Endereço de email"
            variant="outlined"
            error={!isEmailValid}
            helperText={!isEmailValid ? 'Insira um email válido' : ''}
            onChange={handleEmailInputChange}
            sx={{ width: '100%', marginBottom: '16px' }}
          />

          <FormControl
            variant="outlined"
            error={!isPasswordValid}
            onChange={handlePasswordInputChange}
            sx={{ width: '100%', marginBottom: '16px' }}
          >
            <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
            <OutlinedInput
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              label="Senha"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText>
              {!isPasswordValid
                ? 'Senha deve ter ao menos 8 caracteres, letras maiúsculas, letras minúsculas, números e caracteres especiais'
                : ''}
            </FormHelperText>
          </FormControl>

          <Button
            id="login-button"
            variant="contained"
            size="large"
            type="submit"
            onClick={handleSubmit(handleRegisterClick)}
          >
            Cadastrar
          </Button>
        </form>
      </RegisterContainer>
    </MainWrapper>
  )
}
