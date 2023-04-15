import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Order from "./Components/Order/Order";
import OrderCreate from "./Components/OrderCreate/OrderCreate";
import Layout from "./Components/Layout/Layout";
import LogIn from "./Components/LogIn/LogIn";
import LogOff from "./Components/LogOff/LogOff";
import Registration from "./Components/Registration/Registration";

const App = () => {
  const [orders, setOrders] = useState([]);
  const addOrder = (order) => setOrders([...orders, order]);
  const removeOrder = (removeId) =>
    setOrders(orders.filter(({ orderId }) => orderId !== removeId));
  
  const [user, setUser] = useState({
    isAuthenticated: false,
    userName: "",
    userRole: "",
    })
  useEffect(() => {
    const getUser = async () => {
      return await fetch("api/account/isauthenticated")
        .then((response) => {
          response.status === 401 &&
            setUser({ isAuthenticated: false, userName: "" ,userRole: ""});
          return response.json();
        })
        .then(
          (data) => {
            if (
              typeof data !== "undefined" &&
              typeof data.userName !== "undefined"
            ) {
              setUser({ isAuthenticated: true, userName: data.userName });
            }
          },
          (error) => {
            console.log(error);
          }
        );
    };
    getUser();
  }, [setUser]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={user} />}>
          <Route index element={<h3>Главная страница</h3>} />
          <Route
            path="/Orders"
            element={
              <>
                <OrderCreate addOrder={addOrder} />
                <Order
                  user={user}
                  orders={orders}
                  setOrders={setOrders}
                  removeOrder={removeOrder}
                />
              //</>
            }
          />
          <Route
            path="/login"
            element={<LogIn user={user} setUser={setUser} />}
          />
          <Route path="/logoff" element={<LogOff setUser={setUser} />} />
          <Route path="/registration" element={<Registration/>} />
          <Route path="*" element={<h3>404</h3>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
