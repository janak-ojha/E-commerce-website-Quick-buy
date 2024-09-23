import { Box, Container, Typography } from '@mui/material'
import React, { useState ,useEffect} from 'react'
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
import { useDispatch, useSelector } from 'react-redux';
import { LoginUser } from '../../Redux/UserHandle';
import { authInitial } from '../../Redux/UserSlice';
import { useNavigate } from 'react-router-dom';


const defaultTheme = createTheme();


const LoginAs = ({role}) => {
  const {status,response,error,loading} = useSelector((state) => state.user);
  const [checkField, setCheckField] = useState("");
  const [message, setMessage] = useState(false);
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(role);
  const updatedrole = role.charAt(0).toLowerCase() + role.slice(1);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    const email = data.get('email');
    const password = data.get('password');
    const fields = { password, email,role };
    dispatch(LoginUser(fields));
  };

  useEffect(() => {
    console.log(status);
    if(status === "success"){
      dispatch(authInitial());
      navigate(`/`);
    }else if(status === "failed"){
      setMessage(true);
      setCheckField(response);
      setTimeout(()=> {
        setMessage(false);
        setCheckField("");
        dispatch(authInitial())
      },5000)
    }else if(status === "error"){
      setMessage(true);
      setCheckField(error+"Network problem!");
      setTimeout(() => {
        setMessage(false);
        setCheckField(""); // also done by without need of checkfield
        dispatch(authInitial());
      },5000)
    }
  },[status])


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
                Login In As {role}
            </Typography>
         <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
              {loading ?<CircularProgress size={24} color="inherit" />: "Log In"}
            </Button>
            <Grid2 container>
              <Grid2  xs>
                <Link href="#" variant="body2">
                  Forgot password?  
                </Link>
              </Grid2>
              <Grid2 sx={{marginLeft:"75px"}}>
                <Link href={`/register${updatedrole}`} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid2>
            </Grid2>
         </Box>   
        </Box>
      </Container>
      </ThemeProvider>

  )
}

export default LoginAs