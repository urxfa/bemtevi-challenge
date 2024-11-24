import jwt from 'jsonwebtoken';

export const generateToken = (uid: string) => {
  const secret = process.env.JWT_SECRET || 'mecontrata';
  console.log("Generating token for Uid: ", uid)
  const token = jwt.sign({ uid }, secret, { expiresIn: '1h' });
  return token;
};

export const verifyToken = (token: string) => {
  const secret = process.env.JWT_SECRET || 'mecontrata';
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
};
