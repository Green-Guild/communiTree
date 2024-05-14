import React from 'react';
import { Link } from 'react-router-dom';

const GardenCard = ({garden}) => {
  const { id, name, image, location } = garden;

  return <>
   <main>
      <div>
        <Link to={`/gardens/${id}`}>
        <h1>{name}</h1>
        </Link>
      </div>
      <div>
        <img src={image} alt={`${name} Garden`} />
      </div>

      <div>
        <p>Zipcode: {location}</p>
      </div>
    </main>
  </>

};
export default GardenCard;