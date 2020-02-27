import { AsyncStorage } from 'react-native'
import createDataContext from './createDataContext'
import aitan from '../api/aitan'
import { navigate } from '../navigationRef'
// import console = require('console');

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'signup':
            return { errorMessage: '', token: action.payload }
        default:
            return state;
    }
};

const signup = (dispatch) => {
    return async ({ email, password }) => {
        // make api req to signup with email & pass
        console.log("here i am");

        try {
            const response = await aitan.post('/signup', { email, password });
            console.log(response.data)
            await AsyncStorage.setItem('token', response.data.token);
            // await AsyncStorage.getItem('token');
            console.log('data is', await AsyncStorage.getItem('token'))
            // dispatch({ type: 'signup', payload: response.data.token });

            //navigate to main flow
            navigate('Home');
        } catch (err) {
            console.log('errror here...............')
            dispatch({ type: 'add_error', payload: 'Something went wrong with signUp' });
            navigate('Forget')
        }
    };
};

const signin = (dispatch) => {
    return ({ email, password }) => {
        //try to signin

    }
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signup },
    // {isSignedIn: false, errorMessage: ''}
    { token: null, errorMessage: '' }
);