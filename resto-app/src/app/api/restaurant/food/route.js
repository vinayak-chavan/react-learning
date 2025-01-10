import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

async function connection() {
	return mongoose.connect(connectionStr);
}

export async function POST(request) {
	const payload = await request.json();
	let result;
	let success = false;
	await connection();

	const restaurant = new foodSchema(payload);
	result = await restaurant.save();
	if (result) {
		success = true;
	}
	return NextResponse.json({ result, success });
}
