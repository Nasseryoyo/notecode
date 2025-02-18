export async function saveCodeSnippet(code: string): Promise<string> {
	const res = await fetch("/api/saveCode", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ code }),
	});

	const data = await res.json();
	return data.id;
}

export async function getCodeSnippet(id: string): Promise<string> {
	const res = await fetch(`/api/getCode/${id}`);
	const data = await res.json();
	return data.code;
}
