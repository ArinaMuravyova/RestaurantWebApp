import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LogOff = ({ setUser }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const showModal = () => {
    setOpen(true);
  };
  useEffect(() => {
    showModal();
  }, []);
  /* отправка данных на сервер о пользователе,кто выходит из системы */
  const logOff = async () => {
    const requestOptions = {
      method: "POST",
    };
    return await fetch("api/account/logoff", requestOptions).then(
      (response) => {
       if( response.status === 200){
          setUser({ isAuthenticated: false, userName: "" })
          navigate("/");
       }
        response.status === 401 && navigate("/login");
      }
    );
  };
  /* const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
    navigate("/");
  }; */
  return (
    <>
      <button type="button" className="btn btn-primary" onClick={()=>logOff()} style={{margin:"100px auto",display: "block"}}>
        Выйти
      </button>
    </>
  );
};
export default LogOff;
