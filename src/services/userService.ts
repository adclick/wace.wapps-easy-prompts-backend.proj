const userModel = require('../models/user');

const getUser = async (auth0Id: string) => {
  return await userModel.getUser(auth0Id);
};

module.exports = {
    getUser,
};