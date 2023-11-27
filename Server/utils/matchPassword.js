import bcrypt from "bcrypt";

const matchPassword = async (pass, user) => {
  return await bcrypt.compare(pass, user.password);
};

export default matchPassword;
