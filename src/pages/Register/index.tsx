import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import IMGRegister from "./../../assets/images/img-cadastro.svg";
import { ImageContainer, MainWrapper, RegisterContainer } from "./style";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword((show) => !show);

  return (
    <MainWrapper>
      <ImageContainer>
        <img src={IMGRegister} alt="" />
      </ImageContainer>

      <RegisterContainer>
        <h1>Cadastre-se</h1>

        <form>
          <div id="names-container">
            <TextField
              label="First name"
              variant="outlined"
              sx={{ width: "100%" }}
            />

            <TextField
              label="Last name"
              variant="outlined"
              sx={{ width: "100%" }}
            />
          </div>

          {/* Campo para email */}
          <TextField
            label="Email address"
            variant="outlined"
            sx={{ width: "100%", marginBottom: "16px" }}
          />

          <FormControl
            variant="outlined"
            sx={{ width: "100%", marginBottom: "16px" }}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
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
          >
            Cadastrar
          </Button>
        </form>
      </RegisterContainer>
    </MainWrapper>
  );
}
