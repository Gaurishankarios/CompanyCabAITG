import React, { useContext } from 'react'
import { View, StyleSheet, ImageBackground, Image , Alert} from 'react-native'
// import { Button } from 'react-native-elements'
import Spacer from '../components/Spacer'
import { Context as AuthContext } from '../context/AuthContext'
import { SafeAreaView } from 'react-navigation'
import { Text, Input, Button } from 'react-native-elements'

const ProfilePage = ({navigation}) => {

    const {signout} = useContext(AuthContext);



    const btnSingoutPress = () => {
        return (
        Alert.alert(
            'Do you want to logout',
            '',
            [
                { text: 'Ok', onPress: () => signout() },
                { text: 'Cancel',  style: 'cancel' },
            ],
            { cancelable: false }
        )
        )
    }


    return (
        // <SafeAreaView forceInset={{ top: 'always' }}>
        <ImageBackground source={require('../assets/backimg.png')}
            style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={require('../assets/logoait.png')}
                        style={{ width: 100, height: 100 }}
                    />
                    <Text style={{ fontSize: 12, alignItems: 'center', color: 'orange' }}>AIT Global India Pvt.Ltd</Text>
                </View>


                <Spacer>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                        <Text h1
                            h1Style={{ color: 'white' }}>AIT Portal</Text>
                    </View>
                </Spacer>

                {/* <Text style={{ fontSize: 48 }}> Profile Screen </Text>; */}

                <Text style={{ fontSize: 20, alignItems: 'center', color: 'orange' }}>Thanks for using AIT Mobile App</Text>
                <Text style={{ fontSize: 20, alignItems: 'center', color: 'orange' }}>Have a nice day</Text>

                {/* <Text style={{ fontSize: 15, alignItems: 'center', color: 'white' }}>Lot of functionality Comming soon...</Text> */}

                <View style={{ justifyContent: 'center' }}>

                    <Spacer>
                        <Button title='Sign Out' onPress={btnSingoutPress} buttonStyle={{ backgroundColor: '#03106E', padding: 15 }}//signout
                        />
                    </Spacer>
                </View>


            </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({
    container: {

        flex: 1,
        justifyContent: 'center',
        // marginBottom: 100,
        alignItems: 'center'
    },
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    },
});

ProfilePage.navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    console.log("i am inside navigation", params)
    return {
        title: 'Profile',
    }
};



export default ProfilePage;