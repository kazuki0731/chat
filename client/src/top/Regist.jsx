import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";

const Regist = () => {
  const { handleSubmit, register, reset } = useForm();
  const [registData, setRegistData] = useState([]);
  const [message, setMessage] = useState("");
  const submitRegist = async (data) => {
    if (data.name === "" || data.email === "") return;

    const res = await axios.put("/login/regist", {
      name: data.name,
      email: data.email,
      password: data.password,
    });

    switch (res.data) {
      case "OK":
        setMessage("登録できました！");
        setRegistData([{ name: data.name, email: data.email }]);
        reset();
        break;
      case 22001:
        setMessage("お名前、パスワードは12文字以内にしてください");
        break;
      case 23505:
        setMessage("お名前かメールアドレスが重複してます");
        break;
      default:
        setMessage("エラーが発生しました");
        break;
    }
  };

  return (
    <div>
      <h1>登録フォーム</h1>
      <form onSubmit={handleSubmit(submitRegist)}>
        <label htmlFor="email">お名前</label>
        <input type="text" id="name" {...register("name")} />
        <br />
        <label htmlFor="email">メールアドレス</label>
        <input type="email" id="email" {...register("email")} />
        <br />
        <label htmlFor="password">パスワード</label>
        <input type="password" id="password" {...register("password")} />
        <br />
        <input type="submit" value="送信" />
      </form>
      <Link to="/">戻る</Link>
      <br />
      <span>{message}</span>
      <ul>
        {registData.map((data, index) => (
          <li key={index}>
            お名前: <span>{data.name}</span>
            <br />
            メールアドレス: <span>{data.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Regist;
