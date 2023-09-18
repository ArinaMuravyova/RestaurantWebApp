import React, {useEffect, useState} from "react";
import { FaTrash } from "react-icons/fa";
import "./OrderItem.css";
import {useSelector,useDispatch} from "react-redux";
import {decreaseAmount, deleteFromOrder, increaseAmount} from "../../store/orderSlice";


const OrderItem = (props) => {
  const dispatch=useDispatch()
  return (
    <>
      <tr>
        <td>
          <div>{props.order.Name}</div>
        </td>
        <td>{props.order.Cost}</td>
        <td className="align-middle">
          <div className="d-flex flex-row">
            <button
              className="btn btn-link px-2"
              onClick={() => dispatch(decreaseAmount({Dish:{...props.order}}))}
            >
              <i className="fas fa-minus"></i>
            </button>

            <input
              id="form1"
              min="0"
              name="quantity"
              value={props.order.Amount}
              type="number"
              className="form-control form-control-sm"
              style={{ width: "50px" }}
            />

            <button
              className="btn btn-link px-2"
              onClick={() => dispatch(increaseAmount({Dish:{...props.order}}))}
            >
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </td>
        <td>
          <FaTrash
            className="delete-icon"
            onClick={() => dispatch(deleteFromOrder({Dish:{...props.order}}))}
          ></FaTrash>
        </td>
      </tr>
    </>
  );
};
export default OrderItem;
