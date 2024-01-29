import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosAPI } from "../../AxiosConfig";
import {
  ImageContainer,
  LoginContainer,
  LoginWithGoogle,
  MainWrapper,
} from "./style";
import {
  Alert,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Snackbar,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IMGLogin from "./../../assets/images/img-login.svg";
import GoogleLogo from "./../../assets/images/google-logo.svg";
import { defaultTheme } from "../../styles/themes/default.ts";

export function Login() {
  // Estados para o form, talvez possa ser substituído por um reducer no futuro
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword((show) => !show);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  // Regras de validação com Zod
  // Ainda não consegui exibir essas mensagens de erro
  const loginValidationSchema = zod.object({
    email: zod
      .string()
      .min(1, { message: "Digite seu email" })
      .email({ message: "Email inválido" }),
    password: zod.string().min(1, { message: "Digite sua senha" }),
  });

  type LoginFormData = zod.infer<typeof loginValidationSchema>;

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit } = loginForm;

  // Conjunto de funções para manipular os inputs e o formulário
  function handleEmailInputChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.value) setIsEmailValid(true);
  }

  function handlePasswordInputChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.value) setIsPasswordValid(true);
  }

  // Cuida do submit do formulário
  function handleLoginClick(data: LoginFormData) {
    console.log("Data: ", data);

    // Endpoint de teste da api adviceslip, retorna uma piada sobre o Chuck Norris
    AxiosAPI.get("/jokes/random")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("HTTP Error code: ", error.statusCode);
      });

    // Esses ifs são apenas para exemplo de como ativar os erros e a snackbar
    // DEVEM ser apagados depois!
    // if (data.email !== "teste@teste.com") {
    //   setIsEmailValid(false);
    // }

    // if (data.password !== "123") {
    //   setIsPasswordValid(false);
    // }

    // if (data.email !== "teste@teste.com" || data.password !== "123") {
    //   setIsSnackbarOpen(true);
    // }
  }

  // Cuida do fechamento da snackbar
  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSnackbarOpen(false);
  };

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
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Alert
            variant="filled"
            severity="warning"
            sx={{ backgroundColor: defaultTheme["warning-main"] }}
          >
            Email ou senha estão incorretos
          </Alert>
        </Snackbar>

        <h1>Entre no Orange Portfólio</h1>

        <LoginWithGoogle type="button">
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
            {...register("email")}
            onChange={handleEmailInputChange}
            sx={{ width: "100%", marginBottom: "16px" }}
          />

          {/* Campo para senha, ver https://mui.com/material-ui/react-text-field/ */}
          <FormControl
            variant="outlined"
            error={!isPasswordValid}
            onChange={handlePasswordInputChange}
            sx={{ width: "100%", marginBottom: "16px" }}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
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
              {...register("password")}
            />
          </FormControl>

          <Button
            id="login-button"
            variant="contained"
            size="large"
            type="submit"
            onClick={handleSubmit(handleLoginClick)}
          >
            Entrar
          </Button>

          <a href="/register">Cadastre-se</a>
        </form>
      </LoginContainer>
    </MainWrapper>
  );
}
