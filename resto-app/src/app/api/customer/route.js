import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

async function connection() {
	return mongoose.connect(connectionStr);
}

export async function GET(request) {
	await connection();
	let queryParams = request.nextUrl.searchParams;
	let filter = {};
	if (queryParams.get("location")) {
		let city = queryParams.get("location")
		filter = {city:{$regex:new RegExp(city, 'i')}};
	} else if (queryParams.get("restaurant")) {
		let name = queryParams.get("restaurant")
		filter = {name:{$regex:new RegExp(name, 'i')}};
	}
	let result = await restaurantSchema.find(filter);
	return NextResponse.json({ status: 200, result: result });
}
