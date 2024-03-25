import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaRegHeart, FaHeart, FaRegComment  } from "react-icons/fa";
import { PiTelegramLogo } from "react-icons/pi";

import "./Quote.scss";

export default function Quote({ author, quote, tag }) {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

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
          <button onClick={toggleLike}>
            {liked ? <FaHeart style={{ color: "red" , fontSize:"1.2rem"}} /> : <FaRegHeart style={{ color: "white" }}/>}
          </button>
          <button>
            <FaRegComment style={{ color: "white" }}/>
          </button>
          <button>
            <PiTelegramLogo  style={{ color: "white" }}/>
          </button>
        </div>
      </div>
    </div>
  );
}
