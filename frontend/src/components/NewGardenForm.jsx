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