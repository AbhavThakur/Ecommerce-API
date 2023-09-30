import { UserModal } from '../model/index.js';

const isAdmin = async (req, res, next) => {
  const user = await UserModal.findById(req.userAuthId);
  if (user?.isAdmin) {
    next();
  } else {
    next(new Error('You are not an admin'));
  }
};

export default isAdmin;
