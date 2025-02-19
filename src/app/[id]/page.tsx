"use client";
import { useSnippet } from "@/hooks/useSnippets";
import CodeEditor from "@/components/editor";
import { useParams } from "next/navigation";

export default function CodeSharePage() {
	const id = useParams().id?.toString() ?? "";
	const { data } = useSnippet(id);

	return <CodeEditor initialCode={data?.code ?? ""} id={id} />;
}
