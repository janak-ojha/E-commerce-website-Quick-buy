import { useEffect, useState } from 'react';
import { Box, CircularProgress, Stack, TextField, Button } from '@mui/material';
import Popup from '../../../utils/Popop';
import { useDispatch, useSelector, } from 'react-redux';
import { addStuff } from '../../../Redux/UserHandle';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import styled from 'styled-components';
import ImageIcon from '@mui/icons-material/Image';
import {BlueButton} from '../../../utils/ButtonStyles';
import { useNavigate } from 'react-router-dom';

const AddProduct = ( {value,pData,passingFunctionForDivRemove}) => {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const { currentUser, status, response, error } = useSelector(state => state.user);
  const [productName, setProductName] = useState("");
  const [cost, setCost] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [quantity, setQuantity] = useState("");
  const [productImage, setProductImage] = useState("");
  const [localImage, setLocalImage] = useState(''); 
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const seller = currentUser._id;
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
    

const submitHandler = (event) => {
  event.preventDefault();
  setLoader(true); // Assuming you have a loader state

  const fields = {
      productName,
      cost,
      discountPercent,
      quantity,
      productImage: localImage || productImage,
      category,
      description,
      seller,
  };

  // Call the addStuff action
  dispatch(addStuff('productAdd', fields)).then(() => {
      // Clear the form fields
      setProductName("");
      setCost("");
      setDiscountPercent("");
      setQuantity("");
      setProductImage("");
      setLocalImage("");
      setCategory("");
      setDescription("");
      setLoader(false); // Stop the loader
      navigate('/addproduct'); // Navigate to the same page
  });
};



  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLocalImage(reader.result); // Set the uploaded image
        setProductImage(''); // Clear URL field
      };
      reader.readAsDataURL(file); // Convert image to base64
    }
  };

  useEffect(() => {
    if (status === "added") {
      setLoader(false);
      setShowPopup(true);
      setMessage("Done Successfully");
    } else if (status === 'failed') {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === 'error') {
      setLoader(false);
      setMessage("Network Error");
      setShowPopup(true);
    }
  }, [status, response, error]);

  return (
    <>
      <Box
        sx={{
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '30px',
            width: '100%'
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              {/* Image preview from either uploaded file or URL */}
              {
                localImage
                  ? <ProductImage src={localImage} alt="Uploaded" />
                  : productImage
                    ? <ProductImage src={productImage} alt="From URL" />
                    : <ImageIcon sx={{width:90, height:90}}/>
              }
            </Stack>

            <form onSubmit={submitHandler}>
              <Stack spacing={3}>
                {/* Upload from local storage */}
                <input
                  accept="image/*"
                  type="file"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                  id="upload-button"
                />
                <label htmlFor="upload-button">
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<AddPhotoAlternateIcon />}
                  >
                    Upload Image
                  </Button>
                </label>

                {/* Input for product image URL */}
                <TextField
                  fullWidth
                  label="Product Image URL"
                  value={productImage}
                  onChange={(event) => {
                    setProductImage(event.target.value);
                    setLocalImage(''); // Clear local image if URL is entered
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                {/* Other product fields */}
                <TextField
                  fullWidth
                  label="Product Name"
                  value={productName}
                  onChange={(event) => setProductName(event.target.value)}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  fullWidth
                  multiline
                  label="Description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  fullWidth
                  label="Cost"
                  value={cost}
                  onChange={(event) => setCost(event.target.value)}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  fullWidth
                  label="Discount Percent"
                  value={discountPercent}
                  onChange={(event) => setDiscountPercent(event.target.value)}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  fullWidth
                  label="Category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  fullWidth
                  label="quantity"
                  value={quantity}
                  onChange={(event) => setQuantity(event.target.value)}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              
              </Stack>
              <BlueButton
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                variant="contained"
                type="submit"
                disabled={loader}
              >
                {loader ? <CircularProgress size={24} color="inherit" /> : "Add"}
              </BlueButton>
            </form>
          </div>
        </Box>
      </Box>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default AddProduct;

const ProductImage = styled.img`
  width: 200px;
  height: auto;
  margin-bottom: 8px;
`;
