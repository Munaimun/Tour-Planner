/* eslint-disable react/prop-types */
import Card from "./Card";
const Tours = ({ tours, removeTour }) => {
  return (
    <div className="container">
      <div className="header">
        <div className="title">
          <h1>ViewFinder</h1>
        </div>
      </div>
      <div className="cards">
        {/* returning card for every tours */}
        {tours.map((tour) => {
          return <Card key={tour.id} {...tour} removeTour={removeTour} />;
        })}
      </div>
    </div>
  );
};

export default Tours;
