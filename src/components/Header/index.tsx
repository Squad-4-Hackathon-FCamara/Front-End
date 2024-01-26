import { MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HeaderContainer,
  NavigationContainer,
  ProfileContainer,
} from "./style";
import {
  Menu as MenuComponent,
  IconButton,
  MenuItem,
  Divider,
} from "@mui/material";
import OrangeLogo from "./../../assets/images/orange-logo.svg";
import { Menu, Notifications } from "@mui/icons-material";

export function Header() {
  const navigate = useNavigate();

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

  // useEffect fica observando uma variável, e executa uma lógica quando ocorre uma mudança no valor
  // No return, o event listener é removido
  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setScreenWidth(window.innerWidth);
      });
    };
  }, []);

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
            {/* 
              anchorReference, anchorPosition, anchorOrigin e transformOrigin
              são usadas para posicionar o menu de forma correta
              ver: https://mui.com/material-ui/react-popover/#anchor-playground
            */}
            <MenuComponent
              id="navigation-menu"
              anchorReference="anchorPosition"
              anchorPosition={{ top: 74, left: 0 }}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/");
                }}
              >
                <p>Meus Projetos</p>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/discover");
                }}
              >
                <p>Descobrir</p>
              </MenuItem>

              <Divider />

              <MenuItem
                onClick={() => {
                  handleClose();
                }}
              >
                <p>Configurações</p>
              </MenuItem>
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
          src="https://api.dicebear.com/7.x/thumbs/svg?seed=Giov&scale=150&radius=50&eyes=variant1W16,variant2W10,variant2W12,variant2W14,variant2W16,variant3W10,variant3W12,variant3W14,variant3W16,variant4W10,variant4W12,variant4W14,variant4W16,variant5W10,variant5W12,variant5W14,variant5W16,variant6W10,variant6W12,variant6W14,variant6W16,variant7W10,variant7W12,variant7W14,variant7W16,variant8W10,variant8W12,variant8W14,variant8W16,variant9W10,variant9W12,variant9W14,variant9W16,variant1W12,variant1W10,variant1W14&eyesColor=FFEECC&mouthColor=FFEECC&shapeColor=FFAA66,FF5522,315FCE,183594"
          alt="Avatar"
        />
        <IconButton aria-label="notifications">
          <Notifications id="notifications-icon" />
        </IconButton>
      </ProfileContainer>
    </HeaderContainer>
  );
}
