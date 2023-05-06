import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Provider} from 'react-redux'
import store from './store'

import Order from "./Components/Order/Order";
import OrderCreate from "./Components/OrderCreate/OrderCreate";
import Layout from "./Components/Layout/Layout";
import LogIn from "./Components/LogIn/LogIn";
import LogOff from "./Components/LogOff/LogOff";
import Registration from "./Components/Registration/Registration";

import MainPage from "./Components/MainPage/MainPage";
import Dishes from "./Components/Dishes/Dishes";
import MakeOrder from './Components/MakeOrder/MakeOrder';



const App = () => {
  const [dishes, setDishes] = useState([]);
  const [orders, setOrders] = useState([]);//массив заказанных блюд
  let [orderItem,setOrderItem]=useState([])
  const [currentItems,setCurrentItems]=useState(dishes)//для фильтрованных блюд(для фильтрации)
  
  //const addOrder = (order) => setOrders([...orders, order]);
  /* const removeOrder = (removeId) =>
    setOrders(orders.filter(({ orderId }) => orderId !== removeId));
 */
  const deleteDishNumber=(dish)=>{
    orders.forEach(el=>{
      if(dish.id===el.id&&el.amount>1){
        setOrderItem(el.amount--)
      }
    })
  }
   const chooseCategory=(categoryId)=>{
    if(categoryId===6){
      setCurrentItems(dishes)
      return
    }
     setCurrentItems(dishes.filter(el=>el.categoryId===categoryId))
   }
   const deleteOrder=(orderId)=>{
      setOrders(orders.filter(el=>el.id!=orderId))
   }
    const addToOrder=(item)=>{
      let isInArray=false
      setOrderItem(orderItem=item)
      orders.forEach(el=>{
        if(el.id===item.id){
          isInArray=true
          setOrderItem(orderItem.amount++)
          console.log(orders)
        }
      })
      if(!isInArray){
       setOrders([...orders,item])
       setOrderItem(orderItem.amount=1)
       //item.amount=1
       console.log(orders)
      }
    }

  const [user, setUser] = useState({
    isAuthenticated: false,
    userName: "",
    userRole: "",
    address:"",
  });
  useEffect(() => {
    const getUser = async () => {
      return await fetch("api/account/isauthenticated")
        .then((response) => {
          response.status === 401 &&
            setUser({ isAuthenticated: false, userName: "", userRole: "",address:"" });
          return response.json();
        })
        .then(
          (data) => {
            if (
              typeof data !== "undefined" &&
              typeof data.userName !== "undefined"
            ) {
              setUser({
                isAuthenticated: true,
                userName: data.userName,
                userRole: data.userRole,
                address:data.address,
              });
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
        <Route path="/" element={<Layout user={user} orders={orders}  onDelete={deleteOrder} onAdd={addToOrder} decreaseDishNum={deleteDishNumber}/>}> 
          <Route index element={<MainPage />} />
          <Route
            path="/menu"
            element={<Dishes dishes={currentItems} setCurrentItems={setCurrentItems} setDishes={setDishes} onAdd={addToOrder}  chooseCategory={chooseCategory}/>}
          />
          <Route
            path="/login"
            element={<LogIn user={user} setUser={setUser} />}
          />
          <Route path="/logoff" element={<LogOff setUser={setUser} />} />
          <Route
            path="/registration"
            element={<Registration user={user} setUser={setUser} />}
          />
          <Route path="/checkOut" element={<MakeOrder setOrders={setOrders} onAdd={addToOrder} decreaseDishNum={deleteDishNumber} onDelete={deleteOrder} orders={orders}/>}/>
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
