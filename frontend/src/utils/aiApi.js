const API_BASE_URL = '/api';
const API_URL = `${API_BASE_URL}/ai`;

export const aiApi = {
    generateSummary: async (jobTitle, experienceLevel = 'Professional') => {
        const userStr = localStorage.getItem('user');
        const token = userStr ? JSON.parse(userStr).token : null;
        if (!token) throw new Error('Not authenticated');

        const response = await fetch(`${API_URL}/generate-summary`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ jobTitle, experienceLevel })
        });
        
        let data;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            const text = await response.text();
            throw new Error(text || 'Failed to generate AI summary: Server returned non-JSON response');
        }

        if (!response.ok) throw new Error(data?.message || 'Failed to generate AI summary');
        return data.summary;
    },

    enhanceBulletPoint: async (text, jobTitle) => {
        const userStr = localStorage.getItem('user');
        const token = userStr ? JSON.parse(userStr).token : null;
        if (!token) throw new Error('Not authenticated');

        const response = await fetch(`${API_URL}/enhance-bullets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ text, jobTitle })
        });
        
        let data;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            const text = await response.text();
            throw new Error(text || 'Failed to enhance AI bullet: Server returned non-JSON response');
        }

        if (!response.ok) throw new Error(data?.message || 'Failed to enhance AI bullet');
        return data.enhancedText;
    }
};
