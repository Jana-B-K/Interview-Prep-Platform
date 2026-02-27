import { API } from "./axios.ts";

export interface ProgressPayload {
    questionId: string;
    status: "attempted" | "solved";
    userNotes?: string;
}

export const createProgress = async (
    questionId: string,
    status: ProgressPayload["status"] = "attempted",
    userNotes?: string,
) => {
    const response = await API.post('/progress', { questionId, status, userNotes });
    return response.data;
}

export const updateProgress = async (id: string, data: Partial<ProgressPayload>) => {
    const response = await API.put(`/progress/${id}`, data);
    return response.data;
}

export const getUserProgress = async () => {
    const response= await API.get(`/progress`);
    return response.data;
}

export const getProgressById = async (id: string) => {
    const response = await API.get(`/progress/${id}`);
    return response.data;
}
