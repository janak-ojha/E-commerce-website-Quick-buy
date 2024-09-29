import * as React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory for navigation
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person'; // Icon for Profile
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Icon for Logout

const menuItems = [
  { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
  { text: 'Logout', icon: <ExitToAppIcon />, path: '/logout' },
];

export default function ProfileMenuList({ open }) {
  const history = useNavigate(); 
  const handleNavigation = (path) => {
    history(path); 
  };

  return (
    <List>
      {menuItems.map(({ text, icon, path }, index) => (
        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            onClick={() => handleNavigation(path)} // Handle click for navigation
            sx={[
              {
                minHeight: 48,
                px: 2.5,
              },
              open
                ? {
                    justifyContent: 'initial',
                  }
                : {
                    justifyContent: 'center',
                  },
            ]}
          >
            <ListItemIcon
              sx={[
                {
                  minWidth: 0,
                  justifyContent: 'center',
                },
                open
                  ? {
                      mr: 3,
                    }
                  : {
                      mr: 'auto',
                    },
              ]}
            >
              {icon}
            </ListItemIcon>
            <ListItemText
              primary={text}
              sx={[
                open
                  ? {
                      opacity: 1,
                    }
                  : {
                      opacity: 0,
                    },
              ]}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
