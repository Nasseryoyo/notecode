import { TSnippet } from "@/types/globals";
import axios from "axios";

const baseURL = "http://localhost:3000/api";

export function apiGetSnippet(id: string) {
	return axios({
		method: "GET",
		url: `/snippets/${id}`,
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: baseURL,
	});
}

export function apiCreateSnippet(payload: TSnippet) {
	return axios({
		method: "POST",
		url: "/snippets",
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: baseURL,
		data: payload,
	});
}

export function apiUpdateSnippet(id: string, payload: TSnippet) {
	return axios({
		method: "PUT",
		url: `/snippets/${id}`,
		headers: {
			"Content-Type": "application/json",
		},
		baseURL: baseURL,
		data: payload,
	});
}
