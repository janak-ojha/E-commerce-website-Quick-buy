import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useNavigate } from 'react-router-dom';

export default function FadeMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCustomerLogin = () => {
    navigate('/loginCustomer');
    handleClose(); // Close menu after navigation
  };
  const handleSellerLogin = () => {
    navigate('/loginSeller');
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
        Sign As
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
        <MenuItem onClick={handleCustomerLogin}>
          <AccountCircleIcon style={{ marginRight: "5px" }} />
          Login As Customer
        </MenuItem>
        <MenuItem onClick={handleSellerLogin}>
          <StorefrontIcon style={{ marginRight: "5px" }} />
          Login As Seller
        </MenuItem>
      </Menu>
    </div>
  );
}
