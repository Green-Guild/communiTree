import React from "react";
import { Link } from "react-router-dom";

const EventsCard = ({ event }) => {
  const { id, title, image, event_date, address } = event;

  return (
    <>
      <main className="flex flex-col w-60 h-60 min-w-50 min-h-50 rounded-xl shadow-sm bg-white hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out">
        <Link to={`/events/${id}`} className="flex flex-col items-center mb-3">
          <div className="w-[100%]">
            <img
              src={image}
              alt={`${title} Event`}
              className="object-cover h-28 w-full rounded-t-xl"
            />
          </div>

          <div className="p-4 text-wrap text-center flex flex-col items-center">
            <h1 className="text-xl  text-bright-orange font-semibold">
              {title}
            </h1>
            <p className="text-sm  text-yellow font-thin ubuntu-light-italic">
              {address}
            </p>
          </div>
        </Link>
      </main>
    </>
  );
};
export default EventsCard;
