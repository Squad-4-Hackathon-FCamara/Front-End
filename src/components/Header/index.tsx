import {
  HeaderContainer,
  NavigationContainer,
  ProfileContainer,
} from "./style";

import OrangeLogo from "./../../assets/images/orange-logo.svg";
import { Menu, Notifications } from "@mui/icons-material";
import {
  Menu as MenuComponent,
  IconButton,
  MenuItem,
  Divider,
} from "@mui/material";
import { MouseEvent, useEffect, useState } from "react";

export function Header() {
  // screenWidth é como uma variável;
  // setScreenWidth é uma função
  const [screenWidth, setScreenWidth] = useState(
    document.documentElement.clientWidth
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function getScreenWidth() {
    const width = document.documentElement.clientWidth;

    return width;
  }

  // useEffect fica observando uma variável, e executa uma lógica quando ocorre uma mudança no valor
  useEffect(() => {
    const clientWidth = () => {
      setScreenWidth(getScreenWidth());
    };

    window.addEventListener("resize", clientWidth);
  });

  return (
    <HeaderContainer>
      <NavigationContainer>
        {screenWidth < 768 && (
          <>
            <IconButton
              id="basic-button"
              aria-label="notifications"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleOpenMenu}
            >
              <Menu id="menu-icon"></Menu>
            </IconButton>
            <MenuComponent
              id="navigation-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Meus Projetos</MenuItem>
              <MenuItem onClick={handleClose}>Descobrir</MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>Configurações</MenuItem>
            </MenuComponent>
          </>
        )}
        <img src={OrangeLogo} alt="Logo" />
        {screenWidth >= 768 && (
          <nav>
            <a href="/">Meus projetos</a>
            <a href="/discover">Descobrir</a>
          </nav>
        )}
      </NavigationContainer>

      <ProfileContainer>
        <img
          src="https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=giovani"
          alt="Avatar"
        />
        <IconButton aria-label="notifications">
          <Notifications id="notifications-icon" />
        </IconButton>
      </ProfileContainer>
    </HeaderContainer>
  );
}
