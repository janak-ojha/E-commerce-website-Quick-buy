import React from 'react'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import HomeCorosel from "../utils/home/HomeCorosel";
import Categories from "../utils/navbar/Categories";
import HomeCard from "../utils/home/HomeCard";
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import particularProductDetails from "../Redux/UserHandle";


const Home = () => {
 
  return (
    <>
    <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', borderRadius:"20px", flexGrow: 1, marginTop:1 }} >
        <Categories/>
    </Box>
    <Box maxWidth="xl" sx={{marginTop:2, marginLeft:1,marginRight:1}}>
       <HomeCorosel/>
    </Box>
    <Box>
      <Typography 
      variant='h5'
      fontWeight="600"
       >
        Top Selection
      </Typography>
      <HomeCard/>
    </Box>
    <Box>
     <Typography 
       variant='h5'
       fontWeight="600"
     >
        Deal Of The Day
      </Typography>
      <HomeCard/>
    </Box>
    <Box>
      <Typography 
       variant='h5'
       fontWeight="600"
      >
       Recommended Items 
      </Typography>
      <HomeCard/>
    </Box>
    <Box>
      <Typography 
       variant='h5'
       fontWeight="600"
      >
        Discount For You
      </Typography>
      <HomeCard/>
    </Box>
    <Box>
      <Typography 
       variant='h5'
       fontWeight="600"
      >
        Discount For You
      </Typography>
      <HomeCard/>
    </Box>
    <Box>
      <Typography 
       variant='h5'
       fontWeight="600"
      >
        About us
      </Typography>
      Janakojha2024@ccopyright
    </Box>
    </>
  )
}

export default Home