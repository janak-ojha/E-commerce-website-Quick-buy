import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 250,
  height: 200,
  bgcolor: 'background.paper',
  border: '2px solid #11',
  boxShadow: 24,
  borderRadius: '16px',
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  p: 4,
};

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handlebox=(e) =>{
    navigate("/")

  }
  
  return (
    <Box onClick={handlebox} sx={style}>
      <Avatar
        sx={{
          backgroundColor: 'D8D2C2',
          marginBottom: 1,
          width: 100,
          height: 100,
          fontSize: '40px',
        }}
      >
        {String(currentUser.name).charAt(0)}
      </Avatar>
      <Typography id="modal-title" variant="h3" marginBottom="5px">
        {currentUser.name}
      </Typography>
      <Typography id="modal-description" variant="h6">
        Email: {currentUser.email}
      </Typography>
      <Typography variant="h6">Role: {currentUser.role}</Typography>
    </Box>
  );
}
