import React, { useState, useEffect } from 'react';
import { cloneDeep } from 'lodash';
import './style.css';

export default function App() {
  const url = 'https://course-api.com/react-tours-project';

  const [data, setData] = useState();
  const [showMore, setShowMore] = useState(false);

  const fetchData = async () => {
    const response = await (await fetch(url)).json();
    console.log(response);
    setData(response);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleRemove = (i) => {
    const tempData = cloneDeep(data);
    const newData = tempData.filter((item, index) => {
      return index !== i;
    });
    console.log(tempData, newData);
    setData(newData);
  };
  const clearAll = () => {
    setData({});
  };
  const handleShowMore = (i) => {
    const tempData = cloneDeep(data);
    const newData = tempData.map((item, index) => {
      if (index === i) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    });
    // setShowMore(!showMore);
  };

  return (
    <div>
      <button onClick={clearAll}>clear All</button>
      {data?.length > 0 &&
        data.map((item, index) => {
          return (
            <div key={index}>
              <h4>{item.name}</h4>
              <p>{item.info.slice(0, 99)}</p>
              <button onClick={() => handleShowMore(index)}>
                {showMore ? 'show less' : 'show more'}
              </button>
              {showMore && <p>{item.info.slice(99, item.info.length)}</p>}
              <span>{item.price}</span>
              <button onClick={() => handleRemove(index)}>remove</button>
            </div>
          );
        })}
    </div>
  );
}
