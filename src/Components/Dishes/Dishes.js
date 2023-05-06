import React, { useState, useEffect } from "react";
import Dish from "../Dish/Dish";
import Categories from "../Categories/Categories";
import {useSelector} from 'react-redux'

const Dishes=(props) => {
   

    useEffect(() => {
      const getDishes = async () => {
        const requestOptions = {
          method: "GET",
        };
        return await fetch("api/Dish", requestOptions)
          .then((response) => response.json())
          .then(
            (data) => {
              console.log("Data", data);
              props.setDishes(data);
              props.setCurrentItems(data)
            },
            (error) => {
              console.log(error);
            }
          );
      };
      getDishes();
    }, [props.setDishes]);
    return (
        <React.Fragment>
         
          <section className="main-content">
            <div className="container">
            <Categories chooseCategory={props.chooseCategory}/>
              <div className="row">
              {props.dishes.map(dish => (
                <Dish key={dish.id} dish={dish} addToOrder={props.onAdd} decreaseDishNum={props.decreaseDishNum} />
              ))}
              </div>
        </div>
      </section>
    </React.Fragment>
  );
};
export default Dishes;
