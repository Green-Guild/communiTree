import { useState } from "react";
import { createEvent } from "../adapters/event-adapter";

const NewEventForm = () => {
  const [showForm, setShowForm] = useState(false);

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
                Image URL:
                <input type="url" required />
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
