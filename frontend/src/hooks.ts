import { Form } from "@/types";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const queryClient = new QueryClient();

export function useGetForms() {
  return useQuery<Form[]>({
    queryKey: ["forms"],
    queryFn: async () => {
      const response = await axios.get("/api/forms");
      return response.data;
    },
  });
}

export function useGetForm(formId: string) {
  return useQuery<Form>({
    queryKey: ["form", formId],
    queryFn: async () => {
      const response = await axios.get("/api/forms/" + formId);
      return response.data;
    },
  });
}

export function useSubmitResponse(formId: string) {
  return useMutation({
    mutationKey: ["submit_response"],
    mutationFn: async (fields: any) => {
      return axios.post(`/api/forms/${formId}/responses`, fields);
    },

    onSuccess: () => {
      console.log("Field added");
    },

    onError: () => {
      console.log("Error adding field");
    },
  });
}

export function useAddField(formId: string) {
  return useMutation({
    mutationKey: ["add_field"],
    mutationFn: async (fields: {
      title: string;
      type: string;
      description: string;
    }) => {
      return axios.post(`/api/forms/${formId}/fields`, fields);
    },

    onSuccess: () => {
      // Invalidate the form data so that the new field is fetched
      // when the form data is refetched
      queryClient.invalidateQueries({
        queryKey: ["form", formId],
      });
    },

    onError: () => {
      console.log("Error adding field");
    },
  });
}

export function useGetFormResponses(formId: string) {
  return useQuery({
    queryKey: ["form_responses", formId],
    queryFn: async () => {
      const response = await axios.get(`/api/forms/${formId}/responses`);
      return response.data;
    },
  });
}
