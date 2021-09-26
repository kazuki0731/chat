import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";

const Users = () => {
  const { state } = useLocation();
  const [textData, setTextData] = useState([]);

  useEffect(() => {
    axios.get(`/chat/users/${state.id}`).then((res) => {
      if (res === "NG") {
        throw Error;
      } else {
        setTextData(res.data);
      }
    });
  }, []);
  return (
    <div>
      <h2>
        <span style={{ color: "red" }}>{state.name}</span> さんのページ
      </h2>
      <ul>
        {textData.map((text, index) => (
          <li key={index}>
            <span>{text.user_name}</span>
            <p>{text.text}</p>
            <span>{dayjs(text.created_at).format("MM/DD(ddd) HH:mm:ss")}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
