import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import SalesCard from '../Scomponent/SellerCard';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function SellerHomepage() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
      <Grid size={{ xs: 10, md: 3}}>
          <SalesCard title="Weekly Sales" total="1" color='primary' icon={'ant-design:carry-out-filled'} />
        </Grid>
        <Grid size={{ xs: 10, md: 3 }}>
        <SalesCard title="Added to Cart" total= "2" color="success" icon={'ant-design:shopping-cart-outlined'} />
        </Grid>
        <Grid size={{ xs: 10, md: 3 }}>
            <SalesCard title="Ongoing Orders" total="3" color="warning" icon={'material-symbols:data-exploration'} />
        </Grid>
        <Grid size={{ xs: 10, md: 3 }}>
        <SalesCard title="Cancelled Orders" total="4" color="error" icon={'material-symbols:free-cancellation-rounded'} />
        </Grid>
        <Grid size={{ xs: 10, md: 6 }}>
          <Item>
          <Box sx={{height:200}}>
                hello
            </Box>
          </Item>
        </Grid>
        <Grid size={{ xs: 10, md: 6 }}>
          <Item>
          <Box sx={{height:200}}>
                hello
            </Box>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
