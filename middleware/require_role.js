function requireAdmin(req, res, next) {
  if (req.user && req.user.email === process.env.ADMIN_USERNAME) {
    return next();
  }
  return res.status(403).json({
    status: "Fail",
    code: "NOT_ADMIN",
    message: "You are not authorized to access this resource",
  });
}

export default requireAdmin;
