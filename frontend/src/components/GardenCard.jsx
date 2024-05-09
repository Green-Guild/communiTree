import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const GardenCard = () => {
  return <>
   <main>
    <div>
      <Link to={`/gardens/${id}`}>
      <h1>[name]</h1>
      </Link>
    </div>
    <div>
      <img src='https://images.ctfassets.net/5tpkas7gb5io/178TAzhuPPZvs3gv9lhvzg/d8ed331791d3991eff911747071da2dd/Motun_Marcy_Headshot_website.jpg?w=1920&q=75' ></img>
    </div>

    <div>
      <p>Address</p>
    </div>
  </main>
  </>

};
export default GardenCard;