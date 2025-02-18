"use client";

import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";

interface CodeEditorProps {
	initialCode?: string;
	onSave: (code: string) => void;
}

export default function CodeEditor({
	initialCode = "",
	onSave,
}: CodeEditorProps) {
	const [code, setCode] = useState<string>(initialCode);

	function handleEditorChange(value: string | undefined): void {
		setCode(value || "");
	}

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
				onClick={() => onSave(code)}
			>
				Share Code
			</button>
		</div>
	);
}
