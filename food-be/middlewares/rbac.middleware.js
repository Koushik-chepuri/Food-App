export function allowCheckout(req, res, next) {
  if (req.user.role === "Admin" || req.user.role === "Manager") {
    return next();
  }
  return res.status(403).json({ message: "Members cannot checkout orders" });
}

export function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        status: "fail",
        message: "You are not allowed to perform this action.",
      });
    }
    next();
  };
}