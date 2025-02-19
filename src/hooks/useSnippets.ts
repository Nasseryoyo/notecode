import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
	apiCreateSnippet,
	apiGetSnippet,
	apiUpdateSnippet,
} from "./apiSnippets";

import { TSnippet } from "@/types/globals";
import { toast } from "@/hooks/use-toast";
import { onError } from "./onError";

// Query Hooks Definitions
export function useCreateSnippet(onSuccess: () => void) {
	const mutation = useMutation({
		mutationFn: (data: TSnippet) => {
			return apiCreateSnippet(data);
		},
		onError,
		onSuccess: () => {
			onSuccess();
			toast({
				title: "Snippet created successfully!",
			});
		},
	});
	const { mutate } = mutation;
	return { doCreateSnippet: mutate, ...mutation };
}

export function useSnippet(id: string) {
	const { data, refetch } = useQuery({
		queryFn: () => apiGetSnippet(id),
		queryKey: ["snippet", id],
		// staleTime: 2 * 60 * 1000, // 2 minutes
	});

	return { data: data?.data, refetch };
}

export function useUpdateSnippet(onSuccess: () => void) {
	const mutation = useMutation({
		mutationFn: ({ id, data }: { id: string; data: TSnippet }) =>
			apiUpdateSnippet(id, data),
		onError,
		onSuccess: () => {
			onSuccess();
			toast({
				title: "Snippet updated successfully!",
			});
		},
	});

	const { mutate } = mutation;

	const doUpdateSnippet = (id: string, data: TSnippet) => mutate({ id, data });

	return { doUpdateSnippet, ...mutation };
}
