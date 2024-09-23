import { Box, Container, Typography } from '@mui/material'
import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TextField from '@mui/material/TextField';
import Grid2 from '@mui/material/Grid2';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';
import Link from '@mui/material/Link';
import { useDispatch, useSelector } from "react-redux";
import { RegisterUser } from '../../Redux/UserHandle';
import { useNavigate } from 'react-router-dom';
import { authInitial } from '../../Redux/UserSlice';
const defaultTheme = createTheme();



const Signup = ({role}) => {
  const { status, response, error, loading, } = useSelector(
    (state) => state.user
  );
    const [checkField, setCheckField] = useState("");
    const [message, setMessage] = useState(false);
    const [toggle, setToggle] = useState(false);
    const updatedrole = role.charAt(0).toLowerCase() + role.slice(1);
    const dispatch = useDispatch()
    const [loginClicked, setLoginClicked] = useState(false);
    const navigate = useNavigate();



    React.useEffect(() => {
      console.log(status);
      if (status === "success") {
        dispatch(authInitial());
        navigate(`/`);
      } else if (status === "failed") {
        setMessage(true);
        setCheckField(response);
        setTimeout(() => {
          setMessage(false);
          setCheckField("");
          dispatch(authInitial());
        }, 5000);
      } else if (status === "error") {
        console.log(error,status);
        setMessage(true);
        setCheckField(error+": Network problem!");
        setTimeout(() => {
          setMessage(false);
          setCheckField(""); // also done by without need of checkfield
          dispatch(authInitial());
        }, 5000);
      }
    }, [status]);
  
    
    const handleSubmit =(e) => {  
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      console.log({
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
    });
    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");

    // in this i want to checkthis if email consist of @ or not we can able to do it by email.includes(`@`)but it only check @
    if (isValidEmail(email)&& email) {
      console.log(loading);
      const fields = { name, password, email, role };
      dispatch(RegisterUser(fields));

    }else if(!name || !password){
      setMessage(true);
      setCheckField("All fields are required.")
      setTimeout(() => {
        setMessage(false)
        setCheckField("");
      },3000);
    } else {
      console.log(name);
      setLoginClicked(true);
      setTimeout(() => {
        setLoginClicked(false);
      }, 3000);

    }

     
    } ;

  
    const isValidEmail = (email) => {
      const input = document.createElement("input");
      input.type = "email";
      input.value = email;
      return input.checkValidity();
    };
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
             id="name"
             type='text'
             label="Your Name"
             name="name"
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
             error={loginClicked}
             helperText={loginClicked && "Please enter a valid email address"}
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
            {message && <p className='errorlogin courseDetail' style={{color:"red",marginTop:"5px"}}>{checkField}</p>}
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
             {loading ?<CircularProgress size={24} color="inherit" />: "Sign Up"}
           </Button>
           <Grid2 container>
             <Grid2  sx={{marginLeft:"75px"}}>
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