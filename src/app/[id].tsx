"use client";
import React, { useEffect, useState } from "react";
import { useSnippet } from "@/hooks/useSnippets";
import CodeEditor from "@/components/editor";

export default function CodeSharePage({ id }: { id: string }) {
	const { data } = useSnippet(id);

	return (
		<div className="flex justify-center items-center w-full h-screen">
			<CodeEditor initialCode={data.code} />
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
