import axios from 'axios';

export const createPost = async (description, token) => {
  try {
    const response = await axios.post('https://clubhouse-6uml.onrender.com/api/post', 
      { description },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};
