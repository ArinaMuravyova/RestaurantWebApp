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
  const logOff = async (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
    };
    return await fetch("api/account/logoff", requestOptions).then(
      (response) => {
        response.status === 200 &&
          setUser({ isAuthenticated: false, userName: "" });
        response.status === 401 && navigate("/login");
      }
    );
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
    navigate("/");
  };
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Выход
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">Вы уверены,что хотите выйти?</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={handleCancel}
              >
                Нет
              </button>
              <button type="button" className="btn btn-primary" onClick={logOff}>
                Да
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LogOff;
