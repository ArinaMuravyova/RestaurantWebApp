import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const openAlert = () => {
  return (
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>Holy guacamole!</strong> You should check in on some of those
      fields below.
      <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

const MakeOrder = (props) => {
  let amountItems = 0;
  let newOrder = [];
  props.orders.forEach((el) => {
    amountItems += el.amount;
  });

  let summa = 0;
  props.orders.forEach((element) => {
    summa += element.cost * element.amount;
  });
  
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();
  props.orders.forEach((el) => {
    /* dishesId.push(el.id)
    dishesAmount.push(el.amount) */
    newOrder.push({
      dishId: el.id,
      amount: el.amount,
      cost: el.cost,
    });
  });
  const makeOrder = async () => {
    /* event .preventDefault() */

    const requestOptionsOrderLine = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOrder),
    };
    const requestOptionsOrder = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cost: summa,
      }),
    };
    return await fetch("api/Orders", requestOptionsOrder)
      .then((response) => {
        /* response.status === 200 */
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
        fetch("api/OrderLine", requestOptionsOrderLine)
          .then((response) => {
            /* response.status === 200 */
            navigate("/");
            props.setOrders([])
            console.log("hi",props.orders)  
            return response.json();
          })
          .then(
            (data) => {
              console.log("DataOrderLine:", data);
              if (typeof data !== "undefined") {
               
               // openAlert();
               
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
      <section className="h-100 h-custom">
        <div className="container h-100 py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" className="h5">
                        Оформление заказа
                      </th>

                      <th scope="col">Кол-во</th>
                      <th scope="col">Цена</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.orders.map(function (el, idx) {
                      return (
                        <>
                          <tr>
                            <th scope="row">
                              <div className="d-flex align-items-center">
                                <img
                                  className="img-fluid rounded-3"
                                  style={{ width: "120px" }}
                                />
                                <div className="flex-column ms-4">
                                  <p className="mb-2">{el.name}</p>
                                  <p className="mb-0">Описание</p>
                                </div>
                              </div>
                            </th>

                            <td className="align-middle">
                              <div className="d-flex flex-row">
                                <button
                                  className="btn btn-link px-2"
                                  onClick={() => props.decreaseDishNum(el)}
                                >
                                  <i className="fas fa-minus"></i>
                                </button>

                                <input
                                  id="form1"
                                  min="0"
                                  name="quantity"
                                  value={el.amount}
                                  type="number"
                                  className="form-control form-control-sm"
                                  style={{ width: "50px" }}
                                />

                                <button
                                  className="btn btn-link px-2"
                                  onClick={() => props.onAdd(el)}
                                >
                                  <i className="fas fa-plus"></i>
                                </button>
                              </div>
                            </td>
                            <td className="align-middle">
                              <p className="mb-0" style={{ fontWeight: "500" }}>
                                {el.cost}₽
                              </p>
                            </td>
                            <td>
                              <FaTrash
                                className="delete-icon"
                                onClick={() => props.onDelete(el.id)}
                              ></FaTrash>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div
                className="card shadow-2-strong mb-5 mb-lg-0"
                style={{ borderRadius: "16px" }}
              >
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-md-6 col-lg-4 col-xl-3 mb-4 mb-md-0">
                      <form>
                        <div className="d-flex flex-row pb-3">
                          <div className="d-flex align-items-center pe-2">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="radioNoLabel"
                              id="radioNoLabel1v"
                              value=""
                              aria-label="..."
                              checked
                            />
                          </div>
                          <div className="rounded border w-100 p-3">
                            <p className="d-flex align-items-center mb-0">
                              <i className="fab fa-cc-mastercard fa-2x text-dark pe-2"></i>
                              Credit Card
                            </p>
                          </div>
                        </div>
                        <div className="d-flex flex-row pb-3">
                          <div className="d-flex align-items-center pe-2">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="radioNoLabel"
                              id="radioNoLabel2v"
                              value=""
                              aria-label="..."
                            />
                          </div>
                          <div className="rounded border w-100 p-3">
                            <p className="d-flex align-items-center mb-0">
                              <i className="fab fa-cc-visa fa-2x fa-lg text-dark pe-2"></i>
                              Debit Card
                            </p>
                          </div>
                        </div>
                        <div className="d-flex flex-row">
                          <div className="d-flex align-items-center pe-2">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="radioNoLabel"
                              id="radioNoLabel3v"
                              value=""
                              aria-label="..."
                            />
                          </div>
                          <div className="rounded border w-100 p-3">
                            <p className="d-flex align-items-center mb-0">
                              <i className="fab fa-cc-paypal fa-2x fa-lg text-dark pe-2"></i>
                              PayPal
                            </p>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-6 col-lg-4 col-xl-6">
                      <div className="row">
                        <div className="col-12 col-xl-6">
                          <div className="form-outline mb-4 mb-xl-5">
                            <input
                              type="text"
                              id="typeName"
                              className="form-control form-control-lg"
                              siez="17"
                              placeholder="John Smith"
                            />
                            <label className="form-label" for="typeName">
                              Name on card
                            </label>
                          </div>

                          <div className="form-outline mb-4 mb-xl-5">
                            <input
                              type="text"
                              id="typeExp"
                              className="form-control form-control-lg"
                              placeholder="MM/YY"
                              size="7"
                              id="exp"
                              minlength="7"
                              maxlength="7"
                            />
                            <label className="form-label" for="typeExp">
                              Expiration
                            </label>
                          </div>
                        </div>
                        <div className="col-12 col-xl-6">
                          <div className="form-outline mb-4 mb-xl-5">
                            <input
                              type="text"
                              id="typeText"
                              className="form-control form-control-lg"
                              siez="17"
                              placeholder="1111 2222 3333 4444"
                              minlength="19"
                              maxlength="19"
                            />
                            <label className="form-label" for="typeText">
                              Card Number
                            </label>
                          </div>

                          <div className="form-outline mb-4 mb-xl-5">
                            <input
                              type="password"
                              id="typeText"
                              className="form-control form-control-lg"
                              placeholder="&#9679;&#9679;&#9679;"
                              size="1"
                              minlength="3"
                              maxlength="3"
                            />
                            <label className="form-label" for="typeText">
                              Cvv
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-xl-3">
                      <div
                        className="d-flex justify-content-between"
                        style={{ fontWeight: "500" }}
                      >
                        <p className="mb-2">Subtotal</p>

                        <p className="mb-2">{summa}₽</p>
                      </div>

                      <div
                        className="d-flex justify-content-between"
                        style={{ fontWeight: "500" }}
                      >
                        <p className="mb-0">Shipping</p>
                        <p className="mb-0">$2.99</p>
                      </div>

                      <hr className="my-4" />

                      <div
                        className="d-flex justify-content-between mb-4"
                        style={{ fontWeight: "500" }}
                      >
                        <p className="mb-2">Total (tax included)</p>
                        <p className="mb-2">$26.48</p>
                      </div>

                      <button
                        type="button"
                        className="btn btn-primary btn-block btn-lg"
                        onClick={() => makeOrder()}
                      >
                        <div className="d-flex justify-content-between">
                          <span>Заказать</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default MakeOrder;
