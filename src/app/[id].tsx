"use client";
import React, { useEffect, useState } from "react";
import { useSnippet } from "@/hooks/useSnippets";
import CodeEditor from "@/components/editor";

export default function CodeSharePage({ id }: { id: string }) {
	const { data } = useSnippet(id);

	return <CodeEditor initialCode={data.code} id={id} />;
}

export async function getServerSideProps({
	params,
}: {
	params: { id: string };
}): Promise<{ props: { id: string } }> {
	const { id } = params;
	return { props: { id } };
}
