import { useAuth } from "./utils/AuthContext";
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import { Add, Delete, Remove } from "@mui/icons-material";

export default function CartPage() {
  const { cartItem, removeFromCart } = useAuth();
  const [quantities, setQuantities] = useState({});

  const calculateTotal = () => {
    return cartItem.reduce((total, item) => total + (item.price * getQuantity(item.id)), 0);
  };

  const handleQuantityChange = (item, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [item.id]: value,
    }));
  };

  const getQuantity = (itemId) => {
    return quantities[itemId] || 1;
  };

  return (
    <Box
      sx={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        Shopping Cart
      </Typography>
      {cartItem.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item Name</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItem.map((item) => (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell align="right">Rs. {item.price}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => handleQuantityChange(item, getQuantity(item.id) - 1)}
                      disabled={getQuantity(item.id) <= 1}
                    >
                      <Remove />
                    </IconButton>
                    {getQuantity(item.id)}
                    <IconButton
                      onClick={() => handleQuantityChange(item, getQuantity(item.id) + 1)}
                    >
                      <Add />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    Rs. {item.price * getQuantity(item.id)}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="secondary"
                      onClick={() => removeFromCart(item)}
                    >
                        <Delete/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} align="right">
                  <Typography variant="h6">Total:</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">Rs. {calculateTotal()}</Typography>
                </TableCell>
                <TableCell />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h6">Your cart is empty.</Typography>
      )}
      <Box sx={{ marginTop: '20px' }}>
        <Button variant="contained" color="primary">
          Checkout
        </Button>
      </Box>
    </Box>
  );
}
