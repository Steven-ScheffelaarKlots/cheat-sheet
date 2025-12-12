const API_ENDPOINT = "http://localhost:3001";


interface SubmitNumberResponse  {
    input: number;
    result: number
}

export const UseStuffService = {
    submitNumber: async (integer : number): Promise<SubmitNumberResponse> => {
            const response = await fetch(`${API_ENDPOINT}/api/multiply/${integer}`)
            if (!response.ok) throw new globalThis.Error(response.status.toString());
            return response.json() as Promise<SubmitNumberResponse>
        }
    
}