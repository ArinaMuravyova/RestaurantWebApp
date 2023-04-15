import React from "react";

const OrderCreate = ({addOrder }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { value } = e.target.elements.dishId;
    const order = { dishId: value };
    const createOrder = async () => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      };
      const response = await fetch(
        "api/Orders",
        requestOptions
      );

      return await response.json().then(
        (data) => {
          console.log(data);

          if (response.ok) {
            addOrder(data);
            //e.target.elements.dishId.value = "";
          }
        },
        (error) => console.log(error)
      );
    };
    createOrder();
  };
  return (
    <React.Fragment>
      <h3>Создание нового заказа</h3>
      <form onSubmit={handleSubmit}>
        <button type="submit">Создать</button>
      </form>
    </React.Fragment>
  );
};
export default OrderCreate;
