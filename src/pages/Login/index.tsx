import {
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
  LoginButton,
  LoginContainer,
  LoginWithGoogle,
  MainWrapper,
} from "./style";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword((show) => !show);

  return (
    <MainWrapper>
      <ImageContainer>
        <img src={IMGLogin} alt="" />
      </ImageContainer>

      <LoginContainer>
        <form>
          <h1>Entre no Orange Portfólio</h1>

          <LoginWithGoogle type="button">Entrar com Google</LoginWithGoogle>

          <h2>Faça login com email</h2>

          {/* Campo para email */}
          <TextField
            label="Email address"
            variant="outlined"
            sx={{ width: "517px" }}
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

          {/* Botão de login */}
          <LoginButton type="submit">ENTRAR</LoginButton>
        </form>
      </LoginContainer>
    </MainWrapper>
  );
}
