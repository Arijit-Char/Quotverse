import React, { useState, useEffect, useRef } from "react";
import "./App.scss";
import Account from "./components/Account/Account";
import { useDispatch, useSelector } from "react-redux";
import { getQuote } from "./action/Quote";
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

  const quoteSectionRef = useRef(null);
  useEffect(() => {
    if (!home && quoteSectionRef.current) {
      quoteSectionRef.current.scrollTop = 0;
    }
  }, [home]);
  useEffect(() => {
    dispatch(getQuote(page));
  }, [dispatch, page]);

  const user = useSelector((state) => state.quote.quote);

  useEffect(() => {
    if (user) {
      const uniqueUser = user.filter(
        (item) => !quotes.some((quote) => quote._id === item._id)
      );

      setQuotes((prevQuotes) => [...prevQuotes, ...uniqueUser]);
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
          }, 1000);
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
            ? quotes.map((quote, index) => (
                <Quote
                  key={index}
                  id={quote._id}
                  author={quote.author}
                  quote={quote.content}
                  tag={quote.tags[0]}
                />
              ))
            : newLikedArray.map((quote, index) => (
                <Quote
                  key={index}
                  id={quote._id}
                  author={quote.author}
                  quote={quote.content}
                  tag={quote.tags[0]}
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
