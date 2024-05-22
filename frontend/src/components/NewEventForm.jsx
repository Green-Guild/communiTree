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
        <div className="bg-white p-8 mt-6 rounded-lg shadow-md">
          <form className="space-y-4 w-[50vw] border-0" onSubmit=
          {handleSubmit}>
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
              <label>Zipcode:
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
              <label>Address:
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
              <label className="block text-black font-semibold">
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
              <label className="block text-black font-semibold">
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
                className="w-[30%] bg-bright-orange text-white p-2 rounded-full font-medium button-bulge hover:bg-bright-orange transition duration-300"
              >
                Create Event
              </button>
              {message && <p className="success-message">{message}</p>}
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default NewEventForm;



// import React, { useState } from "react";
// import { motion, useMotionValue, useDragControls, AnimatePresence } from "framer-motion";
// import useMeasure from "react-use-measure";
// import { UploadButton } from "../uploadthing"; // Ensure this component path is correct

// const NewEventForm = () => {
//   const [open, setOpen] = useState(false);
//   const [image, setImage] = useState("https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg");

//   const toggleModal = () => setOpen(!open);

//   return (
//     <div className="fixed inset-0 flex items-center justify-center">
//       <button
//         className="absolute top-0 right-0 m-6 p-3 py-1 bg-bright-orange text-white border-dotted rounded-md button-bulge"
//         onClick={toggleModal}
//       >
//         {open ? "-" : "+"}
//       </button>

//       <AnimatePresence>
//         {open && (
//           <DragCloseDrawer open={open} setOpen={setOpen}>
//             <form className="bg-white p-8 rounded-lg shadow-md space-y-4">
//               <UploadButton
//                 className="rounded-md border-4 border-yellow w-32 h-20 shadow-md"
//                 endpoint="imageUploader"
//                 skipPolling
//                 onClientUploadComplete={(files) => {
//                   setTimeout(() => {
//                     setImage(files[0].url);
//                   }, 1000);
//                 }}
//                 onUploadError={(error) => {
//                   console.error(error, error.cause);
//                   alert("Upload failed");
//                 }}
//                 content={{
//                   button({ ready }) {
//                     return ready ? (
//                       <img
//                         src={image}
//                         alt="Upload"
//                         className="w-full h-full object-cover rounded-md"
//                       />
//                     ) : (
//                       <p className="text-black">Uploading...</p>
//                     );
//                   },
//                   allowedContent() {
//                     return <div></div>;
//                   },
//                 }}
//               />
//               {/* Other form fields */}
//             </form>
//           </DragCloseDrawer>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// const DragCloseDrawer = ({ open, setOpen, children }) => {
//   const [drawerRef, bounds] = useMeasure();
//   const y = useMotionValue(0);
//   const controls = useDragControls();

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <>
//       {open && (
//         <motion.div
//           className="fixed inset-0 z-50 bg-neutral-950/70"
//           onClick={handleClose}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//         >
//           <motion.div
//             id="drawer"
//             ref={drawerRef}
//             onClick={(e) => e.stopPropagation()}
//             initial={{ y: "100%" }}
//             animate={{ y: "0%" }}
//             transition={{ ease: "easeInOut" }}
//             className="absolute bottom-0 w-full rounded-t-3xl bg-neutral-900"
//             style={{ y }}
//             drag="y"
//             dragControls={controls}
//             onDragEnd={() => {
//               if (y.get() >= 100) {
//                 handleClose();
//               }
//             }}
//             dragConstraints={{ top: 0, bottom: 0 }}
//             dragElastic={{ top: 0, bottom: 0.5 }}
//           >
//             <div className="relative z-0 h-full overflow-y-scroll p-4 pt-12">
//               {children}
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </>
//   );
// };

// export default NewEventForm;






// const NewEventForm = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//       <button
//         className="absolute top-0 right-0 m-6 p-3 py-1 bg-bright-orange text-white border-dotted rounded-md button-bulge"
//         onClick={() => setIsOpen(true)}
//       >
//         {isOpen ? '-' : '+'}
//       </button>
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-auto cursor-pointer"
//             onClick={() => setIsOpen(false)}
//           >
//             <motion.div
//               initial={{ scale: 0, rotate: "12.5deg" }}
//               animate={{ scale: 1, rotate: "0deg" }}
//               exit={{ scale: 0, rotate: "0deg" }}
//               onClick={(e) => e.stopPropagation()}
//               className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
//             >
//               <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
//               <div className="relative z-10 p-8 bg-white text-black rounded-lg">
//                 <form className="space-y-4 w-full">
//                   <div>
//                     <label className="block font-semibold">
//                       Event Title
//                       <input type="text" className="mt-1 p-1 w-full rounded-md focus:border-bright-orange focus:ring focus:ring-bright-orange focus:ring-opacity-50" required />
//                     </label>
//                   </div>
//                   <div>
//                     <label className="block font-semibold">
//                       Location
//                       <input type="text" className="mt-1 p-1 w-full rounded-md focus:border-bright-orange focus:ring focus:ring-bright-orange focus:ring-opacity-50" required />
//                     </label>
//                   </div>
//                   <div>
//                     <label className="block font-semibold">
//                       Description
//                       <textarea className="mt-1 p-1 w-full rounded-md focus:border-bright-orange focus:ring focus:ring-bright-orange focus:ring-opacity-50" required></textarea>
//                     </label>
//                   </div>
//                   <div>
//                     <label className="block font-semibold">
//                       Date and Time
//                       <input type="datetime-local" className="mt-1 p-1 w-full rounded-md focus:border-bright-orange focus:ring focus:ring-bright-orange focus:ring-opacity-50" required />
//                     </label>
//                   </div>
//                   <div className='flex justify-end'>
//                     <button type="submit" className="bg-bright-orange text-white p-2 rounded-full shadow hover:bg-bright-orange transition duration-300">Create Event</button>
//                   </div>
//                 </form>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default NewEventForm;
