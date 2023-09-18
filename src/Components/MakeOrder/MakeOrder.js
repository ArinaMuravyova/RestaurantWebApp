import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import{useSelector,useDispatch} from "react-redux";
import {decreaseAmount, deleteFromOrder, increaseAmount} from "../../store/orderSlice";


const MakeOrder = (props) => {
  let orders=useSelector(state=>state.order.dishesInOrders)
  let sum=useSelector(state=>state.order.orderSum)
  let shipping=useSelector(state=>state.order.shipping)
  const dispatch=useDispatch()

  let amountItems = 0;
  let newOrder = [];



  
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();
  props.orders.forEach((el) => {
   
    newOrder.push({
      dishId: el.id,
      amount: el.amount,
      cost: el.cost,
    });
  });
  /* отправка данных о заказе на сервер */
  const makeOrder = async () => {
    var {wishes}=document.forms[0]
    var { address, name,phoneNumber} = document.forms[1]
    const requestOptionsOrderLine = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOrder),
    };
    const requestOptionsOrder = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cost: sum,
        wishes:wishes.value,
        address:address.value,
        phoneNumber:phoneNumber.value,
        name:name.value,
        userEmail:props.user.userName,
      }),
    };
    return await fetch("api/Orders", requestOptionsOrder)
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          if (typeof data !== "undefined") {
            console.log("заказ создан");
          }
          typeof data !== "undefined" &&
            typeof data.error !== "undefined" &&
            setErrorMessages(data.error);
        },
        (error) => {
          console.log(error);
        }
      )
      .then(
        await fetch("api/OrderLine", requestOptionsOrderLine)
          .then((response) => {
            /* response.status === 200 */
            navigate("/");
            props.setOrders([]);
            console.log("hi", props.orders);
            return response.json();
          })
          .then(
            (data) => {
              console.log("DataOrderLine:", data);
              if (typeof data !== "undefined") {
                
              }
              typeof data !== "undefined" &&
                typeof data.error !== "undefined" &&
                setErrorMessages(data.error);
            },
            (error) => {
              console.log(error);
            }
          )
      );
  };
  const renderErrorMessage = () =>
    errorMessages.map((error, index) => <div key={index}>{error}</div>);
  return (
      <>
        <section className="h-100 h-custom" style={{backgroundColor: '#eee'}}>
          <div className="container h-100 py-5">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col">
                <div className="card shopping-cart" style={{borderRadius: '15px'}}>
                  <div className="card-body text-black">

                    <div className="row">

                      <div className="col-lg-6 px-5 py-4">
                      <h3 className="mb-5 pt-2 text-center fw-bold text-uppercase">Ваш заказ</h3>
                      {
                        orders.map((order,index)=>{
                      return(
                      <div className="d-flex align-items-center mb-5">
                        <div className="flex-shrink-0">
                          <img src={order.Img}
                               className="img-fluid" style={{width: '150px'}}/>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <a href="#!" className="float-end text-black"><i className="fas fa-times"></i></a>
                          <h5 className="text-primary">{order.Name}</h5>
                          <div className="d-flex align-items-center">
                            <p className="fw-bold mb-0 me-5 pe-3">{order.Cost}</p>
                            <div className="def-number-input number-input safari_only">
                              <div onClick={()=>dispatch(decreaseAmount({Dish:{...order}}))}
                                      className="minus">
                                <i className="fas fa-minus"></i>
                              </div>
                              <input className="quantity fw-bold text-black" min="0" name="quantity" value={order.Amount}
                                     type="number"/>
                                <div onClick={()=>dispatch(increaseAmount({Dish:{...order}}))}
                                        className="plus">
                                  <i className="fas fa-plus"></i>
                                </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      );
                      })
                      }
                    </div>
                      <hr className="mb-4" style={{height: '2px', backgroundColor: '#1266f1', opacity: '1'}}/>

                        <div className="d-flex justify-content-between px-x">
                          <p className="fw-bold">Доставка:</p>
                          <p className="fw-bold">{shipping}₽</p>
                        </div>
                        <div className="d-flex justify-content-between p-2 mb-2" style={{backgroundColor: '#e1f5fe'}}>
                          <h5 className="fw-bold mb-0">Итог:</h5>
                          <h5 className="fw-bold mb-0">{sum}₽</h5>
                        </div>

                    <div className="col-lg-6 px-5 py-4">

                      <h3 className="mb-5 pt-2 text-center fw-bold text-uppercase">Payment</h3>

                      <form className="mb-5">

                        <div className="form-outline mb-5">
                          <input type="text" id="typeText" className="form-control form-control-lg" size="17"
                                 value="1234 5678 9012 3457" minLength="19" maxLength="19"/>
                          <label className="form-label" htmlFor="typeText">Card Number</label>
                        </div>

                        <div className="form-outline mb-5">
                          <input type="text" id="typeName" className="form-control form-control-lg" size="17"
                                 value="John Smith"/>
                          <label className="form-label" htmlFor="typeName">Name on card</label>
                        </div>

                        <div className="row">
                          <div className="col-md-6 mb-5">
                            <div className="form-outline">
                              <input type="text" id="typeExp" className="form-control form-control-lg" value="01/22"
                                     size="7" id="exp" minLength="7" maxLength="7"/>
                              <label className="form-label" htmlFor="typeExp">Expiration</label>
                            </div>
                          </div>
                          <div className="col-md-6 mb-5">
                            <div className="form-outline">
                              <input type="password" id="typeText" className="form-control form-control-lg"
                                     value="&#9679;&#9679;&#9679;" size="1" minLength="3" maxLength="3"/>
                              <label className="form-label" htmlFor="typeText">Cvv</label>
                            </div>
                          </div>
                        </div>

                        <p className="mb-5">Lorem ipsum dolor sit amet consectetur, adipisicing elit <a
                            href="#!">obcaecati sapiente</a>.</p>

                        <button type="button" className="btn btn-primary btn-block btn-lg">Buy now</button>

                        <h5 className="fw-bold mb-5" style={{position: 'absolute', bottom: '0'}}>
                          <a href="#!"><i className="fas fa-angle-left me-2"></i>Back to shopping</a>
                        </h5>

                      </form>

                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        </section>

      {/*<section className="h-100 h-custom">*/}
      {/*  <div className="container h-100 py-5 ">*/}
      {/*    <div className="row d-flex justify-content-center align-items-center h-100">*/}
      {/*      <div className="col">*/}
      {/*        <div className="table-responsive">*/}
      {/*          <table className="table">*/}
      {/*            <thead>*/}
      {/*              <tr>*/}
      {/*                <th scope="col" className="h5">*/}
      {/*                  Оформление заказа*/}
      {/*                </th>*/}

      {/*                <th scope="col">Кол-во</th>*/}
      {/*                <th scope="col">Цена</th>*/}
      {/*              </tr>*/}
      {/*            </thead>*/}
      {/*            <tbody>*/}
      {/*              {orders.map(function (el, idx) {*/}
      {/*                return (*/}
      {/*                  <>*/}
      {/*                    <tr>*/}
      {/*                      <th scope="row">*/}
      {/*                        <div className="d-flex align-items-center" >*/}
      {/*                          <img*/}
      {/*                            className="img-fluid rounded-3"*/}
      {/*                            style={{ width: "120px" }}*/}
      {/*                            src={el.Img}*/}
      {/*                          />*/}
      {/*                          <div className="flex-column ms-3">*/}
      {/*                            <p className="mb-2">{el.Name}</p>*/}
      {/*                          </div>*/}
      {/*                        </div>*/}
      {/*                      </th>*/}

      {/*                      <td className="align-middle" >*/}
      {/*                        <div className="d-flex flex-row">*/}
      {/*                          <div*/}
      {/*                            className="btn btn-link px-2"*/}
      {/*                            onClick={() => dispatch(decreaseAmount({Dish:{...el}}))}*/}
      {/*                          >*/}
      {/*                            <i className="fas fa-minus"></i>*/}
      {/*                          </div>*/}

      {/*                          <input*/}
      {/*                            id="form1"*/}
      {/*                            min="0"*/}
      {/*                            name="quantity"*/}
      {/*                            value={el.Amount}*/}
      {/*                            type="number"*/}
      {/*                            className="form-control form-control-sm"*/}
      {/*                            style={{ width: "50px" }}*/}
      {/*                          />*/}

      {/*                          <div*/}
      {/*                            className="btn btn-link px-2"*/}
      {/*                            onClick={() => dispatch(increaseAmount({Dish:{...el}}))}*/}
      {/*                          >*/}
      {/*                            <i className="fas fa-plus"></i>*/}
      {/*                          </div>*/}
      {/*                        </div>*/}
      {/*                      </td>*/}
      {/*                      <th className="align-middle">*/}
      {/*                        <p className="mb-0" style={{ fontWeight: "500" }}>*/}
      {/*                          {el.Cost}₽*/}
      {/*                        </p>*/}
      {/*                      </th>*/}
      {/*                      <td>*/}
      {/*                        <div  className='align-items-center'*/}
      {/*                            onClick={() => dispatch(deleteFromOrder({Dish:{...el}}))}>*/}
      {/*                        <FaTrash*/}
      {/*                          className="delete-icon"*/}
      {/*                        ></FaTrash>*/}
      {/*                        </div>*/}
      {/*                      </td>*/}
      {/*                    </tr>*/}
      {/*                  </>*/}
      {/*                );*/}
      {/*              })}*/}
      {/*            </tbody>*/}
      {/*          </table>*/}
      {/*        </div>*/}

      {/*        <div*/}
      {/*          className="card shadow-2-strong mb-5 mb-lg-0"*/}
      {/*          style={{ borderRadius: "16px" }}*/}
      {/*        >*/}
      {/*          <div className="card-body p-4">*/}
      {/*            <div className="row">*/}
      {/*              <div className="col-md-6 col-lg-4 col-xl-3 mb-4 mb-md-0">*/}
      {/*                */}
      {/*                  <form className="form-group" id="wishForm">*/}
      {/*                    <textarea*/}
      {/*                        className="form-control"*/}
      {/*                      id="exampleFormControlTextarea1"*/}
      {/*                      rows="3"*/}
      {/*                      name="wishes"*/}
      {/*                    ></textarea>*/}
      {/*                    <label for="exampleFormControlTextarea1">*/}
      {/*                      Пожелания к заказу*/}
      {/*                    </label>*/}
      {/*                  </form>*/}
      {/*                */}
      {/*              </div>*/}
      {/*              */}
      {/*              <form className="col-md-6 col-lg-4 col-xl-6" id="form">*/}
      {/*                <div className="row">*/}
      {/*                */}
      {/*                  <div className="col-12 col-xl-6">*/}
      {/*                  */}
      {/*                    <div className="form-outline mb-4 mb-xl-5">*/}
      {/*                      <input*/}
      {/*                        type="text"*/}
      {/*                        id="typeName"*/}
      {/*                        className="form-control form-control-lg"*/}
      {/*                        siez="17"*/}
      {/*                        placeholder="Адрес"*/}
      {/*                        name="address"*/}
      {/*                      />*/}
      {/*                      <label className="form-label" for="typeName">*/}
      {/*                        Адрес(улица,дом,подъезд,этаж,квартира)*/}
      {/*                      </label>*/}
      {/*                    </div>*/}

      {/*                    <div className="form-outline mb-4 mb-xl-5">*/}
      {/*                      <input*/}
      {/*                        type="text"*/}
      {/*                        id="typeExp"*/}
      {/*                        className="form-control form-control-lg"*/}
      {/*                        placeholder=""*/}
      {/*                        size="7"*/}
      {/*                        id="exp"*/}
      {/*                        minlength="11"*/}
      {/*                        maxlength="11"*/}
      {/*                        name="phoneNumber"*/}
      {/*                      />*/}
      {/*                      <label className="form-label" for="typeExp">*/}
      {/*                        Номер телефона*/}
      {/*                      </label>*/}
      {/*                    </div>*/}
      {/*                  </div>*/}
      {/*                  <div className="col-12 col-xl-6">*/}
      {/*                    <div className="form-outline mb-4 mb-xl-5">*/}
      {/*                      <input*/}
      {/*                        type="text"*/}
      {/*                        id="typeText"*/}
      {/*                        className="form-control form-control-lg"*/}
      {/*                        siez="17"*/}
      {/*                        placeholder="Имя"*/}
      {/*                        minlength="19"*/}
      {/*                        maxlength="19"*/}
      {/*                        name="name"*/}
      {/*                      />*/}
      {/*                      <label className="form-label" for="typeText">*/}
      {/*                        Имя*/}
      {/*                      </label>*/}
      {/*                    </div>*/}
      {/*                   */}
      {/*                  </div>*/}
      {/*                </div>*/}
      {/*              </form>*/}
      {/*              */}
      {/*              <div className="col-lg-4 col-xl-3">*/}
      {/*                <div*/}
      {/*                  className="d-flex justify-content-between"*/}
      {/*                  style={{ fontWeight: "500" }}*/}
      {/*                >*/}
      {/*                  <p className="mb-2">Сумма заказа</p>*/}

      {/*                  <p className="mb-2">{sum}₽</p>*/}
      {/*                </div>*/}

      {/*                <div*/}
      {/*                  className="d-flex justify-content-between"*/}
      {/*                  style={{ fontWeight: "500" }}*/}
      {/*                >*/}
      {/*                  <p className="mb-0">Доставка</p>*/}
      {/*                  <p className="mb-0">{shipping}₽</p>*/}
      {/*                </div>*/}

      {/*                <hr className="my-4" />*/}

      {/*                <div*/}
      {/*                  className="d-flex justify-content-between mb-4"*/}
      {/*                  style={{ fontWeight: "500" }}*/}
      {/*                >*/}
      {/*                  <p className="mb-2">Итого</p>*/}
      {/*                  <p className="mb-2">{sum}₽</p>*/}
      {/*                </div>*/}
      {/*                <>*/}
      {/*                {props.user.isAuthenticated&&orders.lenght>0&&*/}
      {/*                <div*/}
      {/*                  className="btn btn-primary btn-block btn-lg"*/}
      {/*                  onClick={() => makeOrder()}*/}
      {/*                >*/}
      {/*                  <div className="d-flex justify-content-between">*/}
      {/*                    <span>Заказать</span>*/}
      {/*                  </div>*/}
      {/*                </div>*/}
      {/*                }*/}
      {/*                </>*/}
      {/*              </div>*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}
      </>
);
};
export default MakeOrder;
