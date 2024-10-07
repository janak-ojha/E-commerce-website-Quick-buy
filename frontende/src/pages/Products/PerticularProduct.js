import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Alert, Button, CardActionArea, TextField } from "@mui/material";
import styled from "styled-components";
import BoltIcon from "@mui/icons-material/Bolt";
import StarRateIcon from "@mui/icons-material/StarRate";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect,useState } from "react";
import AddProduct from "../../components/Seller/component/AddProduct";
import { particularProductDetails } from "../../Redux/UserHandle";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  gap: 10px;
  background-color: #e4e7ed;

  & > div:first-child {
    flex: 0 0 40vw;
    max-height: 75vh;
  }

  & > div:last-child {
    flex: 1;
    padding-left: 20px;
  }

  @media only screen and (max-width:768px) {
      display: flex; /* Add semicolon here */
      justify-content: center; /* Add semicolon here */
      align-items: center; /* Add semicolon here */
      gap: 20px;
      flex-direction: column;

      & > div:first-child {
        display:flex;
        align-items:center;
        justify-content:center;
        width:99vw;
        height:80vh;
      }
  }
`;

export const StyledButton = styled(Button)`
  && {
    background-color: #ffa500;
    color: white;

    &:hover {
      background-color: #ff8500;
    }
  }
`;

export const ScrollableParagraph = styled.div`
  height: 90vh;
  overflow-y: scroll;
  padding: 10px;
`;

const PerticularProduct = () => {
   const{response,currentUser,particularProductData} = useSelector((state) => state.user);
   console.log(currentUser);

   const [selectedValue, SetSelectedValue] = useState("");
   const [clickButton, setClickButton] = useState(false);
   const navigate = useNavigate();
  const dispatch = useDispatch();
  const Id = currentUser?._id;
  const encodedImage = useParams().encodedImage;
  const productId = useParams().productId;
  const decodedImage = decodeURIComponent(encodedImage);
  useEffect(() => {
    dispatch(particularProductDetails(productId));
  }, [dispatch]);

  const selecteButtonHandler = (value) => {
    SetSelectedValue(value);
    setClickButton(true);
  }
  
  const handleAddToCart =() =>{
    if(currentUser?.role === null || currentUser?.role === undefined)
    {
        navigate('/buyingorcartingwithoutlogin');
    }
    else{
        const customer = currentUser._id;
        const product = particularProductData._id;
        const quantity = 1;
        const field = {customer,product,quantity};
        dispatch()
    }
  }
  
  const handleBuyFromParticularProduct =() =>{

  }


  return (
    <>
    {response != null ? (
        <>
          <Alert
            severity="success"
            color="info"
            style={{
              position: "fixed",
              top: "65px",
              right: "5px",
              width: "30vw",
              zIndex: 1000,
            }}
          >
            {response}
          </Alert>
        </>
    ):(
        ""
    )}
    <StyledDiv>
        <div>
            <Card sx={{ maxWidth: "98vw" }}>
            <CardActionArea>
            <CardMedia
              style={{ height: "65vh", objectFit: "contain" }}
              image={decodedImage}
              alt="green iguana"
            />
          </CardActionArea>
          {currentUser?.role === "Seller" ? (
            <CardContent style={{ display: "flex", justifyContent: "space-around" }}>
                <StyledButton variant="contained" onClick={(e)=> {selecteButtonHandler("update")}}> 
                <AddShoppingCartIcon style={{ marginRight: "5px" }} />
                update Product
              </StyledButton>
              <Button variant="contained" onClick={(e)=> {selecteButtonHandler("remove")}} style={{marginLeft:'2px'}}>
                {" "}
                <BoltIcon style={{ marginRight: "5px" }} />
                Remove
              </Button>
            </CardContent>
          ):(
            <CardContent
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <StyledButton variant="contained" onClick={handleAddToCart}>
                <AddShoppingCartIcon style={{ marginRight: "5px" }} />
                ADD TO CART
              </StyledButton>
              <Button style={{marginLeft:'2px'}}
                variant="contained"
                onClick={handleBuyFromParticularProduct}
              >
                {" "}
                <BoltIcon style={{ marginRight: "5px" }} />
                BUY NOW
              </Button>
            </CardContent>
          )}
            </Card>
        </div>
    </StyledDiv>
    </>
  )
}

export default PerticularProduct

