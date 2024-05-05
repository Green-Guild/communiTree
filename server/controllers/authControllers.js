import User from '../db/models/User.js';

// This controller takes the provided username and password and finds
// the matching user in the database. If the user is found and the password
// is valid, it adds the userId to the cookie (allowing them to stay logged in)
// and sends back the user object.
export const loginUser = async (req, res) => {
  /*   const { username, password } = req.body; // the req.body value is provided by the client

  const user = await User.findByUsername(username);
  if (!user) return res.sendStatus(404);

  const isPasswordValid = await user.isValidPassword(password);
  if (!isPasswordValid) return res.sendStatus(401);

  req.session.userId = user.id;
  res.send(user); */
  res.sendStatus(200);
};

// This controller sets `req.session` to null, destroying the cookie
// which is the thing that keeps them logged in.
export const logoutUser = (req, res) => {
  if (!req.user) return res.sendStatus(401);
  req.logout((err) => {
    if (err) return res.sendStatus(400);
    res.sendStatus(200);
  });
};

// This controller returns 401 if the client is NOT logged in (doesn't have a cookie)
// or returns the user based on the userId stored on the client's cookie
export const showMe = async (req, res) => {
  return req.user ? res.send(req.user) : res.sendStatus(401);
};
