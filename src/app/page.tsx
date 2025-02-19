"use client";

import React, { useState } from "react";
import CodeEditor from "@/components/editor";

export default function HomePage() {
	return (
		<div className="flex justify-center items-center w-full h-screen">
			<CodeEditor />
		</div>
	);
}
