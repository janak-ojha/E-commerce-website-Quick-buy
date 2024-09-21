import React, { useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Container, InputBase } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SearchIcon from '@mui/icons-material/Search';
import LogIcon from '../utils/navbar/LogIcon';
import Categories from '../utils/navbar/Categories';

const ResponsiveAppBar = () => {
  const [searchOpen, setSearchOpen] = useState(false); // State for toggling search input


 
  // Toggle search input visibility
  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
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
                <ShoppingBagIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 2 }} />
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
            
            <Box>
              <LogIcon />
            </Box>
          </Box>

          {/* Laptop View */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', flexGrow: 1 }}>
            <ShoppingBagIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
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
              Quick Buy
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
            <Box>
              <LogIcon style={{ marginRight: '100px' }} />
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
