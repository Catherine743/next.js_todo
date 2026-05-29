import mongoose from "mongoose"

const connectionString = process.env.connectionString as string

const connectDB = () => {
    mongoose.connect(connectionString).then((res) => {
        console.log("Connected to database")
    }).catch((err) => {
        console.log("Connect failed", err)
    })
}

export default connectDB;