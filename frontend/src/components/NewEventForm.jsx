import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { createEvent } from "../adapters/event-adapter";
import { UploadButton } from "../uploadthing";
import { AnimatePresence, motion } from 'framer-motion';
import { FiAlertCircle } from 'react-icons/fi';


const NewEventForm = ({ ownerId, onEventCreated}) => {
  const [showForm, setShowForm] = useState(false);
  const [image, setImage] = useState(
    "https://t4.ftcdn.net/jpg/05/65/22/41/360_F_565224180_QNRiRQkf9Fw0dKRoZGwUknmmfk51SuSS.jpg"
  );
  const [title, setTitle] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const toggleForm = () => {
    setShowForm((prevState) => !prevState);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEvent = {
      title,
      zipcode,
      address,
      description,
      host_id: ownerId,
      event_date: eventDate,
      image,
    };

    try {
      const data = await createEvent(newEvent);
      setMessage('Event created successfully');
      setTimeout(() => {
        setMessage('');
        // navigate(`/events/${data.id}`);

      }, 2000);
      onEventCreated()
    } catch (error) {
      console.error('Error creating event:', error);
    }
  }


  return (
    <>
      <button
        className="absolute top-0 right-0 m-6 p-3 py-1 dark:bg-yellow bg-bright-orange text-white border-dotted rounded-md button-bulge"
        onClick={toggleForm}
      >
        {showForm ? "-" : "+"}
      </button>
      {showForm && (
        <div className="bg-white dark:bg-black dark:text-white p-8 mt-6 rounded-lg shadow-md">
          <form className="space-y-4 w-[50vw] border-0" onSubmit=
          {handleSubmit}>
            <div>
              <UploadButton
              className="ut-button:rounded-md ut-button:w-24 ut-button:h-20  ut-allowed-content:h-0 button-bulge"
              endpoint="imageUploader"
              skipPolling
              onClientUploadComplete={(files) => {
                setTimeout(() => {
                  setImage(files[0].url);
                }, 1000);
              }}
              onUploadError={(error) => {
                console.error(error, error.cause);
                alert("Upload failed");
              }}
              content={{
                button({ ready }) {
                  return ready ? (
                    <img
                      src={image}
                      alt="Upload"
                      className="w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    <p className="text-black">Uploading...</p>
                  );
                },
                allowedContent() {
                  return <div></div>;
                },
              }}
            />
          </div>
            <div className="dark:text-white">
              <label className="block dark:text-white text-black font-semibold">
                Event Title
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 p-1  w-full rounded-md  focus:border-bright-orange focus:ring focus:ring-bright-orange focus:ring-opacity-50"
                  required
                />
              </label>
            </div>
            <div>
              <label className="block dark:text-white text-black font-semibold">
                Address
                <input 
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1 p-1 w-full rounded-md  focus:border-bright-orange focus:ring focus:ring-bright-orange focus:ring-opacity-50"
                  required
                />
              </label>
            </div>
            <div>
              <label className="block dark:text-white text-black font-semibold" >
                Zipcode
                <input 
                  type="text"
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                  className="mt-1 p-1 w-full rounded-md  focus:border-bright-orange focus:ring focus:ring-bright-orange focus:ring-opacity-50"
                  required
                />
              </label>
            </div>
            <div>
              <label className="block dark:text-white text-black font-semibold">
                Description
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 p-1 w-full rounded-md  focus:border-bright-orange focus:ring focus:ring-bright-orange focus:ring-opacity-50"
                  required
                ></textarea>
              </label>
            </div>
            <div>
              <label className="block dark:text-white text-black font-semibold">
                Date and Time
                <input
                  type="datetime-local"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="mt-1 p-1 w-full rounded-md  focus:border-bright-orange focus:ring focus:ring-bright-orange focus:ring-opacity-50"
                  required
                />
              </label>
            </div>
            <div className="flex justify-center"></div>
            <div className="w-full flex items-center justify-end">
              <button
                type="submit"
                className="w-[30%] dark:bg-yellow bg-bright-orange text-white p-2 rounded-full font-medium button-bulge hover:bg-bright-orange transition duration-300"
              >
                Create Event
              </button>
              {/* {message && <p className="success-message">{message}</p>} */}
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default NewEventForm;