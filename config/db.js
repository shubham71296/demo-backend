const mongoose = require('mongoose');
require('dotenv').config();

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;


let uri = process.env.MONGODB_URI;
if (uri && !uri.endsWith('/demo-db-2')) {
  // Ensure the URI ends with the database name
  if (uri.endsWith('/')) {
    uri = uri + 'demo-db-2';
  } else {
    uri = uri + '/demo-db-2';
  }
}
console.log("uri-=-=-=-=?", uri)


const connect = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connect ;
