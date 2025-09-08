const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://harishdandu:jZ1YTRmw3RBFBX3s@cluster0.wlq4n0w.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Cluster0';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const connection = mongoose.createConnection(dbURI, options);

connection.on('connected', () => {
  console.log('Mongoose connected');
});
connection.on('error', (err) => {
  console.log('Mongoose connection error: ' + err);
});
connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});
module.exports = connection;
