import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useNavigate } from 'react-router-dom';
import { Avatar, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';


export default function FadeMenu() {
const {currentUser} = useSelector((state) =>state.user);  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfile = () => {
    navigate('/Profile');
    handleClose(); // Close menu after navigation
  };
  const handleOrder = () => {
    navigate('/Myorders');
    handleClose(); // Close menu after navigation
  };
  const handleLogout = () => {
    navigate('/logout');
    handleClose(); // Close menu after navigation
  };

  return (
   
    <div>
       <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color="lightblack"
        sx={{ border: "GrayText" }}
      >
        <Avatar
        sx={{ backgroundColor: '#5844b2' }}
        >
        {String(currentUser.name).charAt(0)}
        </Avatar>
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >

        <MenuItem onClick={handleProfile}>
          <AccountCircleIcon style={{ marginRight: "5px" }} />
          profile
        </MenuItem>
        <MenuItem onClick={handleOrder}>
          <StorefrontIcon style={{ marginRight: "5px" }} />
           My Orders
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <StorefrontIcon style={{ marginRight: "5px" }} />
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
