// import { useContext, useState } from 'react';
// import { useNavigate, Navigate } from 'react-router-dom';
// import { googleLogin, localLogin } from '../adapters/auth-adapter';
// import CurrentUserContext from '../contexts/current-user-context';

// export default function LoginPage() {
//   const navigate = useNavigate();
//   const [errorText, setErrorText] = useState('');
//   const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setErrorText('');
//     const formData = new FormData(event.target);
//     const [user, error] = await localLogin(Object.fromEntries(formData));
//     if (error) return setErrorText(error.message);
//     setCurrentUser(user);
//     navigate(`/users/${user.id}`);
//   };

//   if (currentUser) return <Navigate to="/" />;

//   return (
//     <>
//       <h1>Login</h1>
//       <button onClick={googleLogin}>Log in with Google</button>
//       <form onSubmit={handleSubmit} aria-labelledby="login-heading">
//         <h2 id="login-heading">Log back in!</h2>
//         <label htmlFor="username">Username</label>
//         <input
//           type="text"
//           autoComplete="username"
//           id="username"
//           name="username"
//         />

//         <label htmlFor="password">Password</label>
//         <input
//           type="password"
//           autoComplete="current-password"
//           id="password"
//           name="password"
//         />

//         <button>Log in!</button>
//       </form>
//       {!!errorText && <p>{errorText}</p>}
//     </>
//   );
// }

import { useContext, useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { googleLogin, localLogin } from "../adapters/auth-adapter";
import CurrentUserContext from "../contexts/current-user-context";

export default function LoginPage() {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState("");
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText("");
    const formData = new FormData(event.target);
    const [user, error] = await localLogin(Object.fromEntries(formData));
    if (error) return setErrorText(error.message);
    setCurrentUser(user);
    navigate(`/users/${user.id}`);
  };

  if (currentUser) return <Navigate to="/" />;

  return (
    <>
      <div className="bg-yellow rounded-t-2xl flex flex-col items-center mx-10 mt-5 py-14 h-screen px-40 shadow-sm border-none">
        <div
          id="form-cont"
          className="rounded-xl flex w-fit bg-white shadow-md border-none relative h-[24.5rem] overflow-hidden"
        >
          <img
            src="https://i.ibb.co/w7Dc7bQ/rafibarides2-cute-community-gardening-monochome-orange-yellow-s-b70c43c6-fbc4-4618-9116-ef220c335750.png
            https://i.ibb.co/BsnYK8y/rafibarides2-cute-community-gardening-monochome-orange-yellow-s-bdb53699-7073-4eff-bd9c-4885a0913fc0.png"
            alt="welcome-image"
            className="relative inset-0 object-cover object-left w-full h-full max-w-[50%] rounded-tr-2xl"
          />

          <form
            onSubmit={handleSubmit}
            aria-labelledby="login-heading"
            className="border-none font-semibold"
          >
            <h2 id="login-heading" className="text-center text-bright-orange">
              Welcome Back!
            </h2>

            <label htmlFor="username">Username</label>
            <input
              className="rounded-lg text-black font-normal p-1"
              autoComplete="username"
              type="text"
              id="username"
              name="username"
            />

            <label htmlFor="password">Password</label>
            <input
              className="rounded-lg text-black font-normal p-1"
              autoComplete="current-password"
              type="password"
              id="password"
              name="password"
            />

            <button className="text-white bg-bright-orange hover:text-bright-orange hover:bg-white hover:shadow-md shadow-inner hover:shadow-inner-white font-medium rounded-full px-2.5 py-0.5">
              Log in!
            </button>
          </form>
        </div>

        {!!errorText && <p>{errorText}</p>}

        <p className="mt-4 text-white">
        Don't have an account?{" "}
          <Link to="/sign-up" className="text-bright-orange hover:text-white">
            Sign up!
          </Link>
        </p>

        {/* Add the Google button here */}
        <button onClick={googleLogin}>
          <img
            src="https://static.vecteezy.com/system/resources/previews/022/613/027/non_2x/google-icon-logo-symbol-free-png.png"
            alt="Google Logo"
            style={{ width: "30px", height: "30px" }}
          />
        </button>
      </div>
    </>
  );
}
