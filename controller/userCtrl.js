const showMe = async (req, res) => {
  res.status(200).json(req.user);
};

module.exports = { showMe };
