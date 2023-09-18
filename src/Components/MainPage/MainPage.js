import React from "react";
import Layout from "../Layout/Layout";
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./img/1.jpg";
import "./img/2.jpg";
import "./img/3.jpg";
import "./MainPage.css";

const MainPage = () => {
  
  return (
    <>
      <div className="container-fluid my-carousel">
        <div
          id="carouselExampleIndicators"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          data-bs-interval="5000"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="img/1.jpg" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="img/2.jpg" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="img/3.jpg" className="d-block w-100" alt="..." />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      {/*   контейнер о нас */}
      <div className="about-section">
        <div className="inner-width">
          <h1>O Цони-Мацони</h1>
          <div className="border"></div>
          <div className="about-section-row">
            <div className="about-section-col">
              <div className="about">
                <p>Переступая порог нашего грузинского дома, вы попадаете в колоритную атмосферу, где каждая деталь продумана и сделана с душой: здесь кружевные балконы Тбилиси, грузинский алфавит над открытой кухней, старинная посуда, репродукция картины Пиросмани «Кутеж у Гвимрадзе».</p>
                
              </div>
            </div>
            <div className="about-section-col">
              <p>Цони-Мацони –ресторан современной грузинской кухни, открывающий новый взгляд на традиционные кавказские блюда.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
