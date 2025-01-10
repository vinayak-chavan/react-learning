import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

async function connection() {
	return mongoose.connect(connectionStr);
}

export async function GET() {
	await connection();
	const data = await restaurantSchema.find();
	return NextResponse.json({ status: 200, result: data });
}

export async function POST(request) {
	const payload = await request.json();
	let result;
	let success = false;
	await connection();
	if (payload?.login) {
		const userData = await restaurantSchema.findOne({ email: payload.email })
		if (userData) {
			const isMatch = await bcrypt.compare(payload.password, userData.password);
			if (isMatch) {
				result = userData;
				success = true;
			}
		} else {
			success = false;
		}
	} else {
		const restaurant = new restaurantSchema(payload);
		result = await restaurant.save();
		if (result) {
			success = true;
		}
	}
	return NextResponse.json({ result, success });
}
