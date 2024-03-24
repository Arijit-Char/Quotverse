import React from "react";
import "./Header.scss";
import { FaHome } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

export default function Header() {
  return (
    <div className="header">
      <div className="title">title</div>
      <div className="homelike">
        <button>
          <FaHome />
        </button>
        <button>
          <FaHeart />
        </button>
      </div>
      <div className="extra">extra</div>
    </div>
  );
}
