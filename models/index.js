import mongoose from 'mongoose';

//db connect
export async function createConnectionAndInitialize(dbUrl) {
  try {
    await mongoose.connect(dbUrl);

    console.log("DB connected");
  } catch (error) {
    console.log("DB not connected", error);
  }
}