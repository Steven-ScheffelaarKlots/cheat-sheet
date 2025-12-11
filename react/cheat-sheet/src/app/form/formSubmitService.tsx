const API_ENDPOINT = "http://localhost:3001";

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  message: string;
}

interface SubmitFormResponse {
    success: boolean;
    message?: string;
    data?: FormData;
}

export const formSubmitService = {
    submitForm: async (formData: FormData): Promise<SubmitFormResponse> => {
        try {
            const response = await fetch(`${API_ENDPOINT}/api/submit-form`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Form submission error:", error);
            throw error;
        }
    },
};