// This file centralizes the API configuration for the application.
// When deploying, change LOCAL_IP to your live backend URL (e.g., Render/Railway).

const LOCAL_IP = '127.0.0.1'; // Use '10.0.2.2' for Android Emulator or your PC IP for physical devices
const PORT = '5000';

export const API_BASE_URL = `http://${LOCAL_IP}:${PORT}/api`;

export const ENDPOINTS = {
    AUTH: {
        LOGIN: `${API_BASE_URL}/auth/login`,
        REGISTER: `${API_BASE_URL}/auth/register`,
    },
    PROJECTS: {
        LIST: `${API_BASE_URL}/projects`,
        DETAILS: (id: string) => `${API_BASE_URL}/projects/${id}`,
    },
    DONATIONS: {
        CREATE: `${API_BASE_URL}/donations`,
    }
};
