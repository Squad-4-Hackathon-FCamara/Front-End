  import IMGRegister from "./../../assets/images/img-cadastro.svg";
  import {
    ImageContainer,
    MainWrapper,
    RegisterContainer,
  } from "./style";
  import { useState } from "react";
  import { Visibility, VisibilityOff } from "@mui/icons-material";
  import { SubmitHandler, useForm } from "react-hook-form";
import { TextField,Button, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from "@mui/material";
  
  type Inputs = {
    emailInput: string;
    passwordInput: string;
  };
  
  export function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword((show) => !show);
  
    const { register, handleSubmit } = useForm<Inputs>();
  
    const handleLoginClick: SubmitHandler<Inputs> = (event) => {
      console.log("Login: ", event);
    };
  
    return (
      <MainWrapper>
        <ImageContainer>
          <img src={IMGRegister} alt="" />
        </ImageContainer>
  
        <RegisterContainer>
          <h1>Cadastre-se</h1>
  
          <form>

          <div>
            <TextField
            id="first-name-input"
            label="Nome"
            variant="outlined"
          />
          
          <TextField
            id="last-name-input"
            label="Sobrenome"
            variant="outlined"
          /></div>

          <TextField
            id="email-input"
            label="Email address"
            variant="outlined"
          />
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
              {...register("passwordInput")}
            />
          </FormControl>

          <Button id='register-button' variant="contained"><p>Cadastrar</p></Button>

          </form>
        </RegisterContainer>
      </MainWrapper>
    );
  }
  