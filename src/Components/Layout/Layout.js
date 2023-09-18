import React, { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Outlet, Link } from "react-router-dom";
import OrderItem from "../OrderItem/OrderItem";
import "./Layout.css";

// /* выводит в корзине выбранные блюда и информацию о них */
// const showOrders = (props) => {
//   return (
//     <>
//       {props.orders.map((el) => (
//         <OrderItem
//           key={el.id}
//           order={el}
//           onDelete={props.onDelete}
//           onAdd={props.onAdd}
//           decreaseDishNum={props.decreaseDishNum}
//         />
//       ))}
//     </>
//   );
// };
// /* вывод текста в корзине,если товаров в ней нет */
// const showNothing = () => {
//   return (
//     <div className="empty">
//       <h2>Товаров нет</h2>
//     </div>
//   );
// };

//const hideWin = () => {};

const Layout = (props) => {

  //let basketIsOpen=useSelector(state=>state.modal.modalBasketOpen)
  let dispatch=useDispatch()
  //const orders=useSelector(state=>state.orders.orders)
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <a className="navbar-brand">Цони-мацони</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 top-menu">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Главная
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/menu">
                  Меню
                </Link>
                <span> </span>
              </li>
              <li className="nav-item">
                {/* <Link className="nav-link" to="/info">
                  О Нас
                </Link> */}
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  href="#"
                >
                  <>
                    {props.user.isAuthenticated ? (
                      <i className="far fa-user">{props.user.userName}</i>
                    ) : (
                      <i className="far fa-user"></i>
                    )}
                  </>
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to="/registration">
                      Регистрация
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/login">
                      Авторизация
                    </Link>
                  </li>
                  {/* <li>
                    <Link  className="dropdown-item" to="/logoff">
                      Выход
                    </Link>
                  </li> */}
                  <li>
                    <Link className="dropdown-item" to="/logoff">
                      <button
                      type="button"
                      className="btn btn-primary"
                     
                      style={{ background: "fff" }}
                    >
                      Выход
                      </button>
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/modalBasket"
                  // data-bs-toggle="modal"
                  // data-bs-target="#modal-cart"
                  // onClick={() => dispatch(toggleModalState({Type:'modalBasket'}))}
                >
                  <i className="fas fa-shopping-cart"></i>
                </Link>
                {/*<div*/}
                {/*  className="modal fade"*/}
                {/*  id="modal-cart"*/}
                {/*  tabIndex="-1"*/}
                {/*  aria-labelledby="exampleModalLabel"*/}
                {/*  aria-hidden="true"*/}
                {/*>*/}
                {/*  <div className="modal-dialog modal-xl">*/}
                {/*    <div className="modal-content">*/}
                {/*      <div className="modal-header bg-secondary text-white">*/}
                {/*        <h5 className="modal-title" id="exampleModalLabel">*/}
                {/*          Корзина*/}
                {/*        </h5>*/}
                {/*        <button*/}
                {/*          type="button"*/}
                {/*          className="btn-close"*/}
                {/*          data-bs-dismiss="modal"*/}
                {/*          aria-label="Close"*/}
                {/*        ></button>*/}
                {/*      </div>*/}
                {/*      <div className="modal-body">*/}
                {/*        <table className="table">*/}
                {/*          <tbody>*/}
                {/*            {winOpen && (*/}
                {/*              <>*/}
                {/*                {props.orders.length > 0*/}
                {/*                  ? showOrders(props)*/}
                {/*                  : showNothing()}*/}
                {/*              </>*/}
                {/*            )}*/}
                {/*          </tbody>*/}
                {/*        </table>*/}
                {/*        <p className="summa">Итог: {summa}₽</p>*/}
                {/*      </div>*/}

                {/*      <div className="modal-footer">*/}
                {/*        <button*/}
                {/*          type="button"*/}
                {/*          className="btn btn-secondary"*/}
                {/*          data-bs-dismiss="modal"*/}
                {/*        >*/}
                {/*          Закрыть*/}
                {/*        </button>*/}
                {/*        {props.orders.length > 0 ? (*/}
                {/*          <Link*/}
                {/*            className="btn btn-primary"*/}
                {/*            to="/checkOut"*/}
                {/*           // onClick={() => hideWin()}*/}
                {/*          >*/}
                {/*            Оформить*/}
                {/*          </Link>*/}
                {/*        ) : (*/}
                {/*          <button*/}
                {/*            type="button"*/}
                {/*            className="btn btn-primary"*/}
                {/*            data-bs-dismiss="modal"*/}
                {/*            disabled="disabled"*/}
                {/*          >*/}
                {/*            Оформить*/}
                {/*          </button>*/}
                {/*        )}*/}
                {/*      </div>*/}
                {/*    </div>*/}
                {/*  </div>*/}
                {/*</div>*/}
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="fas fa-search"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />

      <footer class="bg-light text-center text-lg-start">
        <div
          class="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2023 Ресторан грузинской кухни "Цони-мацони"
        </div>
      </footer>
    </>
  );
};
export default Layout;
