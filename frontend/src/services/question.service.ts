import { API } from "./axios";

interface QuestionType {
  title: string;
  description: string;
  link: string;
  category: "dsa" | "sql";
  difficulty: "easy" | "medium" | "hard";
  sampleInputOutput: string;
  constraints?: string;
}

export const getAllQuestionRequest = async (): Promise<QuestionType[]> => {
  const response = await API.get("/questions");
  return response.data;
};

export const deleteQuestion = async (id: string) => {
  const response = await API.delete(`/questions/${id}`);
  return response.data;
};

export const postQuestion = async (data: QuestionType) => {
  const response = await API.post("/questions", data);
  return response.data;
};

export const updateQuestion = async (id: string, data: QuestionType) => {
  const response = await API.put(`/questions/${id}`, data);
  return response.data;
};