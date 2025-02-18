import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
	throw new Error("Please define the MONGODB_URI environment variable");
}

export const connectDB = async () => {
	if (mongoose.connection.readyState >= 1) return;

	try {
		await mongoose.connect(MONGODB_URI, {
			dbName: "noteCode",
		});
		console.log("MongoDB connected");
	} catch (error) {
		console.error("MongoDB connection error:", error);
	}
};
