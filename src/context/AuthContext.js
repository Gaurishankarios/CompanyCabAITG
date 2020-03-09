import { AsyncStorage } from 'react-native'
import createDataContext from './createDataContext'
import aitan from '../api/aitan'
import { navigate } from '../navigationRef'
import axios from 'axios'
// import console = require('console');

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'signup':
            return { errorMessage: '', token: action.payload }
            case 'forget':
            return;
        default:
            return state;
    }
};

const signup = (dispatch) => {
    return async ({ employeeId, password }) => {
        // make api req to signup with email & pass
        console.log("here i am", employeeId);

        const headers = { 'Content-Type': 'application/json', 
        'Accept': 'application/json' }
        const param = {employeeId: employeeId, passkey: password}
        console.log(param)

        try {
            const response = await aitan.post('/validate',param,
            {
                headers: {
                    'content-type': 'application/json',
               },
            }
        );
        // const response = await axios.post('http://192.168.1.185:8080/taxicab/login/validate', param, headers)
            console.log(response.data);
            console.log(response.data.status)
            await AsyncStorage.setItem('token', (response.data.status).toString());
            // await AsyncStorage.getItem('token');
            // console.log('data is', await AsyncStorage.getItem('token'))
            // dispatch({ type: 'signup', payload: response.data.token });

            //navigate to main flow
            navigate('Home');
        } catch (err) {
            console.log('errror here...............',err)
            dispatch({ type: 'add_error', payload: 'Something went wrong with signUp' });
            navigate('mainFlow')
        }
    };
};

const signin = (dispatch) => {
    return ({ email, password }) => {
        //try to signin

    }
}

const forgot = (dispatch) => {
    return ({ email }) => {
        return async ({ email}) =>{
            console.log("here i am", email);
        const headers = { 'Content-Type': 'application/json', 
        'Accept': 'application/json' }
        const param = {email: email}
        try {
        const response = await axios.post('http://192.168.1.185:8080/taxicab/login/forgot', param, headers)
            console.log(response.data);
            console.log('i am here....');
        }catch(err){
            console.log("error is ....", err)
    
        }
    };

    }
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signup, forgot },
    // {isSignedIn: false, errorMessage: ''}
    { token: null, errorMessage: '' }
);