/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ImageContainer,
  LoginContainer,
  LoginWithGoogle,
  MainWrapper,
} from './style'
import {
  Alert,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Snackbar,
  TextField,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import IMGLogin from './../../assets/images/img-login.svg'
import GoogleLogo from './../../assets/images/google-logo.svg'
import { defaultTheme } from '../../styles/themes/default.ts'
import { AxiosAPI } from '../../AxiosConfig.ts'
import { useNavigate } from 'react-router'
import Cookies from 'universal-cookie'

export function Login() {
  // Estados para o form, talvez possa ser substituído por um reducer no futuro
  const [showPassword, setShowPassword] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [isPasswordValid, setIsPasswordValid] = useState(true)
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)

  const navigate = useNavigate()

  // Regras de validação com Zod
  const loginValidationSchema = zod.object({
    email: zod.string(),
    password: zod.string(),
  })

  type LoginFormData = zod.infer<typeof loginValidationSchema>

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { register, handleSubmit } = loginForm

  // Conjunto de funções para manipular os inputs e o formulário
  function handleEmailInputChange(event: ChangeEvent<HTMLInputElement>) {
    if (event) setIsEmailValid(true)
    setIsSnackbarOpen(false)
  }

  function handlePasswordInputChange(event: ChangeEvent<HTMLInputElement>) {
    if (event) setIsPasswordValid(true)
    setIsSnackbarOpen(false)
  }

  // Função para atualizar o estado que os campos usam para exibir erros
  function updateValidation(error: any, fieldName: string, stateCallback: any) {
    if (Array.isArray(error)) {
      if (error?.find((msg: string) => msg.includes(fieldName))) {
        stateCallback(false)
      }
    } else {
      if (error.includes(fieldName)) {
        stateCallback(false)
      }
    }

    setIsSnackbarOpen(true)
  }

  // Cuida do submit do formulário
  function handleLoginClick(data: LoginFormData) {
    const request = {
      email: data.email,
      password: data.password,
    }

    // passar token no body
    // salvar por aqui utilizando universal-cookie
    const token = document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith('token='))
      ?.split('=')[1]

    AxiosAPI.post('/auth/login', request, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => {
        // Creando a instancia
        const cookies = new Cookies()

        // Salva os cookies
        if (res.data.message.token && cookies) {
          cookies.set('token', res.data.message.token, { path: '/' })

          cookies.set('is-logged-in', true, { path: '/' })
        }
        navigate('/')
      })
      .catch((error) => {
        updateValidation(error.response.data.message, 'email', setIsEmailValid)
        updateValidation(
          error.response.data.message,
          'password',
          setIsPasswordValid,
        )
        setIsSnackbarOpen(true)
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

  function handleLoginGoogle() {
    window.open('http://localhost:3001/auth/login/google', '_self')
  }
  // function handleLoginGoogle() {
  //   window.open(
  //     'https://orange-portfolio-r0b5.onrender.com/auth/login/google',
  //     '_self',
  //   )
  // }

  const handleShowPassword = () => setShowPassword((show) => !show)

  return (
    <MainWrapper>
      <ImageContainer>
        <img src={IMGLogin} alt="" />
      </ImageContainer>

      <LoginContainer>
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
            severity="warning"
            sx={{ backgroundColor: defaultTheme['warning-main'] }}
          >
            Email ou senha estão incorretos
          </Alert>
        </Snackbar>

        <h1>Entre no Orange Portfólio</h1>

        <LoginWithGoogle type="button" onClick={handleLoginGoogle}>
          <img src={GoogleLogo}></img>
          Entrar com Google
        </LoginWithGoogle>

        <form>
          <h2>Faça login com email</h2>

          {/* Campo para email */}
          <TextField
            label="Email address"
            variant="outlined"
            error={!isEmailValid}
            helperText={!isEmailValid ? 'Email inválido ou incorreto' : ''}
            {...register('email')}
            onChange={handleEmailInputChange}
            sx={{ width: '100%', marginBottom: '16px' }}
          />

          {/* Campo para senha, ver https://mui.com/material-ui/react-text-field/ */}
          <FormControl
            variant="outlined"
            error={!isPasswordValid}
            onChange={handlePasswordInputChange}
            sx={{ width: '100%', marginBottom: '16px' }}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
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
              label="Password"
              {...register('password')}
            />
            <FormHelperText>
              {!isPasswordValid ? 'Senha inválida ou incorreta' : ''}
            </FormHelperText>
          </FormControl>

          <Button
            id="login-button"
            variant="contained"
            size="large"
            type="submit"
            onClick={handleSubmit(handleLoginClick)}
            sx={{
              backgroundColor: defaultTheme['color-secondary-100'],
              '&:hover': {
                backgroundColor: defaultTheme['color-secondary-110'],
              },
            }}
          >
            Entrar
          </Button>

          <a href="/register">Cadastre-se</a>
        </form>
      </LoginContainer>
    </MainWrapper>
  )
}
