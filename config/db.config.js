const mongoose= require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/get-lit';

mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`You are connected to the database ${MONGODB_URI}`))
    .catch((error) => {
        console.error(`An error ocurred trying to connect to ${MONGODB_URI}`, error);
        process.exit(0);
    });

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected on app termination');
        process.exit(0);
      });
});

module.exports.DB = MONGODB_URI;
