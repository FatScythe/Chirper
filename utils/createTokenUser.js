const createTokenUser = (user) => {
  return {
    name: user.name,
    email: user.email,
    userId: user.id,
    description: user.description,
    avatar: user.avatar,
  };
};

module.exports = createTokenUser;
