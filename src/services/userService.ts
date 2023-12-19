import userModel from '../models/userModel';

const login = async (auth0Id: string, email: string) => {
  return await userModel.upsertUser(auth0Id, email);
};

export default {
  login
}