import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const GroupedButtons = ({cart_item_id, product_id, quantity, updateCart}) => {
  const handleIncrement = (e) => {
    debugger
    updateCart(cart_item_id, product_id, quantity + 1);
  };

  const handleDecrement = (e) => {
    debugger
    updateCart(cart_item_id, product_id, quantity - 1);
  };
  return (
    <ButtonGroup size="small" aria-label="small outlined button group">
      <Button onClick={handleDecrement}>-</Button>
      <Button disabled>{quantity}</Button>
      <Button onClick={handleIncrement}>+</Button>
    </ButtonGroup>
  );
};

export default GroupedButtons;
