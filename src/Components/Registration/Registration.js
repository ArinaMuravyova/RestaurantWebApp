import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";

const Registration = ({ user, setUser }) => {
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();

  const registration = async (formValues) => {
    console.log("Success:", formValues)

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formValues.username,
        password: formValues.password,
        passwordConfirm:formValues.password,
        rememberme: formValues.remember,
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
            typeof data !== "undefined" &&
            typeof data.userName !== "undefined"
          ) {
            setUser({
              isAuthenticated: false,
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
        <h3>Пользователь {user.userName} успешно зарегестрирован в системе</h3>
      ) : (
        <>
        <h3>Регистрация</h3>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={registration}
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
            label="Password"
            name="passwordConfirm"
            rules={[
              { required: true, message: "Пожалуйста введите ваш пароль еще раз!" },
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
    </>
  );
};
export default Registration;
