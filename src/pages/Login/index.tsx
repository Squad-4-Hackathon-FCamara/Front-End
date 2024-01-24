import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import IMGLogin from "./../../assets/images/img-login.svg";
import GoogleLogo from "./../../assets/images/google-logo.svg";
import {
  ImageContainer,
  LoginContainer,
  LoginWithGoogle,
  MainWrapper,
} from "./style";
import { MouseEvent, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword((show) => !show);

  function handleLoginClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
  }

  return (
    <MainWrapper>
      <ImageContainer>
        <img src={IMGLogin} alt="" />
      </ImageContainer>

      <LoginContainer>
        <h1>Entre no Orange Portfólio</h1>

        <LoginWithGoogle type="button">
          <img src={GoogleLogo}></img>
          Entrar com Google
        </LoginWithGoogle>

        <form>
          <h2>Faça login com email</h2>

          {/* Campo para email */}
          <TextField
            id="email-input"
            label="Email address"
            variant="outlined"
          />

          {/* Campo para senha, ver https://mui.com/material-ui/react-text-field/ */}
          <FormControl variant="outlined">
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
              sx={{ width: "517px" }}
            />
          </FormControl>

          <Button
            id="login-button"
            variant="contained"
            size="large"
            type="submit"
            onClick={handleLoginClick}
          >
            Entrar
          </Button>

          <a href="/register">Cadastre-se</a>
        </form>
      </LoginContainer>
    </MainWrapper>
  );
}
