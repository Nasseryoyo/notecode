"use client";

import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";

import { useCreateSnippet, useUpdateSnippet } from "@/hooks/useSnippets";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

interface CodeEditorProps {
	initialCode?: string;
	id?: string;
}

const defaultCode = `
<html>
  <head>
    <title>HTML Sample</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <style type="text/css">
      h1 {
        color: #CCA3A3;
      }
    </style>
    <script type="text/javascript">
      alert("I am a sample..., visit devChallenges.io for more projects");
    </script>
  </head>
  <body>
    <h1>Heading No.1</h1>
    <input disabled type="button" value="Click me" />
  </body>
</html>`;

const themes = ["light", "vs-dark"];

const languages = ["html", "javascript", "typescript", "css", "xml"];

export default function CodeEditor({
	initialCode = defaultCode,
	id,
}: CodeEditorProps) {
	const [code, setCode] = useState<string>(initialCode);

	const [language, setLanguage] = useState<string>(languages[0]);

	const [theme, setTheme] = useState<string>(themes[0]);

	const handleEditorChange = (value: string | undefined): void => {
		setCode(value || "");
		setIsShared(false);
	};

	const [isShared, setIsShared] = useState(false);

	const { doUpdateSnippet } = useUpdateSnippet(() => {});

	const { doCreateSnippet } = useCreateSnippet(() => {});

	const handleShare = () => {
		if (id) {
			doUpdateSnippet(id, { code, language });
		} else {
			doCreateSnippet({ code, language });
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
					{/* Language Selector & Theme Switch */}
					<div className="flex gap-2">
						<Select
							onValueChange={(value) => {
								setTheme(value);
							}}
							defaultValue={themes[0]}
						>
							<SelectTrigger className="px-3 py-1 bg-gray-200 text-sm rounded-md">
								<SelectValue placeholder={theme} />
							</SelectTrigger>
							<SelectContent>
								{themes.map((theme) => (
									<SelectItem key={theme} value={theme}>
										{theme}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Select
							onValueChange={(value) => {
								setLanguage(value);
							}}
							defaultValue={languages[0]}
						>
							<SelectTrigger className="px-3 py-1 bg-gray-200 text-sm rounded-md">
								<SelectValue placeholder={language} />
							</SelectTrigger>
							<SelectContent>
								{languages.map((lang) => (
									<SelectItem key={lang} value={lang}>
										{lang}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="flex items-center gap-2">
						{isShared && (
							<Button className="flex items-center gap-2 px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700">
								<span>🔗 ../{id}</span>
							</Button>
						)}
						{/* Share Button */}
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
