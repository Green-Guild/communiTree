import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getGarden } from '../adapters/garden-adapter';

const GardenProfile = () => {
  const { id } = useParams();
  const [garden, setGarden] = useState(null);

  useEffect(() => {
    const fetchGarden = async () => {
      try {
        const data = await getGarden(id);
        setGarden(data);
      } catch (error) {
        console.error('Error fetching garden:', error);
      }
    };

    fetchGarden();
  }, [id]);

  const { name, image, description, location } = garden;

  return <>
   <main>
    <div>
      <h1>{name}</h1>
    </div>
    <div>
      <img src={image} alt ={name} ></img>
    </div>
    <div>
      <h2>About</h2>
      <p>{description}</p>
    </div>

    <div>
      <p>{location}</p>
    </div>
  </main>
  </>

};
export default GardenProfile;

