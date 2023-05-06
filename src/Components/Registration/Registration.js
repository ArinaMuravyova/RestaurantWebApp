import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
 
//const form=document.getElementById('form');

const Registration = ({ user, setUser }) => {
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();
  

  const registration = async (event) => {
    event.preventDefault()
    var { email, password,passwordConfirmed } = document.forms[0]
    console.log(email, password,passwordConfirmed);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        //passwordConfirmed:passwordConfirmed.value,
      }),
    };
    return await fetch("api/account/register", requestOptions)
      .then((response) => {
        response.status === 200 &&
          setUser({ isAuthenticated: false, userName: "", userRole: "" });
        return response.json();
      })
      .then(
        (data) => {
          console.log("Data:", data);
          if (
            typeof data !== "undefined"
          ) {
            setUser({
              isAuthenticated: false,
              userName: data.userName,
              userRole: data.userRole,
            });
            navigate("/login");
          }
          typeof data !== "undefined" &&
            typeof data.error !== "undefined" &&
            setErrorMessages(data.error);
        },
        (error) => {
          console.log(error);
        }
      );
  };
  const renderErrorMessage = () =>
    errorMessages.map((error, index) => <div key={index}>{error}</div>);

  return (
    <>
      {user.userName ? (
        <h3>Пользователь {user.userName} успешно зарегестрирован в системе</h3>
      ) : (
        <>
          <section className="vh-100" style={{backgroundColor: '#eee'}}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{borderRadius: '25px'}}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
      
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Регистрация</p>
      
                      <form className="mx-1 mx-md-4" id="form" onSubmit={registration}>
      
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="text" id="form3Example1c" className="form-control" />
                            <label className="form-label" for="form3Example1c">Ваше Имя</label>
                          </div>
                        </div>
      
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="email" id="form3Example3c" className="form-control" name="email" />
                            <label className="form-label" for="form3Example3c">Ваш email</label>
                          </div>
                        </div>
      
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="password" id="form3Example4c" className="form-control"  name='password' autocomplete="new-password"/>
                            <label className="form-label" for="form3Example4c">Пароль</label>
                          </div>
                        </div>
      
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="password" id="form3Example4cd" className="form-control" name="passwordConfirmed" autocomplete="new-password"/>
                            <label className="form-label" for="form3Example4cd">Повторите пароль</label>
                          </div>
                        </div>
      
                       
      
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="submit" className="btn btn-primary btn-lg">Зарегистрироваться</button>
                        </div>
      
                      </form>
      
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
      
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        classNameName="img-fluid" alt="Sample image"/>
      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {renderErrorMessage()}
        </>
      )}
      
    </>
  );
};
export default Registration;

//form.addEventListener('button',registration);
