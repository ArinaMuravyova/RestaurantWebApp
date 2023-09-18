import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import {store} from "./store/index";
import Layout from "./Components/Layout/Layout";
import LogIn from "./Components/LogIn/LogIn";
import LogOff from "./Components/LogOff/LogOff";
import Registration from "./Components/Registration/Registration";
import MainPage from "./Components/MainPage/MainPage";
import Dishes from "./Components/Dishes/Dishes";
import MakeOrder from "./Components/MakeOrder/MakeOrder";
import ModalBasket from "./Components/Modal/ModalBasket";

const App = () => {
  const [dishes, setDishes] = useState([]);
  const [orders, setOrders] = useState([]); //массив заказанных блюд
  let [orderItem, setOrderItem] = useState([]);
  const [currentItems, setCurrentItems] = useState(dishes); //для фильтрованных блюд(для фильтрации)
  const [errorMessages, setErrorMessages] = useState([]);

  /* смена состояния доступа блюда-IsAble и отпрвка данных о изменении на сервер */
  const switchAccessDishState = (dish) => {
    dishes.forEach((el) => {
      if (el.id === dish.id) {
        dish.isAble = !dish.isAble;
        setDishes([...dishes]);
        const requestOptionsDish = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id:dish.id,
            isAble:dish.isAble,
          }),
        };
        return fetch("api/Dish",requestOptionsDish)
        .then((response)=>{
          return response.json()
        })
        .then(
          (data) => {
            if (typeof data !== "undefined") {
              console.log("Dish state is changed");
            }
            typeof data !== "undefined" &&
              typeof data.error !== "undefined" &&
              setErrorMessages(data.error);
          },
          (error) => {
            console.log(error);
          }
        )
      }
    });
  };
  /* уменьшение кол-ва порций блюда на 1 из списка выбранных блюд */
  const deleteDishNumber = (dish) => {
    orders.forEach((el) => {
      if (dish.id === el.id && el.amount > 1) {
        setOrderItem(el.amount--);
      }
    });
  };
  /* отображение блюд по выбранной категории */
  const chooseCategory = (categoryId) => {
    if (categoryId === 6) {
      setCurrentItems(dishes);
      return;
    }
    if (categoryId !== 1)
      setCurrentItems(dishes.filter((el) => el.categoryId === categoryId));
  };
  /* удаление блюда из списка выбранных блюд */
  const deleteOrder = (orderId) => {
    setOrders(orders.filter((el) => el.id != orderId));
  };
  /* добавление блюда к списку выбранных блюд */
  const addToOrder = (item) => {
    /* let isInArray = false;
    setOrderItem((orderItem = item));
    orders.forEach((el) => {
      if (el.id === item.id) {
        isInArray = true;
        el.amount++;
        setOrders([...orders]);
      }
    });
    if (!isInArray) {
      item.amount = 1;
      setOrders([...orders, item]);
      console.log(orders);
    } */
  };

  const [user, setUser] = useState({
    isAuthenticated: false,
    userName: "",
    userRole: "",
  });
  useEffect(() => {
    const getUser = async () => {
      return await fetch("api/account/isauthenticated")
        .then((response) => {
          response.status === 401 &&
            setUser({ isAuthenticated: false, userName: "", userRole: "" });
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
        <Route
          path="/"
          element={
            <Layout
              user={user}
              orders={orders}
              onDelete={deleteOrder}
              onAdd={addToOrder}
              decreaseDishNum={deleteDishNumber}
            />
          }
        >
          <Route index element={<MainPage />} />
          <Route
            path="/menu"
            element={
              <Dishes
                user={user}
                dishes={currentItems}
                setCurrentItems={setCurrentItems}
                setDishes={setDishes}
                /* onAdd={addToOrder} */
                chooseCategory={chooseCategory}
                switchAccessDishState={switchAccessDishState}
              />
            }
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
          <Route
            path="/checkOut"
            element={
              <MakeOrder
                user={user}
                setOrders={setOrders}
                onAdd={addToOrder}
                decreaseDishNum={deleteDishNumber}
                onDelete={deleteOrder}
                orders={orders}
              />
            }
          />
          <Route
              path="/modalBasket"
              element={<ModalBasket/>}
          />
          <Route path="*" element={<h3>404</h3>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
 <Provider store={store}>
   <App />
 </Provider> 

  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
