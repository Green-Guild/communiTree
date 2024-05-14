import { useState } from 'react';
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
          <label>Date and Time:
              <input 
                type='datetime'
                required
              />
            </label>
          <div>
            <label>Public:
              <input 
                type="checkbox"
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

/*
import { useState } from 'react';
import { createGarden } from '../adapters/garden-adapter';

const NewGardenForm = ({ownerId}) => {

  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(prevState => !prevState);
  }
  

  return <>
  <div>
    <button onClick={toggleForm}>Start a Garden</button>
      {showForm && (
        <form>
          <div>
            <label>Name:
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
            <label htmlFor="is_public">Public:
              <input 
                type="checkbox"
                required
              />
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
      </div>
    </>
};

export default NewGardenForm;
*/
