import React from "react";
import "./Account.scss";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";

export default function Account() {
  const likedArray = useSelector((state) => state.likes.likedarray);
  if (!likedArray) {
    return <div>Loading...</div>;
  }
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
      <div className="totallikes">Total Likes: {likedArray.length}</div>
    </div>
  );
}
