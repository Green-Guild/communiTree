import { useState } from 'react';
import { createEvent } from '../adapters/event-adapter';

const NewEventForm = () => {

  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(prevState => !prevState);
  }
  return<>
   <div>
    <button onClick={toggleForm}>Create Event</button>
      {showForm && (
        <form>
          <div>
            <label>Title:
              <input 
                type="text"
                required
              />
            </label>
          </div>
          <div>
            <label>Location (Zipcode):
              <input 
                type="text"
                required
              />
            </label>
          </div>
          <div>
            <label>Description:
              <textarea
                required
              ></textarea>
            </label>
          </div>
          <div>
            <label htmlFor="image">Image URL:
              <input 
                type="url"
                required
              />
            </label>
          </div>
          <div>
            <label>Date and Time:
              <input 
                type='datetime'
                required
              />
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
      </div>
  </>
}
export default NewEventForm