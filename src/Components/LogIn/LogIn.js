import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input } from "antd";

const LogIn = ({ user, setUser }) => {
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();

  const logIn = async (formValues) => {
  console.log("Success:", formValues)

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        email: formValues.username,
        password: formValues.password,
        rememberme: formValues.remember,
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
      {user.isAuthenticated ? (
        <h3>Пользователь {user.userName} успешно вошел в систему</h3>
      ) : (
        <>
          <h3>Вход</h3>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={logIn}
            onFinishFailed={renderErrorMessage}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Пожалуйста введите ваше имя!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Пожалуйста введите ваш пароль!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox>Запомнить</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Войти
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
      ;
    </>
  );
};
export default LogIn;
