import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import SalesCard from '../Scomponent/SellerCard';
import SalesChart from '../Scomponent/SellerChart';


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
         <SalesChart type="line"/>
        </Grid>
        <Grid size={{ xs: 10, md: 6 }}>
        <SalesChart type="bar"/>
        </Grid>
      </Grid>
    </Box>
  );
}
