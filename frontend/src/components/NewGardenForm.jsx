import { useState } from "react";
import { createGarden } from "../adapters/garden-adapter";
import { UploadButton } from "../uploadthing";
import { Checkbox, Typography } from "@material-tailwind/react";

const NewGardenForm = ({ ownerId, onGardenCreated }) => {
  const [showForm, setShowForm] = useState(false);
  const [image, setImage] = useState(
    "https://t4.ftcdn.net/jpg/05/65/22/41/360_F_565224180_QNRiRQkf9Fw0dKRoZGwUknmmfk51SuSS.jpg"
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
          className="absolute dark:bg-yellow top-0 right-0 p-3 py-1 bg-bright-orange text-white border-dotted rounded-md button-bulge"
          onClick={toggleForm}
        >
          {showForm ? "-" : "+"}
        </button>
      </div>
      {showForm && (
        <div className="flex m-6 justify-center items-center w-full">
          <div className="bg-white w-[50vw] p-8 mt-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit}
            className="space-y-3 w-[45vw] border-0">
              <div>
                <UploadButton
                className="ut-button:rounded-md ut-button:border-4 ut-button:border-yellow ut-button:w-24 ut-button:h-20  ut-allowed-content:h-0 button-bulge"
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
              <div>
                <label className="block text-black font-semibold">
                  Garden Name
                  <input
                    type="text"
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="mt-1 p-1 w-full rounded-md focus:border-bright-orange focus:ring focus:ring-bright-orange focus:ring-opacity-50"
                    required
                  />
                </label>
              </div>
              <div>
                <label className="block text-black font-semibold">
                  Address
                  <input 
                  type="text" 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)} 
                  className="mt-1 p-1 w-full rounded-md focus:border-bright-orange focus:ring focus:ring-bright-orange focus:ring-opacity-50"
                  required />
                </label>
          </div>
              <div>
                <label className="block text-black font-semibold">
                Zipcode
                  <input 
                  type="text" 
                  value={zipcode} 
                  onChange={(e) => setZipcode(e.target.value)}
                  className="mt-1 p-1 w-full rounded-md focus:border-bright-orange focus:ring focus:ring-bright-orange focus:ring-opacity-50"
                  required />
                </label>
              </div>
              <div>
                <label className="block text-black font-semibold">
                  Description
                  <textarea value={description} 
                  onChange={(e) => setDescription(e.target.value)}  
                  className="mt-1 p-1 w-full rounded-md focus:border-bright-orange focus:ring focus:ring-bright-orange focus:ring-opacity-50"
                  required
                  ></textarea>
                </label>
              </div>
              <div className="flex-col p-0">
                <Checkbox className=" p-0 m-0"
                  label={
                    <Typography className="p-0 inline-flex font-normal">
                      This garden is public
                    </Typography>
                  }
                />
                <Checkbox className="p-0 m-0"
                  label={
                    <Typography className=" p-0 inline-flex font-normal">
                      I agree with the
                      <Typography
                        as="a"
                        href="#"
                        color="yellow"
                        className="font-medium transition-colors hover:text-yellow"
                      >
                        &nbsp;terms and conditions
                      </Typography>
                    </Typography>
                  }
                />
              </div>

              <div className="w-full flex items-center justify-end">
                <button
                  type="submit"
                  className="w-36 font-medium bg-bright-orange text-white p-2 rounded-full button-bulge hover:bg-bright-orange transition duration-300"
                >
                  Create Garden
                </button>
                {message && <p className="success-message">{message}</p>}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default NewGardenForm;