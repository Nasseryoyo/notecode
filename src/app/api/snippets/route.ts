import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
	const { code, language, theme } = await req.json();
	if (!code || !language || !theme) {
		return NextResponse.json(
			{ error: "code , language and theme are required" },
			{ status: 400 }
		);
	}
	try {
		const snippet = await prisma.snippet.create({
			data: {
				code,
				language,
				theme,
			},
		});
		return NextResponse.json(snippet, { status: 201 });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "An error occurred while creating the snippet" },
			{ status: 500 }
		);
	}
}
