import React from "react";
import "./Trending.scss";
export default function Trending({ Tarray }) {
  const firstTenItems = Tarray.slice(0, 7);

  return (
    <div className="trending">
      <div className="theading">Top 7 Trending Topics</div>
      <div className="trendingIteams">
        {firstTenItems.map((item, index) => (
          <div className="Tdiv">
            <div key={index + Math.random()}>{index+1}.  {item.name}</div>
            <div key={index + Math.random()}>#{item.slug} </div>
            <div key={index + Math.random()}>{item.quoteCount} quotes</div>
          </div>
        ))}
      </div>
    </div>
  );
}
