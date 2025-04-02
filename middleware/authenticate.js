const isAuthenticated = (req, res, next) => {
  if (req.session.user === undefined) {
    return res.status(401).json({
      error: "You do not have access. Please login.",
    });
  }
  next();
};

module.exports = {
  isAuthenticated,
};
