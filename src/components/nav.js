import react, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  IconButton,
  Paper,
  Menu,
  MenuItem,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";

function Nav() {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
  };
  const handleCloseForPages = (page) => {
    navigate("/" + page);
    console.log("/" + page);
    setAnchorEl(null);
  };

  return (

    <AppBar sx={{ px: { xs: 0, sm: 3, lg: 10 }, position: "relative" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            display: { xs: "none", md: "flex" },
          }}
        >
          <Link key="homelogo" to="/">
            <Button style={{ p:0}}>
              <DashboardIcon sx={{ color: "white", fontSize: "45px" }} />
            </Button>
          </Link>

          <Link key="hometext" to="/">
            <Button
              component="button"
              sx={{ textTransform: "none", p: 0 }}
            >
              <Typography
                component="p"
                px={1}
                variant="h6"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                }}
              >
                DashBoard
              </Typography>
            </Button>
          </Link>
        </Box>

        <Box sx={{ ml: 7, display: { xs: "none", md: "flex" } }}>
          {auth
            ? [
                <Link key="home" to="/">
                  <Button component="button" sx={{ textTransform: "none" }}>
                    <Typography
                      component="p"
                      sx={{ color: "white", fontSize: "17px", px: 1 }}
                      variant="p"
                    >
                      Products
                    </Typography>
                  </Button>
                </Link>,

                <Link key="add" to="/add">
                  <Button component="button" sx={{ textTransform: "none" }}>
                    <Typography
                      component="p"
                      sx={{ color: "white", fontSize: "17px", px: 1 }}
                      variant="p"
                    >
                      Add Product
                    </Typography>
                  </Button>
                </Link>,

                <Link key="update" to="/update">
                  <Button component="button" sx={{ textTransform: "none" }}>
                    <Typography
                      component="p"
                      sx={{ color: "white", fontSize: "17px", px: 1 }}
                      variant="p"
                    >
                      Update Product
                    </Typography>
                  </Button>
                </Link>,

                <Link key="login" onClick={logout} to="/login">
                  <Button component="button" sx={{ textTransform: "none" }}>
                    <PersonIcon sx={{ color: "white" }} />
                    <Typography
                      component="p"
                      sx={{ color: "white", fontSize: "17px", px: 1 }}
                      variant="p"
                    >
                      Log Out
                    </Typography>
                  </Button>
                </Link>,
              ]
            : [
                <Button
                  key="login"
                  component="button"
                  sx={{ textTransform: "none" }}
                >
                  <Link to="/login">
                    <Typography
                      component="p"
                      sx={{ color: "white", fontSize: "17px", px: 1 }}
                      variant="p"
                    >
                      Login
                    </Typography>
                  </Link>
                </Button>,

                <Link key="signup" to="/signup">
                  <Button component="button" sx={{ textTransform: "none" }}>
                    <Typography
                      component="p"
                      sx={{ color: "white", fontSize: "17px", px: 1 }}
                      variant="p"
                    >
                      Sign Up
                    </Typography>
                  </Button>
                </Link>,
              ]}
        </Box>

        {/*  Mobile Responsive code below  */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            justifyContent: "flex-start",
          }}
        >
          <IconButton onClick={handleOpen}>
            <MenuIcon sx={{ color: "white", fontSize: "34px" }} />
          </IconButton>

          <Paper>
            <Menu
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              {auth
                ? [
                    <MenuItem
                      key="products"
                      onClick={() => handleCloseForPages("")}
                    >
                      Products
                    </MenuItem>,
                    <MenuItem
                      key="addproducts"
                      onClick={() => handleCloseForPages("add")}
                    >
                      Add Product
                    </MenuItem>,
                    <MenuItem
                      key="updateproducts"
                      onClick={() => handleCloseForPages("update")}
                    >
                      Update Product
                    </MenuItem>,
                    <MenuItem
                      key="logoutproducts"
                      onClick={() => handleCloseForPages("login")}
                    >
                      Log Out
                    </MenuItem>,
                  ]
                : [
                    <MenuItem
                      key="login"
                      onClick={() => handleCloseForPages("login")}
                    >
                      Login
                    </MenuItem>,
                    <MenuItem
                      key="signup"
                      onClick={() => handleCloseForPages("signup")}
                    >
                      Sign Up
                    </MenuItem>,
                  ]}
            </Menu>
          </Paper>
        </Box>

        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            justifyContent: "flex-start",
          }}
        >
          <IconButton sx={{ mr: 0 }}>
            <DashboardIcon sx={{ color: "white", fontSize: "35px" }} />
          </IconButton>

          <Button component="button" sx={{ m: 0, textTransform: "none" }}>
            <Typography
              component="p"
              px={1}
              variant="h6"
              sx={{
                m: 0,
                color: "white",
                fontSize: "17px",
                fontWeight: "bold",
                letterSpacing: "1px",
              }}
            >
              DashBoard
            </Typography>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
