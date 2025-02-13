import jwt from 'jsonwebtoken';

export const createJWT = (payload) => {
  const token = jwt.sign({ userId: payload.userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN, // Set your expiration time here
  });
  return token;
};
export const verifyJWT = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};