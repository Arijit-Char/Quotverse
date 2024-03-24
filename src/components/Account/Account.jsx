import React from "react";
import "./Account.scss";
import { CgProfile } from "react-icons/cg";

export default function Account() {
  return (
    <div className="account">
      <div className="profilepic">
        <CgProfile className="pp" />
      </div>
      <div className="name-user">
        <div className="name">Arijit Char</div>
        <div className="username">@arijit_char</div>
      </div>
      <div className="title">Full Stack Developer</div>
      <div className="totallikes">100 Likes</div>
    </div>
  );
}
