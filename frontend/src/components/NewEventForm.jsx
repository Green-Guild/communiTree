import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../adapters/event-adapter';
import { UploadButton } from '../uploadthing';


const NewEventForm = ({ ownerId, onEventCreated}) => {
  const [showForm, setShowForm] = useState(false);
  const [image, setImage] = useState(
    'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg'
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
        className="absolute top-0 right-0 m-6 p-3 py-1 bg-bright-orange text-white border-dotted rounded-md button-bulge"
        onClick={toggleForm}
      >
        +
      </button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required 
              />
            </label>
          </div>
          <div>
            <label>Zipcode:
                <input 
                  type="text"
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                  required
                />
              </label>
          </div>
          <div>
          <label>Address:
                <input 
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </label>
          </div>
          <div>
          <label>Description:
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </label>
          </div>
          <div>
            <label htmlFor="image">
              <UploadButton
                className="ut-button:rounded-md ut-button:border-4 ut-button:border-yellow ut-button:w-32 ut-button:h-20 ut-button:shadow-md ut-allowed-content:h-0"
                endpoint="imageUploader"
                skipPolling
                onClientUploadComplete={(files) => {
                  setTimeout(() => {
                    setImage(files[0].url);
                  }, 1000);
                }}
                onUploadError={(error) => {
                  console.error(error, error.cause);
                  alert('Upload failed');
                }}
                content={{
                  button({ ready }) {
                    return ready ? (
                      <img src={image} alt="Profile picture" />
                    ) : (
                      <p className="text-black">Uploading...</p>
                    );
                  },
                  allowedContent() {
                    return <div></div>;
                  },
                }}
              />
            </label>
          </div>
          <div>
          <label>Date and Time:
              <input 
                type="datetime-local"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required 
              />
            </label>
          </div>
          <button type="submit">Submit</button>
          {message && <p className="success-message">{message}</p>}
        </form>
      )}
    </>
  );
};
export default NewEventForm;
