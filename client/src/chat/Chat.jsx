import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  likecount: {
    cursor: "pointer",
  },
  active: {
    color: "red",
  },
});

const Chat = () => {
  const [loginData, setLoginData] = useState({});
  const [textData, setTextData] = useState([]);
  const [likeData, setLikeData] = useState([]);
  const { handleSubmit, register, reset } = useForm();
  const history = useHistory();
  const classes = useStyles();

  const getInfo = async () => {
    const user = await axios.get("/chat/info").catch((e) => console.log(e));
    if (user.data === "NG") {
      history.push("./illegal");
      return;
    }
    setLoginData({ name: user.data.name, id: user.data.id });

    const like = await axios
      .get(`/chat/likeCount/${user.data.id}`)
      .catch((e) => console.log(e));
    setLikeData(like.data);

    const text = await axios.get("/chat/text").catch((e) => console.log(e));
    text.data.map((text) => {
      text.isLike = false;
      return text;
    });
    setTextData(text.data);
  };

  useEffect(() => {
    getInfo();
  }, []);

  const submitText = async (data) => {
    if (data.text === "") return;

    const res = await axios
      .post("/chat/text", { text: data.text })
      .catch((e) => console.log(e));
    if (res.data === 23514) return;
    textData.unshift(res.data[0]);
    setTextData([...textData]);
    reset();
  };

  const clickLogout = async () => {
    const res = await axios.get("/chat/logout").catch((e) => console.log(e));
    if (res.data === "OK") {
      history.push("/");
    }
  };

  const clickLikeCount = (id, index) => {
    const data = likeData.filter((like) => {
      return like.text_id === id;
    });
    if (data.length === 0) {
      axios
        .put("/chat/likeCount/increment", { textId: id, userId: loginData.id })
        .then((res) => {
          if (res.data !== "NG") {
            const newData = textData.map((data) => {
              if (data.id === id) {
                data.likecount++;
              }
              return data;
            });

            likeData.push(res.data);
            setLikeData([...likeData]);
            setTextData(newData);
          }
        });
    } else if (data.length === 1) {
      axios
        .put("/chat/likeCount/decrement", {
          textId: id,
          likeId: data[0].id,
        })
        .then((res) => {
          // console.log(res.data);
          if (res.data !== "NG") {
            const newTextData = textData.map((data) => {
              if (data.id === id) {
                data.likecount--;
              }
              return data;
            });

            const newLikeData = likeData.filter((like) => {
              return like.id !== res.data.id;
            });

            setLikeData(newLikeData);
            setTextData(newTextData);
          }
        });
    }
  };

  const check = () => {
    console.log(likeData);
    console.log(textData);
    console.log(loginData);
  };

  return (
    <div>
      <div>
        <h3>
          こんにちは <span style={{ color: "red" }}>{loginData.name}</span> さん
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
            <p>
              id:{text.id} {text.text}
            </p>
            <span
              className={
                classes.likecount + " " + (text.likecount > 0 && classes.active)
              }
              onClick={() => clickLikeCount(text.id, index)}
            >
              ♡{text.likecount}
            </span>
            <br />
            <span>{dayjs(text.created_at).format("MM/DD(ddd) HH:mm:ss")}</span>
          </li>
        ))}
      </ul>
      <button onClick={check}>確認</button>
    </div>
  );
};

export default Chat;
