import React, { useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Container, InputBase, Menu } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SearchIcon from '@mui/icons-material/Search';
import LogIcon from '../utils/navbar/LogIcon';
import Categories from '../utils/navbar/Categories';
import { useSelector } from 'react-redux';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import Menuicon from "../utils/navbar/Menuicon";

const ResponsiveAppBar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchOpen, setSearchOpen] = useState(false); // State for toggling search input
  const [isCartOpen, setIsCartOpen] = useState(false);

  const navigate = useNavigate();

  // Toggle search input visibility
  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const handleOpenCart = () => {
    setIsCartOpen(true);
    navigate("/opencart");
  };

  const handleShoppingIcon = () => {
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl" sx={{ backgroundColor: '#341f97' }}>
        <Toolbar disableGutters>
          {/* Mobile View */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', flexGrow: 1 }}>
            {/* If Search is open, show input box */}
            {searchOpen ? (
              <>
                <Typography variant="h8" component="h8" marginRight="10px">
                  QA
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', borderRadius: 1 }}>
                  <SearchIcon sx={{ ml: 1, color: 'black' }} />
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search your product"
                    inputProps={{ 'aria-label': 'search your product' }}
                  />
                </Box>
              </>
            ) : (
              <>
                <IconButton onClick={toggleSearch} color="inherit">
                  <SearchIcon />
                </IconButton>
                <ShoppingBagIcon onClick={handleShoppingIcon} sx={{ display: { xs: 'flex', md: 'none' }, mr: 2 }} />
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="#app-bar-with-responsive-menu"
                  sx={{
                    mr: 1,
                    display: { xs: 'flex', md: 'none' },
                    fontFamily: 'monospace',
                    fontWeight: 600,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  <p style={{ fontSize: '15px' }}>QuickBuy</p>
                </Typography>
              </>
            )}
            {currentUser === null && (
              <Box>
                <LogIcon />
              </Box>
            )}
          </Box>

          {/* Laptop View */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', flexGrow: 1 }}>
            <ShoppingBagIcon onClick={handleShoppingIcon} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              QuickBuy
            </Typography>

            {/* Search Box */}
            <Box
              sx={{
                display: 'flex',
                marginRight: '8%',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: 1,
                flex: 12,
              }}
            >
              <SearchIcon sx={{ ml: 1, color: 'black' }} />
              <InputBase
                sx={{ ml: 1, flex: 2 }}
                placeholder="Search your product"
                inputProps={{ 'aria-label': 'search your product' }}
              />
            </Box>

            {/* Categories */}
            <Box sx={{ marginRight: '100px' }}>
              <Categories />
            </Box>

            {/* Log Icon */}
            {currentUser === null && (
              <Box>
                <LogIcon style={{ marginRight: '100px' }} />
              </Box>
            )}
          </Box>

          {/* Cart and Menu Icons */}
          {currentUser && (
            <Box sx={{ flexGrow: 0, display: "flex" }}>
              <Tooltip title="Cart">
                {/* shoping cart icon */}
                <IconButton onClick={handleOpenCart} sx={{ width: "4rem", color: "inherit", p: 0 }}>
                  <ShoppingCartIcon />
                </IconButton>
                {/* account details */}
              </Tooltip>
              <IconButton title="account detail" sx={{ width: "4rem", color: "inherit", p: 0 }}>
                <Menuicon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;

// Styled Components
const HomeContainer = styled.div`
  display: flex;
  cursor: pointer;
`;

const styles = {
  styledPaper: {
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    mt: 1.5,
    "& .MuiAvatar-root": {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: "background.paper",
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
    },
  },
};
