import { Box, Container, Typography } from '@mui/material'
import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TextField from '@mui/material/TextField';
import Grid2 from '@mui/material/Grid2';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';
import Link from '@mui/material/Link';
const defaultTheme = createTheme();

const Signup = ({role}) => {
    const [checkField, setCheckField] = useState("");
    const [message, setMessage] = useState(false);
    const [toggle, setToggle] = useState(false);
    const updatedrole = role.charAt(0).toLowerCase() + role.slice(1);
  
    
    const handleSubmit =(e) => {
      e.preventDefault();
     
    } 
  return (
    <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs">
    <CssBaseline />
       <Box  sx={{
           marginTop: 8,
           display: 'flex',
           flexDirection: 'column',
           alignItems: 'center',
         }} color="#341f97">
        <AccountCircleIcon sx={{fontSize:"60px" }}/>
           <Typography variant='h5'>
               Sign In As {role}
           </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
             margin="normal"
             required
             fullWidth
             id="username"
             label="Your Name"
             name="username"
             autoComplete="username"
             autoFocus
           />    
        <TextField
             margin="normal"
             required
             fullWidth
             id="email"
             label="Email Address"
             name="email"
             autoComplete="email"
             autoFocus
           />
         <TextField
             margin="normal"
             required
             fullWidth
             name="password"
             label="Password"
             type={toggle?"text":"password"}
             id="password"
             autoComplete="current-password"
             InputProps={{
               endAdornment: (
                   <InputAdornment position="end">
                       <IconButton onClick={() => setToggle(!toggle)}>
                           {toggle ? (
                               <Visibility />
                           ) : (
                               <VisibilityOff />
                           )}
                       </IconButton>
                   </InputAdornment>
               ),
           }}
           />
            {/* {message && <p className='errorlogin courseDetail' style={{color:"red",marginTop:"5px"}}>{checkField}</p>} */}
           <FormControlLabel
             control={<Checkbox value="remember" color="primary" />}
             label="Remember me"
           />   
            <Button
             type="submit"
             fullWidth
             variant="contained"
             sx={{ mt: 3, mb: 2 }}
           >
             <CircularProgress size={24} color="inherit" />: "Sign In"
           </Button>
           <Grid2 container>
             <Grid2 item xs>
               <Link href="#" variant="body2">
                 Forgot password?  
               </Link>
             </Grid2>
             <Grid2 item sx={{marginLeft:"75px"}}>
               <Link href={`/register${updatedrole}`} variant="body2">
                 {"Already have  account?  Login In"}
               </Link>
             </Grid2>
           </Grid2>
        </Box>
    
           
       </Box>
     </Container>
     </ThemeProvider>
  )
}

export default Signup