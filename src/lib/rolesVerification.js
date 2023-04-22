export default function rolesVerification(allowedRole) {
  return async (req, res, next) => {
    const authHeader = req.header["authorization"];

    const token = authHeader && authHeader.split(" ")[1];
    console.log(authHeader);
    if (!token) {
      return res.status(401).json({ message: "Acceso no autorizado 1" });
    }

    try {
      const decodePayload = await jwt.verifyAsync(
        token,
        process.env.SECRET_KEY
      );
      const userRole = decodePayload.role;
      if (allowedRole.include(userRole)) {
        req.user = decodePayload;
      } else {
        return res.status(401).json({ message: "Acceso no autorizado 2" });
      }
    } catch (error) {
      return res.status(401).json({ message: "Acceso no autorizado 3", error });
    }
  };
}
