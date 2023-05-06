import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import "./OrderItem.css";

const OrderItem = (props) => {
  const [order, setOrder] = useState(props.order);
  return (
    <>
      <tr>
        <td>
          <div>{props.order.name}</div>
        </td>
        <td>{props.order.cost}</td>
        <td className="align-middle">
          <div className="d-flex flex-row">
            <button
              className="btn btn-link px-2"
              onClick={() => props.decreaseDishNum(order)}
            >
              <i className="fas fa-minus"></i>
            </button>

            <input
              id="form1"
              min="0"
              name="quantity"
              value={props.order.amount}
              type="number"
              className="form-control form-control-sm"
              style={{ width: "50px" }}
            />

            <button
              className="btn btn-link px-2"
              onClick={() => props.onAdd(props.order)}
            >
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </td>
        <td>
          <FaTrash
            className="delete-icon"
            onClick={() => props.onDelete(props.order.id)}
          ></FaTrash>
        </td>
      </tr>
    </>
  );
};
export default OrderItem;
