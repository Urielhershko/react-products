import axios from "axios";
import { useEffect, useState } from "react";
import axiosHttp from '../utils/axios'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

function Cart() {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);

  const getCart = async () => {
    try {

      const response = await axiosHttp.get('/cart-items')
      console.log(response.data)
      setCart(response.data)
    }
    catch (error) {
      if (error.response.data) {
        setError(error.response.data)
      }
      else {
        setError('error fetching cart items')
      }
    }
  }
  useEffect(() => {
    getCart()
  }, []); // get cart when loading this page

  return (
    <div>
      <h2>Cart</h2>
      <TableContainer style={{height: 400, width: '80%'}} component={Paper}>
          <Table sx={{minWidth: 650}} aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart && cart.map((row)=>(
                     <TableRow key={row.id}>
                      <TableCell>{row.product.name}</TableCell>
                      <TableCell>{row.product.category.name}</TableCell>
                      <TableCell>{row.product.price}</TableCell>
                      <TableCell>{row.quantity}</TableCell>
                      <TableCell>{row.product.price * row.quantity}</TableCell>
                      
                     </TableRow>
              ))}
            </TableBody>
          </Table>
      </TableContainer>
      {error}
    </div>
  );
}

export default Cart;
