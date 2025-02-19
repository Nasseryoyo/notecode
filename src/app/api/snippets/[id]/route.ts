import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
	const id = req.headers.get("id");
	if (!id) {
		return NextResponse.json({ error: "id is required" }, { status: 400 });
	}

	// Code for fetching snippet with id
	const snippet = await prisma.snippet.findUnique({
		where: {
			id: id as string,
		},
	});

	if (!snippet) {
		return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
	}

	return NextResponse.json(snippet);
}

export async function PUT(req: NextRequest) {
	const id = req.headers.get("id");
	if (!id) {
		return NextResponse.json({ error: "id is required" }, { status: 400 });
	}

	const { code, language, theme } = await req.json();

	if (!code || !language || !theme) {
		return NextResponse.json(
			{ error: "code , language and theme are required" },
			{ status: 400 }
		);
	}

	try {
		const snippet = await prisma.snippet.update({
			where: {
				id: id as string,
			},
			data: {
				code,
				language,
				theme,
			},
		});
		return NextResponse.json(snippet);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "An error occurred while updating the snippet" },
			{ status: 500 }
		);
	}
}
