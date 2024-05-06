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

export const logoutUser = (req, res) => {
  if (!req.user) return res.sendStatus(401);
  req.logout((err) => {
    if (err) return res.sendStatus(400);
    res.sendStatus(200);
  });
};

export const showMe = async (req, res) => {
  return req.user ? res.send(req.user) : res.sendStatus(401);
};
