import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { styled } from "@mui/material";
import HomeCorosel from "../utils/home/HomeCorosel";
import Categories from "../utils/navbar/Categories";
import Slide from '../utils/home/slide';
import HomeCard from "../utils/home/HomeCard";
import { Typography } from '@mui/material';
import { getProductOfSeller, getProducts } from "../Redux/UserHandle";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { NewtonsCradle } from "@uiball/loaders";
import { useEffect } from 'react';

const Home = () => {
  const { currentUser, responseProduct, error, loading, productData, listOfProductOfSingleSeller } = useSelector((state) => state.user);

  const [showNetworkError, setShowNetworkError] = useState(false);
  const dispatch = useDispatch();
  console.log(currentUser);
  const Id = currentUser?._id;
  console.log("currentUser:", currentUser);
  console.log("Id:", Id);
  const adURL = "https://rukminim1.flixcart.com/flap/464/708/image/1f03e99f6dc9f7a6.jpg?q=70";

  useEffect(() => {
    dispatch(getProducts());
    if (Id !== undefined) {
      if (currentUser?.role === "Seller") {
        dispatch(getProductOfSeller(Id));
      }
    }
  }, []); 


  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => {
        setShowNetworkError(true);
      }, 40000);

      return () => clearTimeout(timeoutId);
    }
  }, [error]);
  
  return (
    <div>
      <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', borderRadius: "20px", flexGrow: 1, marginTop: 1 }} >
        <Categories />
      </Box>
      {currentUser?.role !== "Seller" && (
        <Box maxWidth="xl" sx={{ marginTop: 2, marginLeft: 1, marginRight: 1 }}>
          <HomeCorosel />
        </Box>
      )}
      {showNetworkError ? (
        <Box>
          <h1>Sorry, network error</h1>
        </Box>
      ) : error ? (
        <Box>
          <h1>Please wait a second</h1>
          <NewtonsCradle size={70} speed={1.4} color="black" />
        </Box>
      ) : (
        <>
          {responseProduct ? (
            <>
              <Box>No Product Found</Box>
              <Box>Become a Seller to add Product
                <Link to={"/registerseller"}>Join</Link>
              </Box>
            </>
          ) : (
            <>
              <Component>
                <LeftComponent>
                  <Slide
                    products={
                      currentUser?.role === "Seller"
                        ? listOfProductOfSingleSeller
                        : productData
                    }
                    title="Top Selection"
                  />
                </LeftComponent>
                <RightComponent>
                  <img src={adURL} alt="" style={{ width: 217 }} />
                </RightComponent>
              </Component>
              {(listOfProductOfSingleSeller && listOfProductOfSingleSeller.length === 0 && currentUser?.role === "Seller") ? (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  {loading && <h1>Loading...</h1>}
                  {!loading && <h2>You haven't added any product yet to sell.</h2>}
                </div>
              ) : (
                <>
                {" "}
                  <Slide
                    products={currentUser?.role === "Seller" ? listOfProductOfSingleSeller : productData}
                    title="Deals of the Day"
                  />
                  <Slide
                    products={currentUser?.role === "Seller" ? listOfProductOfSingleSeller : productData}
                    title="Suggested Items"
                  />
                  <Slide
                    products={currentUser?.role === "Seller" ? listOfProductOfSingleSeller : productData}
                    title="Discounts for You"
                  />
                  <Slide
                    products={currentUser?.role === "Seller" ? listOfProductOfSingleSeller : productData}
                    title="Recommended Items"
                  />
                </>
              )}
            </>
          )}
        </>
      )}
      <Box>
        <Typography variant='h5'>
          copy right @janakojha977
        </Typography>
      </Box>
    </div>
  );
};

export default Home;

const Component = styled(Box)`
  display: flex;
`;
const StyledContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;
`;

const LeftComponent = styled(Box)(({ theme }) => ({
  width: "83%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const RightComponent = styled(Box)(({ theme }) => ({
  marginTop: 10,
  background: "#FFFFFF",
  width: "17%",
  marginLeft: 10,
  padding: 5,
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));
