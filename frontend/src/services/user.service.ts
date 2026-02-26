import { API } from "./axios";

export const getProfile = async () => {
    const response = await API.get('/user');
    return response.data;
}

export const updateProfile = async (data: Record<string, unknown>) => {
    const response = await API.put('/user', data);
    return response.data;
}
