import userModel from '../models/user';

const getUser = async (auth0Id: string) => {
  return await userModel.getUser(auth0Id);
};

export default {
  getUser
}