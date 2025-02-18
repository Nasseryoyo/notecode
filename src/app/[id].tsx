"use client";
import React, { useEffect, useState } from "react";
import { getCodeSnippet } from "@/hooks/apiSnippets";
import CodeEditor from "@/components/editor";

export default function CodeSharePage({ id }: { id: string }) {
	const [code, setCode] = useState<string>("");

	useEffect(() => {
		async function fetchCode(): Promise<void> {
			const fetchedCode = await getCodeSnippet(id);
			setCode(fetchedCode);
		}

		fetchCode();
	}, [id]);

	const handleSaveCode = (newCode: string) => {
		// Save code logic (you can update the backend to reflect changes)
		setCode(newCode);
	};

	return (
		<div className="flex justify-center items-center w-full h-screen">
			<CodeEditor initialCode={code} onSave={handleSaveCode} />
		</div>
	);
}

export async function getServerSideProps({
	params,
}: {
	params: { id: string };
}): Promise<{ props: { id: string } }> {
	const { id } = params;
	return { props: { id } };
}
