import React, { useState, useEffect } from 'react';
import { cloneDeep } from 'lodash';
import './style.css';

export default function App() {
  const url = 'https://course-api.com/react-tours-project';

  const [data, setData] = useState();
  const [showMore, setShowMore] = useState(false);

  const fetchData = async () => {
    const response = await (await fetch(url)).json();
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
    setData([]);
  };
  const handleShowMore = (i) => {
    const tempData = cloneDeep(data);
    const newData = tempData.map((item, index) => {
      if (index === i) {
        if (item?.show === true) {
          return { ...item, show: false };
        } else {
          return { ...item, show: true };
        }
      } else {
        return item;
      }
    });
    setData(newData);
  };
  console.log(data?.length);

  return (
    <div>
      {data?.length === 0 && <button onClick={fetchData}>fetchData</button>}
      {data?.length > 0 && <button onClick={clearAll}>clear All</button>}
      {data?.length > 0 &&
        data.map((item, index) => {
          return (
            <div key={index}>
              <h4>{item.name}</h4>
              <p>{item.info.slice(0, 99)}</p>
              <button onClick={() => handleShowMore(index)}>
                {item.show ? 'show less' : 'show more'}
              </button>
              {item.show && <p>{item.info.slice(99, item.info.length)}</p>}
              <span>{item.price}</span>
              <button onClick={() => handleRemove(index)}>remove</button>
            </div>
          );
        })}
    </div>
  );
}
