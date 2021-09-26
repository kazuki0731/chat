import React from "react";
import { Switch, Route } from "react-router-dom";
import Main from "../top/Main";
import Regist from "../top/Regist";
import Login from "../top/Login";
import Chat from "../chat/Chat";
import Illegal from "../fault/Illegal";
import Users from "../chat/Users";

const Router = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/regist" component={Regist} />
        <Route path="/login" component={Login} />
        <Route path="/chat" component={Chat} />
        <Route path="/illegal" component={Illegal} />
        <Route path="/users" component={Users} />
      </Switch>
    </div>
  );
};

export default Router;
