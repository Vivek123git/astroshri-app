import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};

const InfinityScrollCom = () => {
  const [items, setitems] = useState(Array.from({ length: 10 }))

  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      setitems((items) => items.concat(Array.from({ length: 10 })));
    }, 1500);
  }

  return (
    <div>
      <h1>demo: react-infinite-scroll-component</h1>
      <hr />
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        {items.map((i, index) => (
          <div style={style} key={index}>
            div - #{index}
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default InfinityScrollCom;