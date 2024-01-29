import { defaultTheme } from "../../styles/themes/default.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as zod from "zod";
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
} from "@mui/material";
import IMGRegister from "./../../assets/images/img-cadastro.svg";
import { ImageContainer, MainWrapper, RegisterContainer } from "./style";
import { ChangeEvent, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword((show) => !show);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isFirstNameValid, setIsFirstNameValid] = useState(true);
  const [isLastNameValid, setIsLastNameValid] = useState(true);

  const registerValidationSchema = zod.object({
    firstName: zod.string().min(1, { message: "Digite seu nome" }).max(30),

    lastName: zod.string().min(1, { message: "Digite seu sobrenome" }).max(30),

    email: zod
      .string()
      .min(1, { message: "Digite seu email" })
      .email({ message: "Email inválido" }),
    password: zod.string().min(1, { message: "Digite sua senha" }),
  });

  type RegisterFormData = zod.infer<typeof registerValidationSchema>;

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit } = registerForm;

  /* Essas funções serão passadas pra validação no front end */
  function handleEmailInputChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.value) setIsEmailValid(true);
  }

  function handlePasswordInputChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.value) setIsPasswordValid(true);
  }

  function handleFirstNameInputChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.value) setIsFirstNameValid(true);
  }

  function handleLastNameInputChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.value) setIsLastNameValid(true);
  }

  function handleRegisterClick(data: RegisterFormData) {
    console.log(data);
    setIsSnackbarOpen(true);

    // Exemplo de uso
    // if (data.firstName != "Gio") {
    //   setIsFirstNameValid(false);
    // }
  }

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    console.log(event);
    if (reason === "clickaway") {
      return;
    }

    setIsSnackbarOpen(false);
  };

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
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Alert
            variant="filled"
            severity="success"
            sx={{ backgroundColor: defaultTheme["success-main"] }}
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
              {...register("firstName")}
              label="First name"
              variant="outlined"
              error={!isFirstNameValid}
              onChange={handleFirstNameInputChange}
              sx={{ width: "100%" }}
            />

            <TextField
              {...register("lastName")}
              label="Last name"
              variant="outlined"
              error={!isLastNameValid}
              onChange={handleLastNameInputChange}
              sx={{ width: "100%" }}
            />
          </div>

          {/* Campo para email */}
          <TextField
            {...register("email")}
            label="Email address"
            variant="outlined"
            error={!isEmailValid}
            onChange={handleEmailInputChange}
            sx={{ width: "100%", marginBottom: "16px" }}
          />

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
              {...register("password")}
              type={showPassword ? "text" : "password"}
              label="Password"
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
  );
}
