const authorize = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.role; // Assume `req.user` is populated after authentication

    // Check if the user's role is in the allowedRoles list
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Access denied. Insufficient permissions." });
    }

    next(); // Proceed to the next middleware or controller
  };
};

module.exports = authorize;
