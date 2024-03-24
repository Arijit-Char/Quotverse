import React from "react";
import { CgProfile } from "react-icons/cg";
import { FaRegHeart  } from "react-icons/fa";
import { TbShare3 } from "react-icons/tb";
import { FaRegComment } from "react-icons/fa";

import "./Quote.scss";
export default function Quote({author,quote,tag}) {
  return (
    <div className="quote">
      <div className="pic">
        <CgProfile className="pp" />
      </div>
      <div className="content">
        <div className="author">{author}</div>
        <div className="quotes">{quote}</div>
        <div className="tag">{tag}</div>
        <div className="lss">
          <button><FaRegHeart /></button>
          <button><TbShare3 /></button>
          <button><FaRegComment /></button>
        </div>
      </div>
    </div>
  );
}
