"use client";
import { useSnippet } from "@/hooks/useSnippets";
import CodeEditor from "@/components/editor";
import { useParams } from "next/navigation";

export default function CodeSharePage() {
	const id = useParams().id?.toString() ?? "";
	const { data } = useSnippet(id);

	if (!data)
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="text-4xl font-bold">Loading...</div>
			</div>
		);

	return (
		<CodeEditor
			id={id}
			initialCode={data?.code}
			initialLanguage={data?.language}
			initialTheme={data?.theme}
		/>
	);
}
