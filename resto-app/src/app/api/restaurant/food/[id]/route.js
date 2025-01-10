import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

async function connection() {
	return mongoose.connect(connectionStr);
}

export async function GET(request, content) {
	const id = content.params.id;
	await connection();
	const data = await foodSchema.find({ resto_id: id });
	return NextResponse.json({ status: 200, result: data });
}

export async function DELETE(request, content) {
	const id = content.params.id;
	let success = false;
	await connection();
	const result = await foodSchema.deleteOne({ _id: id })
	if (result.deletedCount > 0) {
		success = true
	}
	return NextResponse.json({ result, success });
}