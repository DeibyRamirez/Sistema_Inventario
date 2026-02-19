import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'super_secret_Dev_key';

export  const generarToken = (payload: any) => {
    return jwt.sign(payload, SECRET, { expiresIn: '4h' });

};

export const verificarToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    throw new Error("Token inválido");
  }
}