import React, { useState, useEffect } from "react";
import Dish from "../Dish/Dish";
import Categories from "../Categories/Categories";
import { useSelector } from "react-redux";
import {useGetDishesQuery} from "../../store/restaurantGoodsApi";

const Dishes = (props) => {
  const [dish, setDish] = useState(props.dish);
  // const {data,error,isLoadig}=useGetDishesQuery()
  //   console.log("data",data)
  //   if(error){
  //       console.log("error")
  //   }
  useEffect(() => {
          /* получение данных о всех блюдах от сервера */
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
                    props.setCurrentItems(data);
                  },
                  (error) => {
                    console.log(error);
                  }
                );
            };
            getDishes();
          }, [props.setDishes]

  );
  return (
    <React.Fragment>
        {}
      <section className="main-content">
        <div className="container">
          <Categories chooseCategory={props.chooseCategory} />
          <div className="row">
            {props.dishes.map((dish) =>
              props.user.userRole !== "admin" ? (
                dish.isAble === true&&dish.categoryId>1 ? (
                  <Dish
                    key={dish.id}
                    dish={dish}
                    user={props.user}
                  />
                ) : null
              ) : (
                <Dish
                  key={dish.id}
                  dish={dish}
                  accessDishStatus={props.switchAccessDishState}
                  user={props.user}
                />
              )
            )}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
export default Dishes;
