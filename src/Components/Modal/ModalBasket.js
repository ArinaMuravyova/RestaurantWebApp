import React, {useEffect,useState} from "react";
import {Link} from "react-router-dom";
import OrderItem from "../OrderItem/OrderItem";
import {useSelector,useDispatch} from 'react-redux'


/* выводит в корзине выбранные блюда и информацию о них */
const showOrders = (orders) => {
    return (
        <>
            {orders.map((el) => (
                <OrderItem
                    key={el.id}
                    order={el}
                />
            ))}
        </>
    );
};
/* вывод текста в корзине,если товаров в ней нет */
const showNothing = () => {
    return (
        <div className="empty">
            <h2>Товаров нет</h2>
        </div>
    );
};
const ModalBasket=()=>{
    const dispatch=useDispatch()
    const orders=useSelector(state=>state.order.dishesInOrders)
    let sum= useSelector(state=>state.order.orderSum)

    useEffect(()=>{

    })
    return(
        // <div
        //     className="modal fade"
        //     // id="modal-cart"
        //     // tabIndex="-1"
        //     aria-labelledby="exampleModalLabel"
        //     // aria-hidden="true"
        //    >
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header bg-secondary text-white">
                        <h5 className="modal-title" id="exampleModalLabel">
                            Корзина
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <table className="table">
                            <tbody>
                            <>
                                    {orders.length > 0
                                        ? showOrders(orders)
                                        : showNothing()
                                    }
                            </>
                            </tbody>
                        </table>
                        <p className="summa">Итог: {sum}₽</p>
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Закрыть
                        </button>
                        {orders.length > 0 ? (
                            <Link
                                className="btn btn-primary"
                                to="/checkOut"
                                // onClick={() => hideWin()}
                            >
                                Оформить
                            </Link>
                        ) : (
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                                disabled="disabled"
                            >
                                Оформить
                            </button>
                        )}
                    </div>
                </div>
            </div>
         // </div>
    )
}
export default ModalBasket;