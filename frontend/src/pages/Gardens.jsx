import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Gardens = () => {
  return <>
   <main>
    <div>
      <form>
        <input id="input-garden"
          type="text"
          name="garden"
          placeholder="Search Gardens"
          aria-label="Browse through Gardens"
        />
        <button aria-label="Browse through Gardens" id="submit-button" type="submit">Search</button>
        </form>
    </div>
    <div>
      <button>Start a Garden</button>
    </div>
    <div>
    {/* {gardens.map(garden => (
          <GardenCard key={garden.id} garden={garden} />
        ))} */}
    </div>
  </main>
  </>

};
export default Gardens;