import React from "react";
import { Link } from "react-router-dom";

const GardenCard = ({ garden }) => {
  const { id, name, image, address } = garden;

  return (
    <div>
      <main className="bg-white dark:bg-black rounded-2xl m-6 flex shadow-sm hover:scale-105 hover:shadow-sm hover:shadow-light-yellow transition duration-300 ease-in-out">
        <div>
          <img
            src={image}
            className="left-0 h-28 w-40 object-cover rounded-l-xl"
            alt={`${name} Garden`}
          />
        </div>
        {/* skew-x-6 */}

        <div className="bg-white dark:bg-black -skew-x-6 -ml-4 rounded-r-2xl p-6 border-l-8 border-yellow ">
          <div className="skew-x-[6deg]">
            <Link to={`/gardens/${id}`}>
              <h1 className="font-extrabold dark:text-white text-bright-orange text-2xl">
                {name}
              </h1>
            </Link>
            <p className="font-normal text-yellow text-sm">{address}</p>
          </div>
        </div>
      </main>
    </div>
  );
};
export default GardenCard;
