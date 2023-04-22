import jwt from "jsonwebtoken-promisified";

export function validateJWT(token) {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return {
      success: true,
      payload: decoded,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}
