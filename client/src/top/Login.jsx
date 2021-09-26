import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState("");
  const { handleSubmit, register } = useForm();
  const history = useHistory();

  useEffect(() => {
    const loginCheck = () => {
      axios.get("/login").then((res) => {
        if (res.data === "OK") {
          history.push("/chat");
        }
      });
    };
    loginCheck();
  }, []);

  const submitLogin = (data) => {
    axios
      .post("/login", {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        if (res.data === "NG") {
          setError("一致するユーザーがいません");
        } else {
          history.push("/chat");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <h1>ログインフォーム</h1>
      <form onSubmit={handleSubmit(submitLogin)}>
        <label htmlFor="email">メールアドレス</label>
        <input type="email" id="email" {...register("email")} />
        <label htmlFor="password">パスワード</label>
        <input type="password" id="password" {...register("password")} />
        <input type="submit" value="送信" />
        <br />
        <span>{error}</span>
      </form>
    </div>
  );
};

export default Login;
