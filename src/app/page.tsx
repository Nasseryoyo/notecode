"use client";

import React, { useState } from "react";
import CodeEditor from "@/components/editor";
import { saveCodeSnippet } from "@/utils/api";

function HomePage() {
	const [shareLink, setShareLink] = useState<string>("");

	async function handleSaveCode(code: string): Promise<void> {
		const id = await saveCodeSnippet(code);
		setShareLink(`${window.location.origin}/${id}`);
	}

	return (
		<div className="flex justify-center items-center w-full h-screen">
			<CodeEditor onSave={handleSaveCode} />
			{shareLink && (
				<div className="mt-4">
					<p className="text-white">Share this link:</p>
					<input
						type="text"
						className="p-2 rounded"
						value={shareLink}
						readOnly
					/>
				</div>
			)}
		</div>
	);
}

export default HomePage;
