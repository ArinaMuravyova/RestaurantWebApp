import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {addToOrder} from '../../store/orderSlice'

const Dish = (props) => {
  const [dish,setDish]=useState(props.dish);
  //const dispatch=useDispatch();
  /* useEffect(() => {
    const getDish =  () => {
      setDish(dish);
    };
    getDish();
  }, [setDish]); */
  /*  const deleteItem = async ({ id }) => {
    const requestOptions = {
      method: "DELETE",
    };
    return await fetch(
      `api/Dish/${id}`,
      requestOptions
    ).then(
      (response) => {
        if (response.ok) {
          removeDish(id);
        }
      },
      (error) => console.log(error)
    );
  }; */
  return (
    <React.Fragment>
      {/* <section className="main-content">
        <div className="container">
          <div className="row"> */}

          {/* {dishes.map(({ name, cost }) => ( */}
            <div className="col-lg-4 col-sm-6 mb-3">
              <div className="product-card">
                <div className="product-thumb">
                  <a href="#">
                    <img src="" alt="" />
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
                      <Link onClick={()=>props.addToOrder(dish)}>
                        <i className="fas fa-shopping-cart"></i>
                      </Link>
                      {/* <a href="#"     >
                        <i className="far fa-heart"></i>
                      </a> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
         {/*  ))} */}
        {/* </div>
        </div>
      </section> */}
    </React.Fragment>
  );
};
export default Dish;


