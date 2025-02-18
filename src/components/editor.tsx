"use client";

import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";

import { useCreateSnippet, useUpdateSnippet } from "@/hooks/useSnippets";

interface CodeEditorProps {
	initialCode?: string;
	id?: string;
}

export default function CodeEditor({ initialCode = "", id }: CodeEditorProps) {
	const [code, setCode] = useState<string>(initialCode);

	const handleEditorChange = (value: string | undefined): void => {
		setCode(value || "");
	};

	const { doUpdateSnippet } = useUpdateSnippet(() => {});

	const { doCreateSnippet } = useCreateSnippet(() => {});

	const handleShare = () => {
		if (id) {
			doUpdateSnippet(id, { code, language: "javascript" });
		} else {
			doCreateSnippet({ code, language: "javascript" });
		}
	};
	return (
		<div className="w-full h-screen flex flex-col justify-center items-center">
			<MonacoEditor
				height="60vh"
				defaultLanguage="javascript"
				value={code}
				onChange={handleEditorChange}
				theme="vs-dark"
				options={{
					selectOnLineNumbers: true,
				}}
			/>
			<button
				className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
				onClick={() => handleShare()}
			>
				Share Code
			</button>
		</div>
	);
}
