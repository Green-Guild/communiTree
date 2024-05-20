import { useState } from 'react';
import { createEvent } from '../adapters/event-adapter';
import { UploadButton } from '../uploadthing';

const NewEventForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [image, setImage] = useState(
    'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg'
  );

  const toggleForm = () => {
    setShowForm((prevState) => !prevState);
  };
  return (
    <>
      <button
        className="absolute top-0 right-0 m-6 p-3 py-1 bg-bright-orange text-white border-dotted rounded-md button-bulge"
        onClick={toggleForm}
      >
        +
      </button>
      {showForm && (
        <form>
          <div>
            <label>
              Title:
              <input type="text" required />
            </label>
          </div>
          <div>
            <label>
              Location (Zipcode):
              <input type="text" required />
            </label>
          </div>
          <div>
            <label>
              Description:
              <textarea required></textarea>
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
            <label>
              Date and Time:
              <input type="datetime" required />
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
    </>
  );
};
export default NewEventForm;
