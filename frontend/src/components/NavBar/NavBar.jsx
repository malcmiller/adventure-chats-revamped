import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as userService from "../../utilities/users-service";
import Logo from "../../images/logos/AdventurChats_Logo_horizontal_dark.png";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Stack,
  Toolbar,
  IconButton,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  Avatar,
  Tooltip,
} from "@mui/material/";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "35ch",
    },
    fontSize: 20,
  },
}));

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navigateSettings = () => {
    navigate("/settings");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {user ? (
        <div>
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem
            onClick={() => {
              navigateSettings();
              handleMenuClose();
            }}
          >
            Settings
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleLogOut();
              handleMenuClose();
            }}
          >
            Logout
          </MenuItem>
        </div>
      ) : (
        <div>
          <MenuItem onClick={handleMenuClose}>Login</MenuItem>
          <MenuItem onClick={handleMenuClose}>Sign Up</MenuItem>
        </div>
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="transparent" elevation={0} position="sticky">
        <Toolbar>
          <Link to="/">
            <Box
              component="img"
              sx={{
                height: "4rem",
                p: 1,
              }}
              alt="ADVENTUR"
              src={Logo}
            />
          </Link>
          <Search sx={{ textAlign: "left", flexGrow: 1 }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Stack direction="row">
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              sx={{ "&:hover": { backgroundColor: "transparent" } }}
            >
              <Badge badgeContent={4} color="error">
                <Avatar sx={{ "&:hover": { backgroundColor: "lightgrey" } }}>
                  <ChatBubbleOutlineIcon sx={{ color: "#303841" }} />
                </Avatar>
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              sx={{ "&:hover": { backgroundColor: "transparent" } }}
            >
              <Badge badgeContent={17} color="error">
                <Avatar sx={{ "&:hover": { backgroundColor: "lightgrey" } }}>
                  <NotificationsIcon sx={{ color: "#303841" }} />
                </Avatar>
              </Badge>
            </IconButton>
            {user ? (
              <Tooltip title="Open settings">
                <IconButton
                  edge="end"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                >
                  <Avatar /*alt={profile name} src={profile pic}*/ />
                </IconButton>
              </Tooltip>
            ) : (
              <Link to="/login">
                <IconButton
                  size="large"
                  edge="end"
                  sx={{ "&:hover": { backgroundColor: "transparent" } }}
                >
                  <Avatar
                    variant="square"
                    sx={{
                      width: 112,
                      borderRadius: 28,
                      color: "#303841",
                      "&:hover": { backgroundColor: "lightgrey" },
                    }}
                  >
                    <AccountCircle sx={{ paddingRight: 1 }} />
                    Sign in
                  </Avatar>
                </IconButton>
              </Link>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
