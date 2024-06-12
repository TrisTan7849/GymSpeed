function isAdmin(req, res, next) {
  if (req.session && req.session.user && req.session.user.isAdmin) {
    return next();
  } else {
    return res.status(401).send('Accès non autorisé');
  }
}

export default isAdmin;
