import React, { useEffect, useState } from "react";

const Timer = ({ time, onEnd }) => {
  const [second, setSecond] = useState(time);
  let minutes = (second / 60) | 0;
  let sec = second % 60 | 0;
  useEffect(() => {
    let ID = null;
    if (second <= 0) {
      onEnd();
    }
    if (second > 0) {
      ID = setInterval(() => {
        if (second > 0) setSecond((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      clearInterval(ID);
    };
  }, [second]);

  //
  //
  return (
    <div>{`${String(minutes).padStart(2, "0")}:${String(sec).padStart(
      2,
      0
    )}`}</div>
  );
};

export default Timer;
