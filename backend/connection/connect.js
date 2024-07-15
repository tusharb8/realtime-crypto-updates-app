const mongoose = require(`mongoose`)


const connectDB = () => {
  try {
    return mongoose.connect(process.env.MONGODB_URI, {
        // useNewUrlParser:true, 
        // useUnifiedTopology:true
      })
      .then(() => {
        console.log("connected to DB");
      })
      
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDB;