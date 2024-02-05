/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useState } from 'react'
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
  const [isloading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  // Cria validation schema do formulário
  const registerValidationSchema = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    email: zod.string(),
    password: zod.string(),
  })

  // Obtém tipo do schema
  type RegisterFormData = zod.infer<typeof registerValidationSchema>

  // Define os tipos do formulário
  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerValidationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  })

  // Cria o formulário
  const { register, handleSubmit } = registerForm

  /* Essas funções serão passadas pra validação no front end */
  function handleEmailInputChange(event: any) {
    if (event) setIsEmailValid(true)
    setIsSnackbarOpen(false)
  }

  function handlePasswordInputChange(event: any) {
    if (event) setIsPasswordValid(true)
    setIsSnackbarOpen(false)
  }

  function handleFirstNameInputChange(event: any) {
    if (event) setIsFirstNameValid(true)
    setIsSnackbarOpen(false)
  }

  function handleLastNameInputChange(event: any) {
    if (event) setIsLastNameValid(true)
    setIsSnackbarOpen(false)
  }

  function handleGoToLogin() {
    setIsLoading(false)
    navigate('/login')
  }

  // Função para atualizar o estado que os campos usam para exibir erros
  function updateValidation(error: any, fieldName: string, stateCallback: any) {
    console.log('function start')
    if (Array.isArray(error)) {
      if (error?.find((msg: string) => msg.includes(fieldName))) {
        stateCallback(false)
        console.log('if')
      }
    } else {
      if (error.includes(fieldName)) {
        stateCallback(false)
        console.log('else')
      }
    }

    setIsSnackbarOpen(true)
    console.log('function end')
  }

  // Cadastra um novo usuário
  function handleRegisterClick(data: RegisterFormData) {
    const request = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    }

    AxiosAPI.post('/auth/register', request)
      .then(() => {
        setIsSnackbarOpen(true)
        setIsLoading(true)
        setTimeout(() => {
          setIsLoading(false)
          navigate('/login')
        }, 10000)
      })
      .catch((error) => {
        updateValidation(error, 'firstName', setIsFirstNameValid)
        updateValidation(error, 'lastName', setIsLastNameValid)
        updateValidation(error, 'email', setIsEmailValid)
        updateValidation(error, 'password', setIsPasswordValid)
        setIsLoading(false)
      })
  }

  // Cuida do fechamento da snackbar
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
              disabled={isloading}
              sx={{ width: '100%' }}
            />

            <TextField
              {...register('lastName')}
              label="Sobrenome"
              variant="outlined"
              error={!isLastNameValid}
              helperText={!isLastNameValid ? 'Insira um sobrenome válido' : ''}
              onChange={handleLastNameInputChange}
              disabled={isloading}
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
            disabled={isloading}
            sx={{ width: '100%', marginBottom: '16px' }}
          />

          <FormControl
            variant="outlined"
            error={!isPasswordValid}
            onChange={handlePasswordInputChange}
            disabled={isloading}
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
            disabled={isloading}
            sx={{
              'backgroundColor': defaultTheme['color-secondary-100'],
              '&:hover': {
                backgroundColor: defaultTheme['color-secondary-110'],
              },
            }}
          >
            Cadastrar
          </Button>

          <span onClick={handleGoToLogin}>Voltar para Login</span>
        </form>
      </RegisterContainer>
    </MainWrapper>
  )
}
