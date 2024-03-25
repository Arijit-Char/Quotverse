import React, { useState, useEffect, useRef } from "react";
import "./App.scss";
import Account from "./components/Account/Account";
import { useDispatch, useSelector } from "react-redux";
import { getQuote, getTrending } from "./action/Quote";
import Quote from "./components/Quote/Quote";
import "./components/Header/Header.scss";
import { FaHome } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

function App() {
  const likedArray = useSelector((state) => state.likes.likedarray);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [home, setHome] = useState(true);
  const [newLikedArray, setnewLikedArray] = useState([]);
  const [homeLoading, setHomeLoading] = useState(true);
  const [comments, setComments] = useState({});

  const quoteSectionRef = useRef(null);

  useEffect(() => {
    dispatch(getQuote(page));
  }, [dispatch, page]);
  useEffect(() => {
    dispatch(getTrending());
  }, [dispatch]);

  const user = useSelector((state) => state.quote.quote);

  useEffect(() => {
    if (user && quotes) {
      const uniqueUser = user.filter(
        (item) => !quotes.some((quote) => quote._id === item._id)
      );

      if (uniqueUser.length > 0) {
        setQuotes((prevQuotes) => [...prevQuotes, ...uniqueUser]);
      }
    }
  }, [user, quotes, page]);

  useEffect(() => {
    if (likedArray && quotes.length > 0) {
      const modArray = quotes.filter((quote) => likedArray.includes(quote._id));
      const uniqueLikedQuotes = Array.from(new Set(modArray));
      setnewLikedArray(uniqueLikedQuotes);
    }
  }, [likedArray, quotes]);

  if (!user) {
    return <div>Loading...</div>;
  }

  if (quoteSectionRef.current) {
    quoteSectionRef.current.addEventListener("scroll", () => {
      const { scrollTop, scrollHeight, clientHeight } = quoteSectionRef.current;
      if (clientHeight + scrollTop + 100 >= scrollHeight) {
        if (!homeLoading) {
          return;
        } else {
          setTimeout(() => {
            setPage(page + 1);
            setLoading(false);
          }, 500);
        }
      }
    });
  }

  if (!quotes.length) {
    return <div>Loading...</div>;
  }
  if (!likedArray) {
    return <div>Loading...</div>;
  }

  const handleCommentChange = (quoteId, event) => {
    const { value } = event.target;
    setComments((prevComments) => ({
      ...prevComments,
      [quoteId]: value,
    }));
  };

  const addComment = (quoteId) => {
    const commentText = comments[quoteId];
    if (commentText.trim() !== "") {
      setComments((prevComments) => ({
        ...prevComments,
        [quoteId]: "",
      }));
      setQuotes((prevQuotes) =>
        prevQuotes.map((quote) =>
          quote._id === quoteId
            ? { ...quote, comments: [...(quote.comments || []), commentText] }
            : quote
        )
      );
    }
  };

  return (
    <div className="App">
      <div className="heading">
        <div className="header">
          <div className="title">title</div>
          <div className="homelike">
            <button
              style={{ color: home ? "Green" : "inherit" }}
              onClick={() => {
                setHome(true);
                setHomeLoading(true);
              }}
            >
              <FaHome />
            </button>
            <button
              style={{ color: !home ? "red" : "inherit" }}
              onClick={() => {
                setHome(false);
                setHomeLoading(false);
              }}
            >
              <FaHeart />
            </button>
          </div>
          <div className="extra">extra</div>
        </div>
      </div>
      <div className="homecontent">
        <div className="account-section home">
          <Account />
        </div>
        <div className="quote-section home" ref={quoteSectionRef}>
          {home
            ? quotes.map((quote) => (
              <Quote
                key={quote._id}
                id={quote._id}
                author={quote.author}
                quote={quote.content}
                tag={quote.tags[0]}
                comments={quote.comments || []}
                onCommentChange={handleCommentChange}
                onAddComment={addComment}
              />
            ))
            : newLikedArray.map((quote) => (
              <Quote
                key={quote._id}
                id={quote._id}
                author={quote.author}
                quote={quote.content}
                tag={quote.tags[0]}
                comments={quote.comments || []}

              />
            ))}
          {loading && <div>Loading...</div>}
        </div>
        <div className="trending-section home">trending</div>
      </div>
    </div>
  );
}

export default App;
