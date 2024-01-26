import axiosHttp from "../utils/axios";
import { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ModalAction from './ModalAction';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'
import GroupedButtons from "./GroupedButtons";

export default function Cart() {
  const [cart, setCart] = useState({'items': [], 'total': 0});
  const [sum, setSum] = useState(0);
  const [isDeleteAction, setIsDeleteAction] = useState(false)
  const [item, setItem] = useState({})
  const [serverError, setServerError] = useState(undefined)

  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('token') === null){
      navigate('/')
    }
    getCart()
  }, [isDeleteAction])
  const getCart = async () => {
    try {
      const response = await axiosHttp.get("/cart-items")
      console.log(response.data)
      debugger
      const sum=calcSum(response.data)
      const obj={
        'items': response.data,
        'total': sum
      }
      setCart(obj);
    }
    catch (error) {
      let msg = 'Error fetching cart data'
      if (error.response.data)
        msg = error.response.data
      console.error(msg);
      setServerError(msg)
    }
  }

  const updateCart = async (cart_item_id, product_id, quantity) => {
    try {
      const response = await axiosHttp.patch(`/cart-item/${cart_item_id}`,{
        'product_id': product_id,
        'quantity': quantity
      })
      debugger
      getCart()
    }
    catch (error) {
      let msg = 'Error updating cart data'
      if (error.response.data)
        msg = error.response.data
      console.error(msg);
      setServerError(msg)
    }
  }

  const calcSum=(data)=>{
    let sum=0
    data.forEach(x=>{
      sum+=x.product.price*x.quantity
    })
    return sum.toFixed(2)
  }

  const deleteCartItem = async (cartItemId) => {
    try {
      const response = await axiosHttp.delete(`/cart-item/${cartItemId}`)
      let temp = cart.items
      let indexToDelete = temp.findIndex(item => item.id === cartItemId)
      temp.splice(indexToDelete, 1)
      const sum=calcSum(temp)
      const obj={
        'items': temp,
        'total': sum
      }
      setCart(obj);
      reset()
    }
    catch (error) {
      let msg = 'Error delete cart item'
      if (error.response.data)
        msg = error.response.data
      console.error(msg);
      setServerError(msg)
    }
  }

  const reset = () => {
    setIsDeleteAction(false)
    setItem({})
    setServerError(undefined)
  }

  return (
    <div>
      <TableContainer style={{ height: 400, width: '80%' }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Operations</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.items && cart.items.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  {row.product.name}
                </TableCell>
                <TableCell >{row.product.category.name}</TableCell>
                <TableCell>{row.product.price}</TableCell>
                <TableCell>{row.product.price * row.quantity}</TableCell>
                <TableCell><GroupedButtons cart_item_id={row.id} product_id={row.product.id} quantity={row.quantity} updateCart={updateCart} /><IconButton onClick={() => {
                  setItem(row)
                  setIsDeleteAction(true)
                }
                }>
                  <DeleteIcon /></IconButton></TableCell>
                  
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div><b>Total: {cart.total}$</b></div>
      <ModalAction isOpen={isDeleteAction} handleClose={reset} descriptionText="Are You Sure you want to delete this item?" acceptText="Accept" cancelText="Cancel" action={deleteCartItem} param={item.id} />
      <ModalAction isOpen={serverError === undefined ? false : true} handleClose={reset} descriptionText={serverError} acceptText="Accept" cancelText="Cancel" />
    </div>
  );
}

