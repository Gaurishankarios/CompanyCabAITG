import { AsyncStorage } from 'react-native'
import createDataContext from './createDataContext'
import aitan from '../api/aitan'
import { navigate } from '../navigationRef'
import axios from 'axios'
import NetInfo from "@react-native-community/netinfo";
// import console = require('console');

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'signup':
            return { errorMessage: '', token: action.payload }
        case 'forget':
            return;
        case 'signout':
            return {token: null, errorMessage: ''};
        default:
            return state;
    }
};

const signup = (dispatch) => {

    const unsubscribe = NetInfo.addEventListener(state => {
        // console.log("Connection type", state.type);
        // console.log("Is connected?", state.isConnected);
        if (state.isConnected == false) {
            alert("Check your internet connection");
        }
    });

    return async ({ employeeId, password }) => {
        // make api req to signup with email & pass
        console.log("here i am", employeeId);

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        const param = { employeeId: employeeId, passkey: password }
        console.log(param)

        try {
            const response = await aitan.post('login/validate', param,
                {
                    headers: {
                        'content-type': 'application/json',
                    },
                }
            );
            // const response = await axios.post('http://192.168.1.185:8080/taxicab/login/validate', param, headers)
            console.log(response.data);
            console.log(response.data.status)

            // await AsyncStorage.getItem('token');
            // console.log('data is', await AsyncStorage.getItem('token'))
            // dispatch({ type: 'signup', payload: response.data.token });
            if (response.data.status == true) {
                await AsyncStorage.setItem('token', employeeId);
                dispatch({ type: 'sigin', payload: employeeId });
                navigate('Home');
            } else {
                alert('Please enter valid credentials');
                dispatch({ type: 'add_error', payload: 'Something went wrong with signIn' });
            }

            //navigate to main flow

        } catch (err) {
            console.log('errror here...............', err)
            dispatch({ type: 'add_error', payload: 'Something went wrong with signIn' });
            // navigate('mainFlow')
            alert('error');
        }
    };
};

const signin = (dispatch) => {
    return ({ email, password }) => {
        //try to signin

    }
}

const signout = (dispatch) => {
    return async() => {
        //try to signin
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'signout' })
        navigate('loginFlow')
    }
}

const tryLocalSignin = (dispatch) => {
    return async () => {
        const token = await AsyncStorage.getItem('token')
        if (token) {
            dispatch({ type: 'signin', payload: token });
            navigate('Home')
        }
        else {
            navigate('loginFlow')
        }
    }
}

const forgot = (dispatch) => {
    return ({ email }) => {
        return async ({ email }) => {
            console.log("here i am", email);
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
            const param = { email: email }
            try {
                const response = await axios.post('http://192.168.1.185:8080/taxicab/login/forgot', param, headers)
                console.log(response.data);
                console.log('i am here....');
            } catch (err) {
                console.log("error is ....", err)

            }
        };

    }
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signup, forgot, tryLocalSignin, signout },
    // {isSignedIn: false, errorMessage: ''}
    { token: null, errorMessage: '' }
);