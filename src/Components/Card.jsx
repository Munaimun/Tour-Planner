/* eslint-disable react/prop-types */
import { useState } from "react";

// all the props are form date file
const Card = ({ id, image, info, price, name, removeTour }) => {
  const [readmore, setReadmore] = useState(false);
  //info.substring(0, 200) === showing the first 200 char form the info
  const description = readmore ? info : `${info.substring(0, 200)}....`;

  //   setting the readmore value opposite on clicking
  function readmoreHandler() {
    setReadmore(!readmore);
  }

  return (
    <div className="card">
      <img src={image} className="image" />
      <div className="tour-info">
        <div className="tour-details">
          <h4 className="tour-price">$ {price}</h4>
          <h4 className="tour-name">{name}</h4>
        </div>
        <div className="description">
          {description}
          {/* if readmore is truo show less else show read more in the description*/}
          <span className="read-more" onClick={readmoreHandler}>
            {readmore ? "show less" : "read more"}
          </span>
        </div>
      </div>
      <button className="btn-red" onClick={() => removeTour(id)}>
        Not Interested
      </button>
    </div>
  );
};

export default Card;
