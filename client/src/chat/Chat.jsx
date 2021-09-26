import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";

const Chat = () => {
  const [loginName, setLoginName] = useState("");
  const [textData, setTextData] = useState([]);
  const { handleSubmit, register, reset } = useForm();
  const history = useHistory();

  const checkLogin = () => {
    axios.get("/chat/info").then((res) => {
      if (res.data === "NG") {
        history.push("./illegal");
      } else {
        setLoginName(res.data);
      }
    });
  };

  const getTexts = () => {
    axios
      .get("/chat/text")
      .then((res) => {
        setTextData(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    checkLogin();
    getTexts();
  }, []);

  const submitText = (data) => {
    if (data.text === "") return;
    axios.put("/chat/text", { text: data.text }).then((res) => {
      if (res.data === 23514) return;
      textData.unshift(res.data[0]);
      setTextData([...textData]);
      reset();
    });
  };

  const clickLogout = () => {
    axios.get("/chat/logout").then((res) => {
      if (res.data === "OK") {
        history.push("/");
      }
    });
  };

  return (
    <div>
      <div>
        <h3>
          こんにちは <span style={{ color: "red" }}>{loginName}</span> さん
        </h3>
        <button onClick={clickLogout}>ログアウト</button>
      </div>
      <form onSubmit={handleSubmit(submitText)}>
        <textarea
          rows="5"
          {...register("text")}
          placeholder="つぶやく"
        ></textarea>
        <input type="submit" value="送信" />
      </form>
      <ul>
        {textData.map((text, index) => (
          <li key={index}>
            <Link
              to={{
                pathname: "/users",
                search: `?name=${text.user_name}`,
                state: { id: text.user_id, name: text.user_name },
              }}
            >
              {text.user_name}
            </Link>
            <p>{text.text}</p>
            <span>{dayjs(text.created_at).format("MM/DD(ddd) HH:mm:ss")}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chat;
