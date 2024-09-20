import React, { useState } from 'react';
import { Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import AppBar from "@mui/material/AppBar";
import SearchIcon from '@mui/icons-material/Search';
import { NavLogo } from "../utils/styles";
import Box from "@mui/material/Box";
import { styled } from "styled-components";
import {Login, Search} from "@mui/icons-material"
import { Link, useNavigate } from "react-router-dom";
import LocalMallIcon from "@mui/icons-material/LocalMall";

const NavBar = () => {
  const [searchOpen,setSearchOpen] = useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const currentUser =null;
  const navigate = useNavigate();

  const handleOpenNavMenu=(event) =>{
    setAnchorElNav(event.currentTarget);
  }

  const homeHandler =(e) =>{}

  const handleCloseNavMenu =(e) =>{
    setAnchorElNav(null);
  }

  const handleCloseUserMenu =(e) =>{}

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl" sx={{backgroundColor:"#4d1c9c"}}>
        <Toolbar disableGutters>
         {/*mobile*/}
         {searchOpen?<NavLogo
            to="top"
            activeClass="active"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            onClick={() =>{setSearchOpen(false)}}
         >
          <p style={{fontSize:"15px",marginRight:"10px"}}>QB</p>
         </NavLogo>:<Box sx={{flexGrow:1 , display:{xs: "flex" , md:"none"}}}>
          <IconButton
            size='large'
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={() =>{setSearchOpen(true)}}
            color='inherit'
          >
            <SearchIcon/>
          </IconButton>
          </Box>}
          <HomeContainer>
            <Typography
              variant='h5'
              noWrap
              sx={{
                mr:2,
                display:{xs:"flex" , md:"none"},
                flexGrow:1,
                fontFamily:"monospace",
                fontWeight:700,
                letterSpacing:".3rem",
                color:"inherit",
                textDecoration:"none"
              }}
            >
             {searchOpen?<Search/>:<NavLogo
                 to="top"
                 activeClass="active"
                 spy={true}
                 smooth={true}
                 offset={-70}
                 duration={500}
                 onClick={homeHandler}
               >
                <p style={{fontSize:"15px"}}>QuickBuy</p>  
              </NavLogo>}
            </Typography>
            </HomeContainer>
            {currentUser === null && (
              <Box sx={{flexGrow: 1, display:{xs:"flex" ,md:"none"}}}>
                <>
                  <IconButton
                    size='large'
                    aria-label="account of current user"
                    aria-controls='menu-appbar'
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color='inherit'
                  >
                   <Login/>
                  </IconButton>
                  <Menu
                    id='menu-appbar'
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical:'bottom',
                      horizontal:"left"
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical:"top",
                      horizontal:'left'
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    onClick={handleCloseUserMenu}
                    sx={{
                      display:{xs:"block",md:"none"},
                    }}
                  >
                    <MenuItem
                     onClick={() =>{
                      navigate("/logincustomer");
                      handleCloseNavMenu();
                     }}
                    >
                     <Typography textAlign="center" align='center'>
                      Sign in as customer
                     </Typography>
                    </MenuItem>
                    <div></div>
                    <MenuItem
                     onClick={() =>{
                      navigate("/loginseller");
                      handleCloseNavMenu();
                     }}
                    >
                      <Typography textAlign="center" className='link'>
                        Sign in as seller
                      </Typography>
                    </MenuItem>
                  </Menu>
                </>
              </Box>
            )}

            {/* Desktop for */}
            <HomeContainer>
              <Typography
                variant='h6'
                noWrap
                sx={{
                  mr: 2,
                  display: {sx:"none" ,md:'flex'},
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing:".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
               <NavLogo>
                <LocalMallIcon sx={{ display: { xs: "none", md: "flex"}, mr:2,ml:1}}/>
                 QuickBuy
               </NavLogo>
              </Typography>
            </HomeContainer>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;

const HomeContainer = styled.div`
  display: flex;
  cursor: pointer;
`;
