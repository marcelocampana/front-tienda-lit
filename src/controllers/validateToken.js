import jwt from "jsonwebtoken";

export function validateToken(token) {
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
