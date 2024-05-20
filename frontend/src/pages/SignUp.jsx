import { useContext, useEffect, useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import CurrentUserContext from '../contexts/current-user-context';
import { createUser } from '../adapters/user-adapter';
import { localLogin, googleLogin } from '../adapters/auth-adapter';
import { UploadButton } from '../uploadthing';

export default function SignUpPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [errorText, setErrorText] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png'
  );
  const [display, setDisplay] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png'
  );
  const [zipcode, setZipcode] = useState('');
  const [name, setName] = useState('');

  if (currentUser) return <Navigate to="/community" />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText('');
    if (!username || !password)
      return setErrorText('Missing username or password');

    if (!zipcode || !name) return setErrorText('Missing zipcode or name');

    const user = await createUser({
      username,
      password,
      zipcode,
      image,
      display_name: name,
    });

    await localLogin({ username, password });
    setCurrentUser(user);
    navigate('/community');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') setUsername(value);
    if (name === 'password') setPassword(value);
    if (name === 'zipcode') setZipcode(value);
    if (name === 'name') setName(value);
  };

  return (
    <>
      <div className="bg-yellow rounded-t-2xl flex flex-col items-center mx-10 mt-5 py-10 h-full px-40 shadow-sm border-none">
        {/* <h1>Sign Up</h1> */}
        <div
          id="form-cont"
          className=" rounded-xl flex w-fit bg-white shadow-md border-none relative h-[26.5rem] overflow-hidden"
        >
          <img
            src="https://i.ibb.co/BsnYK8y/rafibarides2-cute-community-gardening-monochome-orange-yellow-s-bdb53699-7073-4eff-bd9c-4885a0913fc0.png"
            alt="welcome-image"
            className="relative inset-0 object-cover object-left w-full h-full max-w-[50%] rounded-tr-2xl"
          />

          <form
            onSubmit={handleSubmit}
            onChange={handleChange}
            aria-labelledby="create-heading"
            className="border-none font-semibold text-sm"
          >
            <h2 id="create-heading" className="text-center text-bright-orange">
              Sign Up
            </h2>

            {/* TODO: make pfp auto update on file upload */}
            {/* <img src={image} alt="HI" className="h-4 w-4" /> */}
            <UploadButton
              className="ut-button:rounded-full ut-button:h-12 ut-button:w-12"
              endpoint="imageUploader"
              skipPolling
              onClientUploadComplete={async (files) => {
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
              }
            }
            />

            <label htmlFor="name">Name</label>
            <input
              className="rounded-lg text-black font-normal p-1"
              autoComplete="off"
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              value={name}
            />

            <label htmlFor="username">Username</label>
            <input
              className="rounded-lg text-black font-normal p-1"
              autoComplete="off"
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
              value={username}
            />

            <label htmlFor="password">Password</label>
            <input
              className="rounded-lg text-black font-normal p-1"
              autoComplete="off"
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={password}
            />

            <label htmlFor="zipcode">Zipcode</label>
            <input
              className="rounded-lg text-black font-normal p-1"
              autoComplete="off"
              type="text"
              id="zipcode"
              name="zipcode"
              onChange={handleChange}
              value={zipcode}
            />

            <button className="text-white bg-bright-orange hover:text-bright-orange hover:bg-white hover:shadow-md shadow-inner hover:shadow-inner-white font-medium rounded-full px-2.5 py-0.5">
              Sign Up Now!
            </button>
          </form>
        </div>

        {!!errorText && <p>{errorText}</p>}

        <p className="mt-4 text-white">
          Already have an account with us?{' '}
          <Link to="/login" className="text-bright-orange hover:text-white">
            Log in!
          </Link>
        </p>

        {/* Google */}
        <button onClick={googleLogin}>
          <img
            src="https://static.vecteezy.com/system/resources/previews/022/613/027/non_2x/google-icon-logo-symbol-free-png.png"
            alt="Google Logo"
            style={{ width: '30px', height: '30px' }}
          />
        </button>
      </div>
    </>
  );
}
