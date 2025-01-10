import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib//foodModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

async function connection() {
	return mongoose.connect(connectionStr);
}

export async function GET(request, content) {
	const id = content.params.id;
	await connection();
	const data = await foodSchema.findOne({ _id: id });
	return NextResponse.json({ status: 200, result: data });
}

export async function PUT(request, content) {
	const id = content.params.id;
	const payload = await request.json();
	let result;
	let success = false;
	await connection();

	result = await foodSchema.findByIdAndUpdate(id, payload);
	if (result) {
		success = true;
	}
	return NextResponse.json({ result, success });
}