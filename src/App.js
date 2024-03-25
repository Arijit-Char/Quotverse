import React, { useState, useEffect, useRef } from "react";
import "./App.scss";
import Account from "./components/Account/Account";
import Header from "./components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { getQuote } from "./action/Quote";
import Quote from "./components/Quote/Quote";

function App() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [quotes, setQuotes] = useState([]);

  const quoteSectionRef = useRef(null);

  useEffect(() => {
    dispatch(getQuote(page));
  }, [dispatch, page]);

  const user = useSelector((state) => state.quote.quote);

  useEffect(() => {
    if (user) {
      setQuotes((prevQuotes) => [...prevQuotes, ...user]);
    }
  }, [user, page]);
  if (!user) {
    return <div>Loading...</div>;
  }


  if (quoteSectionRef.current) {
    quoteSectionRef.current.addEventListener("scroll", () => {
      const { scrollTop, scrollHeight, clientHeight } = quoteSectionRef.current;
      if (clientHeight + scrollTop + 100 >= scrollHeight) {
        setLoading(true);

        setTimeout(() => {
          setPage(page + 1);
          setLoading(false);
        }, 1000);
      }
    });
  }



  if (!quotes.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <div className="heading">
        <Header />
      </div>
      <div className="homecontent">
        <div className="account-section home">
          <Account />
        </div>
        <div className="quote-section home" ref={quoteSectionRef}>
          {quotes.map((quote, index) => (
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
