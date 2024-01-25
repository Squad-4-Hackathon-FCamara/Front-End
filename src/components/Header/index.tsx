import {
  HeaderContainer,
  NavigationContainer,
  ProfileContainer,
} from "./style";

import OrangeLogo from "./../../assets/images/orange-logo.svg";
import DefaultAvatar from "./../../assets/images/default-avatar.svg";
import { Notifications } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export function Header() {
  return (
    <HeaderContainer>
      <NavigationContainer>
        <img src={OrangeLogo} alt="Logo" />
        <nav>
          <a href="">Meus projetos</a>
          <a href="">Descobrir</a>
        </nav>
      </NavigationContainer>

      <ProfileContainer>
        <img src={DefaultAvatar} alt="Avatar" />
        <IconButton aria-label="notifications">
          <Notifications id="notifications-icon" />
        </IconButton>
      </ProfileContainer>
    </HeaderContainer>
  );
}
