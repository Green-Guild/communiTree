import { useContext, useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { createUser } from "../adapters/user-adapter";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [errorText, setErrorText] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");

  if (currentUser) return <Navigate to="/" />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText("");
    if (!username || !password)
      return setErrorText("Missing username or password");

    const [user, error] = await createUser({ username, password, location });
    if (error) return setErrorText(error.message);

    setCurrentUser(user);
    navigate("/");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
    if (location === "location") setLocation(value);
    if (name === "name") setName(value);
  };

  return (
    <>
      <div className="bg-yellow rounded-t-2xl flex flex-col items-center mx-10 mt-5 py-14 h-screen px-40 shadow-sm border-none">
        {/* <h1>Sign Up</h1> */}
        <div
          id="form-cont"
          className=" rounded-xl flex w-fit bg-white shadow-md border-none relative h-[24.5rem] overflow-hidden"
        >
          <img
            src="https://cdn.discordapp.com/attachments/1092158221579468924/1238141253095522344/rafibarides2_cute_community_gardening_monochome_orange_yellow_s_b70c43c6-fbc4-4618-9116-ef220c335750.png?ex=663e3466&is=663ce2e6&hm=4e1605022567a65129737da2117e8912cc53fd466ca4b5fe8efa23ff57f4f263&"
            alt="welcome-image"
            className="relative inset-0 object-cover object-left w-full h-full max-w-[50%] rounded-tr-2xl"
          />

          <form
            onSubmit={handleSubmit}
            onChange={handleChange}
            aria-labelledby="create-heading"
            className="border-none font-semibold"
          >
            <h2 id="create-heading" className="text-center text-bright-orange">
              Sign Up
            </h2>

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

            <label htmlFor="location">Location</label>
            <input
              className="rounded-lg text-black font-normal p-1"
              autoComplete="off"
              type="text"
              id="location"
              name="location"
              onChange={handleChange}
              value={location}
            />

            <button className="text-white bg-bright-orange hover:text-bright-orange hover:bg-white hover:shadow-md shadow-inner hover:shadow-inner-white font-medium rounded-full px-2.5 py-0.5">
              Sign Up Now!
            </button>
          </form>
        </div>

        {!!errorText && <p>{errorText}</p>}

        <p className="mt-4 text-white">
          Already have an account with us?{" "}
          <Link to="/login" className="text-bright-orange hover:text-white">
            Log in!
          </Link>
        </p>

        {/* Add the Google button here */}
        <Link to="/">
          <button>
            <img
              src="https://static.vecteezy.com/system/resources/previews/022/613/027/non_2x/google-icon-logo-symbol-free-png.png"
              alt="Google Logo"
              style={{ width: "30px", height: "30px" }}
            />
            {/* Google */}
          </button>
        </Link>
      </div>
    </>
  );
}
