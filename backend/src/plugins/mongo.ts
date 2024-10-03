import mongoose from "mongoose"

export async function connectWithMongo() {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/fintrack`)
    console.log('Connected with Mongo')
  } catch (err) {
    console.log(`MongoDB connection error: ${err}`)
  }
}