const DB_URI =
  process.env.MONGO_DB_URI || 'mongodb://admin:admin123@mongodb-service:27017/microservices?authSource=admin';

module.exports = {
  DB_URI,
};
