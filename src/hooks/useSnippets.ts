import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api, { apiCreateSnippet } from "./apiSnippets";

// Type Definitions
export interface Snippet {
	id: string;
	code: string;
	language: string;
}

// Fetch a snippet by ID
export const fetchSnippet = async (id: string): Promise<Snippet> => {
	const response = await api.get(`/snippets/${id}`);
	return response.data;
};

// Save a new snippet
export const saveSnippet = async (
	snippet: Partial<Snippet>
): Promise<Snippet> => {
	const response = await api.post(`/snippets`, snippet);
	return response.data;
};

// Update an existing snippet
export const updateSnippet = async ({
	id,
	code,
}: {
	id: string;
	code: string;
}) => {
	const response = await api.put(`/snippets/${id}`, { code });
	return response.data;
};

export function useCreateSnippet(onSuccess: () => void) {
	const mutation = useMutation({
		mutationFn: (data: Snippet) => {
			return apiCreateSnippet(data);
		},
		onError,
		onSuccess: () => {
			onSuccess();
			toast({
				title: "Admin created successfully!",
			});
		},
	});
	const { mutate } = mutation;
	return { doCreateAdmin: mutate, ...mutation };
}
