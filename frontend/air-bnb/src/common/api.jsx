const BASE_URL = "http://localhost:8000";

export const logOutUrl = "/api/auth/logout"
export const logInUrl = "/api/auth/login"
export const signinUrl = "/api/auth/signin"

export async function apiRequest(endpoint, method = "GET", data = null, headers = {}) {
    try {
        const config = {
            method,
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
        };
        if (data) {
            config.body = JSON.stringify(data);
        }

        const response = await fetch(`${BASE_URL}${endpoint}`, config);

        // Check if response is ok
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Something went wrong");
        }

        // Parse JSON response
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("API Error:", error.message);
        throw error;
    }
}
