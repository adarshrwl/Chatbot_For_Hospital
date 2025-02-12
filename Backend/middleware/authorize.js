const authorize = (allowedRoles) => {
  return (req, res, next) => {
    try {
      const userRole = req.user?.role; // Ensure req.user exists
      console.log("User Role:", userRole); // Debug log
      console.log("Allowed Roles:", allowedRoles); // Debug log

      if (!userRole) {
        return res
          .status(403)
          .json({ message: "Access denied. User role not found." });
      }

      // Check if the user's role is in the allowedRoles list
      if (!allowedRoles.includes(userRole)) {
        console.log("Access denied. Insufficient permissions."); // Debug log
        return res
          .status(403)
          .json({ message: "Access denied. Insufficient permissions." });
      }

      next(); // Proceed to the next middleware or controller
    } catch (error) {
      console.error("Authorization error:", error.message); // Debug log
      res
        .status(500)
        .json({ message: "Internal server error during authorization." });
    }
  };
};

module.exports = authorize;
