const API_BASE_URL = '/api';
const API_URL = `${API_BASE_URL}/resumes`;

const getToken = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr).token : null;
};

export const resumeApi = {
    // Get all resumes for current user
    getResumes: async () => {
        const token = getToken();
        if (!token) throw new Error('Not authenticated');

        const response = await fetch(API_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        let data;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            const text = await response.text();
            throw new Error(text || 'Failed to fetch resumes: Server returned non-JSON response');
        }

        if (!response.ok) throw new Error(data?.message || 'Failed to fetch resumes');
        return data;
    },

    // Get a specific resume
    getResumeById: async (id) => {
        const token = getToken();
        const headers = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const response = await fetch(`${API_URL}/${id}`, { headers });
        
        let data;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            const text = await response.text();
            throw new Error(text || 'Failed to fetch resume: Server returned non-JSON response');
        }

        if (!response.ok) throw new Error(data?.message || 'Failed to fetch resume or not authorized');
        return data;
    },

    // Create a new resume
    createResume: async (resumeData) => {
        const token = getToken();
        if (!token) throw new Error('Not authenticated');

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(resumeData)
        });
        
        let data;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            const text = await response.text();
            throw new Error(text || 'Failed to create resume: Server returned non-JSON response');
        }

        if (!response.ok) throw new Error(data?.message || 'Failed to create resume');
        return data;
    },

    // Update an existing resume
    updateResume: async (id, resumeData) => {
        const token = getToken();
        if (!token) throw new Error('Not authenticated');

        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(resumeData)
        });
        
        let data;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            const text = await response.text();
            throw new Error(text || 'Failed to update resume: Server returned non-JSON response');
        }

        if (!response.ok) throw new Error(data?.message || 'Failed to update resume');
        return data;
    },

    // Delete a resume
    deleteResume: async (id) => {
        const token = getToken();
        if (!token) throw new Error('Not authenticated');

        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        let data;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            const text = await response.text();
            throw new Error(text || 'Failed to delete resume: Server returned non-JSON response');
        }

        if (!response.ok) throw new Error(data?.message || 'Failed to delete resume');
        return data;
    }
};
