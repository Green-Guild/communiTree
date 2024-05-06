// Is the user logged in?
// Not specific user, just ANY user
const checkAuthentication = (req, res, next) => {
  const { id } = req.session.passport;
  if (!id) return res.sendStatus(401);
  return next();
};

export default checkAuthentication;
