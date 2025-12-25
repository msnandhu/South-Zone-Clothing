// Basic Fetch wrapper for the backend
const BASE_URL = 'http://localhost:3001/api';

const headers = {
    'Content-Type': 'application/json',
};

export const api = {
    get: async (endpoint) => {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`);
            if (!response.ok) throw new Error(`GET ${endpoint} failed`);
            return await response.json();
        } catch (error) {
            console.error(error);
            return null;
        }
    },
    post: async (endpoint, data) => {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method: 'POST',
                headers,
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error(`POST ${endpoint} failed`);
            return await response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    put: async (endpoint, data) => {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method: 'PUT',
                headers,
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error(`PUT ${endpoint} failed`);
            return await response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    delete: async (endpoint) => {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error(`DELETE ${endpoint} failed`);
            return await response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
};
