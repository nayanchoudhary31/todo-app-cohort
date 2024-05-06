import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const db = await mongoose.connect(`${process.env.MONGODB_URL}`);
    console.log(`Db is connected sucessfully! ${db.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
