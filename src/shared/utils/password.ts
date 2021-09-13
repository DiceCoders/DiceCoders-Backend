import { compareSync, genSalt, hashSync } from 'bcrypt';

export const generatePassword = async (password: string) => {
  const salt = await genSalt(parseFloat(process.env.SALT));
  const newPassword = hashSync(password, salt);
  return newPassword;
};

export const comparePassword = (password: string, encryptedPassword: string) =>
  compareSync(password, encryptedPassword);
