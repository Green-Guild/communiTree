import { useState } from 'react';
import { createGarden } from '../adapters/garden-adapter';
import { UploadButton } from '../uploadthing';

const NewGardenForm = ({ ownerId, onGardenCreated }) => {
  const [showForm, setShowForm] = useState(false);
  const [image, setImage] = useState(
    'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg'
  );
  const [name, setName] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [address, setAddress] = useState('')
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');


  const toggleForm = () => {
    setShowForm((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newGarden = {
      name,
      zipcode,
      address, 
      description,
      image,
      is_public: true,
      owner_id: ownerId,
    };

    try {
      await createGarden(newGarden);
      setMessage('Garden created successfully');
      setName('');
      setZipcode('');
      setAddress('');
      setDescription('');
      setImage('https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg');
      setShowForm(false);
      onGardenCreated();
      setTimeout(() => {
        setMessage('');
        setShowForm(false);
      }, 4000);
    } catch (error) {
      console.error('Error creating garden:', error);
      setMessage('Failed to create garden');
      setTimeout(() => {
        setMessage('');
      }, 2000);
    }
  };

  return (
    <>
      <div className="relative">
        <button
          className="absolute top-0 right-0 p-3 py-1 bg-bright-orange text-white border-dotted rounded-md button-bulge"
          onClick={toggleForm}
        >
          +
        </button>
        {showForm && (
          <form onSubmit={handleSubmit}>
            <div>
            <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              </label>
            </div>
            <div>
              <label>
                Zipcode:
                <input type="text" value={zipcode} onChange={(e) => setZipcode(e.target.value)} required />
              </label>
            </div>
            <div>
              <label>
                Address:
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
              </label>
            </div>
            <div>
              <label>
                Description:
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
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
              <label htmlFor="is_public">
                Public:
                <input type="checkbox" required />
              </label>
            </div>
            <button type="submit">Submit</button>
            <p className={message.includes('successfully') ? 'success-message' : 'error-message'}>
                {message}
              </p>
          </form>
        )}
      </div>
    </>
  );
};

export default NewGardenForm;
