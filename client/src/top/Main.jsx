import React from "react";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div className="App">
      <h4>Welcome</h4>
      <Link to="login">ログイン</Link>
      <br />
      <Link to="regist">新規作成</Link>
    </div>
  );
};

export default Main;
