import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {addToOrder, decreaseAmount, increaseAmount} from "../../store/orderSlice";
import "./Dish.css";
import "bootstrap-icons/font/bootstrap-icons.css";
const Dish = (props) => {
  const [dish, setDish] = useState(props.dish);
  const dispatch=useDispatch();
  return (
    <React.Fragment>
      <div className="col-lg-4 col-sm-6 mb-3">
        <div className="product-card" id="product-card">
          <div className="product-thumb">
            <a>
              {props.dish.id ? (
                <img id="view" src={dish.img} alt="" />
              ) : (
                <img id="view" src="" alt="" />
              )}
            </a>
          </div>
          <div className="product-details">
            <h4>
              <a href="#">{dish.name}</a>
            </h4>

            <div className="product-bottom-details d-flex justify-content-between">
              <div className="product-price">
                <small></small> {dish.cost}₽
              </div>
              <div className="product-links">
                {(props.user.userRole==='admin')?
              <div className="form-check form-switch">
               {/*  {(dish.isAble===true)? */}
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    checked={dish.isAble}
                    id="flexSwitchCheckDefault"
                    onClick={()=>props.accessDishStatus(dish)}
                  />
               {/*  : 
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    checked 
                    onClick={()=>switchState()}
                  /> 
                }  */}
                  <label className="form-check-label" for="flexSwitchCheckDefault">
                    В наличии
                  </label>
                </div>:
                    <div>
                      <div className="basket-icon"
                          onClick={() => dispatch(addToOrder({Dish:{Id:dish.id,Name:dish.name,Cost:dish.cost,Img:dish.img}}))}>
                        <i className="fas fa-shopping-cart"></i>
                      </div>
                    </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </React.Fragment>
  );
};
export default Dish;
