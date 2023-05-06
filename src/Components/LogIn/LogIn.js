import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";



const LogIn = ({ user, setUser }) => {
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();

  const logIn = async (event) => {
    event.preventDefault()
    var { email, password } = document.forms[0]
   // console.log("Success:", formValues);
    
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
       // rememberme: formValues.remember,
      }),
    };
    return await fetch("api/account/login", requestOptions)
      .then((response) => {
        //console.log(response.status);
        response.status === 200 &&
          setUser({ isAuthenticated: true, userName: "", userRole: "" });
        return response.json();
      })
      .then(
        (data) => {
          console.log("Data:", data);
          if (
            typeof data !== "undefined" &&
            typeof data.userName !== "undefined"
          ) {
            setUser({
              isAuthenticated: true,
              userName: data.userName,
              userRole: data.userRole,
            });
            navigate("/");
           
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
        <h3>Пользователь {user.userName} вошел в системе</h3>
      ) : (
        <>
        
          <section 
            className="h-100 gradient-form"
            style={{backgroundColor:'#eee'}}
          >
            <div className="container py-5 h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-xl-10">
                  <div className="card rounded-3 text-black">
                    <div className="row g-0">
                      <div className="col-lg-6">
                        <div className="card-body p-md-5 mx-md-4">
                          <div className="text-center">
                            <img
                              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                              style={{ width: "185px" }}
                              alt="logo"
                            />
                            <h4 className="mt-1 mb-5 pb-1">
                              Цони-мацони
                            </h4>
                          </div>

                          <form onSubmit={logIn}>
                            <p>Пожалуйста, войдите в аккаунт</p>

                            <div className="form-outline mb-4">
                              <input
                              autocomplete="on"
                                name="email"
                                type="email"
                                id="form2Example11"
                                className="form-control"
                                placeholder="email address"
                              />
                              <label
                                className="form-label"
                                for="form2Example11"
                              >
                                Имя пользователя
                              </label>
                            </div>

                            <div className="form-outline mb-4">
                              <input
                              autocomplete="on"
                                name="password"
                                type="password"
                                id="form2Example22"
                                className="form-control"
                              />
                              <label
                                className="form-label"
                                for="form2Example22"
                              >
                                Password
                              </label>
                            </div>

                            <div className="text-center pt-1 mb-5 pb-1">
                              <button
                              
                                className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                                type="submit"
                              >
                                Войти
                              </button>
                              
                            </div>

                            <div className="d-flex align-items-center justify-content-center pb-4">
                              <p className="mb-0 me-2">
                                Нет учетной записи?
                              </p>
                              <Link
                                to='/registration'
                                className="btn btn-outline-danger"
                              >
                                Создать 
                              </Link>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                        <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                          <h4 className="mb-4">
                          Цони-Мацони-ресторан современной грузинской кухни,
                          открывающий новый взгляд на традиционные кавказские блюда.
                          </h4>
                          <p className="small mb-0">Переступая порог нашего грузинского дома, вы попадаете
                           в колоритную атмосферу, где каждая деталь продумана и сделана 
                           с душой: здесь кружевные балконы Тбилиси, грузинский алфавит над открытой кухней, старинная посуда, репродукция картины Пиросмани «Кутеж у Гвимрадзе».
                          </p>
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
export default LogIn;
