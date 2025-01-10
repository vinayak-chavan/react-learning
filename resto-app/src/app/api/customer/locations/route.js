import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

async function connection() {
	return mongoose.connect(connectionStr);
}

export async function GET() {
	await connection();
	let result = await restaurantSchema.find();
	result = result.map((item) => item.city);
	result = [...new Set(result.map((item) => item))];
	return NextResponse.json({ status: 200, result: result });
}
