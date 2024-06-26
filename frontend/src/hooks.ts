import { Form } from "@/types";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const queryClient = new QueryClient();

export function useGetForms() {
  return useQuery<Form[]>({
    queryKey: ["forms"],
    queryFn: async () => {
      const response = await axios.get("/api/forms", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      return response.data;
    },
  });
}

export function useGetForm(formId: string) {
  return useQuery<Form>({
    queryKey: ["form", formId],
    queryFn: async () => {
      const response = await axios.get("/api/forms/" + formId, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      return response.data;
    },
  });
}

export function useSubmitResponse(formId: string) {
  return useMutation({
    mutationKey: ["submit_response"],
    mutationFn: async (fields: any) => {
      return (
        axios.post(`/api/forms/${formId}/responses`, fields),
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
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
      const res = await axios.post(`/api/forms/${formId}/fields`, fields, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      return res.data;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["form", formId],
      });
    },

    onError: (error) => {
      console.log("Error adding field", error);
    },
  });
}

export function useGetFormResponses(formId: string) {
  return useQuery({
    queryKey: ["form_responses", formId],
    queryFn: async () => {
      const response = await axios.get(`/api/forms/${formId}/responses`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      return response.data;
    },
  });
}

export function useCreateForm() {
  return useMutation({
    mutationKey: ["create_form"],
    mutationFn: async (form: { title: string; description: string }) => {
      const res = await axios.post("/api/forms", form, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["forms"],
      });
    },

    onError: (error) => {
      console.log("Error creating form", error);
    },
  });
}

export function useUpdateField(formId: string, fieldId: string) {
  return useMutation({
    mutationKey: ["update_field"],
    mutationFn: async (fields: {
      type: string;
      title: string;
      description: string;
      required: boolean;
      options: string[];
    }) => {
      const res = await axios.put(
        `/api/forms/${formId}/fields/${fieldId}`,
        fields,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["form", formId],
      });
    },

    onError: (error) => {
      console.log("Error updating field", error);
    },
  });
}

export function useDeleteField(formId: string, fieldId: string) {
  return useMutation({
    mutationKey: ["delete_field"],
    mutationFn: async () => {
      const res = await axios.delete(`/api/forms/${formId}/fields/${fieldId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["form", formId],
      });
    },

    onError: (error) => {
      console.log("Error deleting field", error);
    },
  });
}
