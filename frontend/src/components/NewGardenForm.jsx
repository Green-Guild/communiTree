import { useState } from "react";
import { createGarden } from "../adapters/garden-adapter";
import { UploadButton } from "../uploadthing";
import { Checkbox, Typography } from "@material-tailwind/react";

const NewGardenForm = ({ ownerId }) => {
  const [showForm, setShowForm] = useState(false);
  const [image, setImage] = useState(
    "https://t4.ftcdn.net/jpg/05/65/22/41/360_F_565224180_QNRiRQkf9Fw0dKRoZGwUknmmfk51SuSS.jpg"
  );

  const toggleForm = () => {
    setShowForm((prevState) => !prevState);
  };
  return (
    <>
      <div className="relative">
        <button
          className="absolute top-0 right-0 p-3 py-1 bg-bright-orange text-white border-dotted rounded-md button-bulge"
          onClick={toggleForm}
        >
          {showForm ? "-" : "+"}
        </button>
      </div>
      {showForm && (
        <div className="flex justify-center items-center w-full">
          <div className="bg-white w-[50vw] p-8 mt-6 rounded-lg shadow-md">
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
            <form className="space-y-3 w-[45vw] border-0">
              <div>
                <label className="block text-black font-semibold">
                  Garden Name
                  <input
                    type="text"
                    className="mt-1 p-1 w-full rounded-md focus:border-bright-orange focus:ring focus:ring-bright-orange focus:ring-opacity-50"
                    required
                  />
                </label>
              </div>
              <div>
                <label className="block text-black font-semibold">
                  Location
                  <input
                    type="text"
                    className="mt-1 p-1 w-full rounded-md focus:border-bright-orange focus:ring focus:ring-bright-orange focus:ring-opacity-50"
                    required
                  />
                </label>
              </div>
              <div>
                <label className="block text-black font-semibold">
                  Description
                  <textarea
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
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

//   return (
//     <>
//       <div className="relative">
//         <button
//           className="absolute top-0 right-0 p-3 py-1 bg-bright-orange text-white border-dotted rounded-md button-bulge"
//           onClick={toggleForm}
//         >
//           {showForm ? "-" : "+"}
//         </button>
//       </div>
//       {showForm && (
//         <div className="flex justify-center items-center w-full">
//           <div className="bg-white w-[50vw] p-8 mt-6 rounded-lg shadow-md">
//             <UploadButton
//               className="ut-button:rounded-md ut-button:border-4 ut-button:border-yellow ut-button:w-32 ut-button:h-20 ut-button:shadow-md ut-allowed-content:h-0"
//               endpoint="imageUploader"
//               skipPolling
//               onClientUploadComplete={(files) => {
//                 setTimeout(() => {
//                   setImage(files[0].url);
//                 }, 1000);
//               }}
//               onUploadError={(error) => {
//                 console.error(error, error.cause);
//                 alert("Upload failed");
//               }}
//               content={{
//                 button({ ready }) {
//                   return ready ? (
//                     <img
//                       src={image}
//                       alt="Upload"
//                       className="w-full h-full object-cover rounded-md"
//                     />
//                   ) : (
//                     <p className="text-black">Uploading...</p>
//                   );
//                 },
//                 allowedContent() {
//                   return <div></div>;
//                 },
//               }}
//             />
//             <form className="space-y-3 w-[45vw] border-0">
//               <div>
//                 <label className="block text-black font-semibold">
//                   Garden Name
//                   <input
//                     type="text"
//                     className="mt-1 p-1  w-full rounded-md focus:border-bright-orange focus:ring focus:ring-bright-orange focus:ring-opacity-50"
//                     required
//                   />
//                 </label>
//               </div>
//               <div>
//                 <label className="block text-black font-semibold">
//                   Location
//                   <input
//                     type="text"
//                     className="mt-1 p-1 w-full rounded-md focus:border-bright-orange focus:ring focus:ring-bright-orange focus:ring-opacity-50"
//                     required
//                   />
//                 </label>
//               </div>
//               <div>
//                 <label className="block text-black font-semibold">
//                   Description
//                   <textarea
//                     className="mt-1 p-1 w-full rounded-md focus:border-bright-orange focus:ring focus:ring-bright-orange focus:ring-opacity-50"
//                     required
//                   ></textarea>
//                 </label>
//               </div>
//               <div className="flex flex-col ">
//                 <label className="flex items-center text-black font-normal space-x-2">
//                   <input type="checkbox" required />
//                   <span>This garden is public</span>
//                 </label>
//                 <label className="flex items-center text-black font-normal space-x-2">
//                   <input type="checkbox" required />
//                   <span>I agree to the terms and conditions</span>
//                 </label>
//               </div>

//               <div className="w-full flex items-center justify-end">
//                 <button
//                   type="submit"
//                   className="w-36 bg-bright-orange text-white p-2 rounded-full shadow hover:bg-bright-orange transition duration-300"
//                 >
//                   Create Garden
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

export default NewGardenForm;

//   return (
//     <>
//       <div className="relative">
//         <button
//           className="absolute top-0 right-0 p-3 py-1 bg-bright-orange text-white border-dotted rounded-md button-bulge"
//           onClick={toggleForm}
//         >
//           +
//         </button>
//         {showForm && (
//           <form>
//             <div>
//               <label>
//                 Name:
//                 <input type="text" required />
//               </label>
//             </div>
//             <div>
//               <label>
//                 Location (Zipcode):
//                 <input type="text" required />
//               </label>
//             </div>
//             <div>
//               <label>
//                 Description:
//                 <textarea required></textarea>
//               </label>
//             </div>
//             <div>
//               <label htmlFor="image">
//                 <UploadButton
//                   className="ut-button:rounded-md ut-button:border-4 ut-button:border-yellow ut-button:w-32 ut-button:h-20 ut-button:shadow-md ut-allowed-content:h-0"
//                   endpoint="imageUploader"
//                   skipPolling
//                   onClientUploadComplete={(files) => {
//                     setTimeout(() => {
//                       setImage(files[0].url);
//                     }, 1000);
//                   }}
//                   onUploadError={(error) => {
//                     console.error(error, error.cause);
//                     alert('Upload failed');
//                   }}
//                   content={{
//                     button({ ready }) {
//                       return ready ? (
//                         <img src={image} alt="Profile picture" />
//                       ) : (
//                         <p className="text-black">Uploading...</p>
//                       );
//                     },
//                     allowedContent() {
//                       return <div></div>;
//                     },
//                   }}
//                 />
//               </label>
//             </div>
//             <div>
//               <label htmlFor="is_public">
//                 Public:
//                 <input type="checkbox" required />
//               </label>
//             </div>
//             <button type="submit">Submit</button>
//           </form>
//         )}
//       </div>
//     </>
//   );
// };

// export default NewGardenForm;
