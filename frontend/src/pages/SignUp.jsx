import { useContext, useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { createUser } from "../adapters/user-adapter";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [errorText, setErrorText] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');

  if (currentUser) return <Navigate to="/" />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText('');
    if (!username || !password) return setErrorText('Missing username or password');

    const [user, error] = await createUser({ username, password, location });
    if (error) return setErrorText(error.message);

    setCurrentUser(user);
    navigate('/');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') setUsername(value);
    if (name === 'password') setPassword(value);
    if (location === 'location') setLocation(value);
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} onChange={handleChange} aria-labelledby="create-heading">
        <h2 id="create-heading">Create New User</h2>
        <label htmlFor="username">Username</label>
        <input
          autoComplete="off"
          type="text"
          id="username"
          name="username"
          onChange={handleChange}
          value={username}
        />

        <label htmlFor="location">Location</label>
        <input
          autoComplete="off"
          type="text"
          id="location"
          name="location"
          onChange={handleChange}
          value={location}
        />

        <label htmlFor="password">Password</label>
        <input
          autoComplete="off"
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={password}
        />

        <button>Sign Up Now!</button>
      </form>
      {!!errorText && <p>{errorText}</p>}
      <p>Already have an account with us? <Link to="/login">Log in!</Link></p>

      {/* Add the Google button here */}
      <Link to="/">
        <button>
          <img
            src="https://steelbluemedia.com/wp-content/uploads/2019/06/new-google-favicon-512.png"
            alt="Google Logo"
            style={{ width: '20px', height: '20px', marginRight: '5px' }}
          />
          Google
        </button>
      </Link>
    </>
  );
}
