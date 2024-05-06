const checkAuthentication = (req, res, next) => {
  if (!req.session.passport || !req.session.passport.user) {
    return res.sendStatus(401);
  }

  // if (!req.user || !req.user.id) {
  //   return res.sendStatus(401);
  // }

  return next();
};

export default checkAuthentication;
