import React, { useEffect } from "react";
import "./Style.css";
 
const Order = ({user, orders, setOrders, removeOrder }) => {
  useEffect(() => {
    const getOrders = async () => {
      const requestOptions = {
        method: "GET",
      };
      return await fetch("api/Orders", requestOptions)
        .then((response) => response.json())
        .then(
          (data) => {
            console.log("Data", data);
            setOrders(data);
          },
          (error) => {
            console.log(error);
          }
        );
    };
    getOrders();
  }, [setOrders]);
  const deleteItem = async ({ id }) => {
    const requestOptions = {
      method: "DELETE",
    };
    return await fetch(
      `api/Orders/${id}`,
      requestOptions
    ).then(
      (response) => {
        if (response.ok) {
          removeOrder(id);
        }
      },
      (error) => console.log(error)
    );
  };
  return (
    <React.Fragment>
      <h3>Список заказов</h3>
      {orders.map(({ id, cost }) => (
        <div className="Order" key={id} id={id}>
          <strong>
          
            Заказ №{id}: стоимость: {cost}{" "}</strong>
            {user.isAuthenticated ? (
            <button onClick={(e) => deleteItem({ id })}>Удалить</button>
            ) : (
              ""
              )}
        </div>
      ))}
    </React.Fragment>
  )
}
export default Order
