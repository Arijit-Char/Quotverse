import axios from 'axios';

export const getQuote = (page) => async (dispatch) => {
    try {
        dispatch({ type: 'Get_Quote_Request' });
        const { data } = await axios.get(`https://api.quotable.io/quotes?page=${page}`);
        dispatch({ type: 'Get_Quote_Success', payload: data.results });
    } catch (error) {
        dispatch({ type: 'Get_Quote_Failure', payload: error.response.data.message });
    }
};
