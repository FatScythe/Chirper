const errorHandler = async (err, req, res, next) => {
  let customErr = {
    msg:
      err.message ||
      "Something went wrong, our engineeers are currently working on it",
    statusCode: err.statusCode || 500,
  };

  if (err.name === "SequelizeUniqueConstraintError") {
    customErr.statusCode = 400;
    customErr.msg = `Duplicate value entered for ${
      err?.errors[0]?.path || ""
    } field(s), Please choose another value`;
  }

  if (err.name === "SequelizeValidationError") {
    let fields = "";
    customErr.statusCode = 400;
    err?.errors.map((err) => {
      fields += err.message + ", ";
    });
    customErr.msg = fields ? fields : "Validation Error";
  }

  console.error(err);

  res.status(customErr.statusCode).json({ msg: customErr.msg });
};

module.exports = errorHandler;
