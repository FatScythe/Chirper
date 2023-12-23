module.exports = {
  host: "localhost",
  user: "postgres",
  password: process.env.POSTGRES_PWD,
  db: "Chirper",
  dialect: "postgres",
};
