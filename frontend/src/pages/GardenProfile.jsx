// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { getGarden } from '../adapters/garden-adapter';

// const GardenProfile = () => {
//   const { id } = useParams();
//   const [garden, setGarden] = useState({});

//   useEffect(() => {
//     const fetchGarden = async () => {
//       try {
//         const data = await getGarden(id);
//         setGarden(data);
//       } catch (error) {
//         console.error('Error fetching garden:', error);
//       }
//     };

//     fetchGarden();
//   }, []);

//   const { name, image, description, location } = garden;

//   return <>
//    <main>
//     <div>
//       <h1>{name}</h1>
//     </div>
//     <div>
//       <img src={image} alt ={name} ></img>
//     </div>
//     <div>
//       <h2>About</h2>
//       <p>{description}</p>
//     </div>

//     <div>
//       <p>{location}</p>
//     </div>
//   </main>
//   </>

// };
// export default GardenProfile;

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getGarden } from "../adapters/garden-adapter";



const GardenProfile = () => {
  const { id } = useParams();
  const [garden, setGarden] = useState({});


  useEffect(() => {
    const fetchGarden = async () => {
      try {
        const data = await getGarden(id);
        setGarden(data);
      } catch (error) {
        console.error("Error fetching garden:", error);
      }
    };

    fetchGarden();
  }, [id]);

  const { name, image, description, address } = garden;

  return (
    <main className="bg-yellow h-screen p-16 flex items-center justify-center align-middle">

      <div className="bg-white dark:bg-black min-w-fit w-[40vw] flex rounded-xl h-96 shadow-md hover:scale-10 transition duration-300 ease-in-out">
        <img src={image} alt={name} className=" h-full w-[50%] rounded-l-xl object-cover" />

        <div className="flex-col p-6">
          <div className=" mb-4">
            <h1 className="text-bright-orange dark:text-white font-ubuntu font-bold text-3xl">{name}</h1>
            <p className="text-yellow font-ubuntu ubuntu-light-italic">{address}</p>
          </div>
          <div className="text-yellow">
            {/* <h2 className="text-yellow text-xl font-semibold">About</h2> */}
            <p className="dark:text-white text-black">{description}</p>
          </div>
        </div>
      </div>

    </main>
  );
};

export default GardenProfile;
