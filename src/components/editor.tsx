"use client";

import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";

import { useCreateSnippet, useUpdateSnippet } from "@/hooks/useSnippets";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import MultiSelect from "./select";

import { defaultCode, themes, languages } from "@/utils/config";

export default function CodeEditor({
	initialCode = defaultCode,
	id,
}: {
	initialCode?: string;
	id?: string;
}) {
	const [code, setCode] = useState<string>(initialCode);
	const [language, setLanguage] = useState<string>(languages[0]);
	const [theme, setTheme] = useState<string>(themes[0]);
	const [isShared, setIsShared] = useState<boolean>(!!id);

	const { doUpdateSnippet } = useUpdateSnippet(() => {});
	const { doCreateSnippet } = useCreateSnippet(() => {});

	const handleEditorChange = (value: string | undefined): void => {
		setCode(value || "");
		setIsShared(false);
	};

	const handleShare = () => {
		if (id) {
			doUpdateSnippet(id, { code, language, theme });
		} else {
			doCreateSnippet({ code, language, theme });
		}
		setIsShared(true);
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#B787F5] to-[#743EE4] p-6">
			<div className="text-center mb-6">
				<h1 className="text-white text-4xl font-bold">Create & Share</h1>
				<p className="text-white text-lg">Your Code easily</p>
			</div>
			<Card className="relative w-full max-w-4xl bg-white p-4">
				<MonacoEditor
					height="60vh"
					width="100%"
					defaultLanguage={language}
					value={code}
					onChange={handleEditorChange}
					theme={theme}
				/>
				<div className="flex justify-between items-center mt-3">
					<div className="flex gap-2">
						{MultiSelect(themes, theme, setTheme)}
						{MultiSelect(languages, language, setLanguage)}
					</div>
					<div className="flex items-center gap-2">
						{isShared && (
							<Button className="flex items-center gap-2 px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700">
								<span>🔗 ../{id}</span>
							</Button>
						)}
						<Button
							className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
							onClick={handleShare}
							disabled={isShared}
						>
							<span>🔗 Share</span>
						</Button>
					</div>
				</div>
			</Card>
		</div>
	);
}
