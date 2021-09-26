import React from "react";
import { Link } from "react-router-dom";


const Illegal = () => {
  return (
    <div>
      <h3>不正なログインです</h3>
      <Link to="/">
        <span style={{ fontSize: "16px" }}>トップへ</span>
      </Link>
    </div>
  );
};

export default Illegal;
