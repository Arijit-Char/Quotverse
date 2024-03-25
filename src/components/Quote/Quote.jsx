import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaRegHeart, FaHeart, FaRegComment } from "react-icons/fa";
import { PiTelegramLogo } from "react-icons/pi";
import { useDispatch} from "react-redux";

import "./Quote.scss";
import { getLikes, getUnLikes } from "../../action/Quote";

export default function Quote({ id, author, quote, tag }) {
  const dispatch = useDispatch();

  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
    if (liked) {
      dispatch(getUnLikes(id));
    } else {
      dispatch(getLikes(id));
    }
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
            {liked ? (
              <FaHeart style={{ color: "red", fontSize: "1.2rem" }} />
            ) : (
              <FaRegHeart style={{ color: "white" }} />
            )}
          </button>
          <button>
            <FaRegComment style={{ color: "white" }} />
          </button>
          <button>
            <PiTelegramLogo style={{ color: "white" }} />
          </button>
        </div>
      </div>
    </div>
  );
}
