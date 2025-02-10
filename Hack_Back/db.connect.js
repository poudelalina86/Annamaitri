import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
        `mongodb+srv://Alina:89FzopOqnUfmpcIg@alina.rzdrsdl.mongodb.net/Donor?retryWrites=true&w=majority&appName=Alina`
    );
    console.log("DB connection established...");
  } catch (error) {
    console.log("DB connection failed...");
    console.log(error.message);
  }
};
export default connectDB;