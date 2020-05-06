//DriverBillUp
import React, { useState } from 'react'
import { View, StyleSheet, Alert, Image, AsyncStorage, TouchableOpacity } from 'react-native'
import { Text, Input, Button } from 'react-native-elements'
import Spacer from '../components/Spacer'
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios'



const DriverBillUp = ({ navigation }) => {

    const [singleFile, setsingleFile] = useState([]);
    const [ridePrice, setridePrice] = useState('');


    let compdate = new Date()
    console.log("current date is ", compdate.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: '2-digit' }))
    let billDate = compdate.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: '2-digit' })
    console.log("biill dateb is ", billDate);

    const billUploadPress = async (singleFile) => {

        let tokenId = await AsyncStorage.getItem('token');
        console.log(" tokenId is ", tokenId)
        console.log(" singleFile is ", singleFile.uri)

        if (ridePrice == '' || singleFile.name == ([] || "File not uploaded")) { //|| singleFile.name == ('' || "File not uploaded")
            alert("Select file and fill ride price")
        } else 
        {

            let data = new FormData()

            // _.each(params.photos, (photo) => {
            // console.log("hey");
            data.append('file', { uri: singleFile.uri, type: "image/pdf", name: singleFile.name });
            // })

            // console.log(" data is ", data)

            // data.append('title', params.title)
            // data.append('description', params.description)
            data.append('text', ridePrice)
            data.append('date', billDate)
            data.append('employeeid', tokenId)
            // data.append('status', params.status)
            // data.append('category_id', params.category_id)
            // data.append('user_id', params.user_id)

            console.log("data is ", data)

            const response = await fetch("http://ait-taxitransport.aitglobalindia.com:8080/AITTransportModule/employee/upload", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    // 'Authorization': `Bearer ${params.token}`
                },
                body: data
            })
            let coderespo = response.status;

            console.log("coderespo is ", coderespo);

            if (coderespo == 200) {
                alert("Bill uploaded");
            } else {
                alert("Please try again")
            }
        }

        //    http://ait-taxitransport.aitglobalindia.com:8080/AITTransportModule/employee/upload

    }

    const selectOneFile = async () => {
        // async selectOneFile() {

        //Opening Document Picker for selection of one file

        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
                //There can me more options as well
                // DocumentPicker.types.allFiles
                // DocumentPicker.types.images
                // DocumentPicker.types.plainText
                // DocumentPicker.types.audio
                // DocumentPicker.types.allFiles
            });
            //Printing the log realted to the file
            console.log('res : ' + JSON.stringify(res));
            console.log('URI : ' + res.uri);
            console.log('Type : ' + res.type);
            console.log('File Name : ' + res.name);
            console.log('File Size : ' + res.size);
            // console.log("res is ", res)
            //Setting the state to show single file attributes

            // this.setState({ singleFile: res });
            let dataoffile = { "uri": res.uri, "type": res.type, "name": res.name, "size": res.size }
            console.log("dataoffile is ", dataoffile)
            setsingleFile(singleFile => dataoffile);

            console.log("singleFile ", singleFile)





        } catch (err) {
            //Handling any exception (If any)
            if (DocumentPicker.isCancel(err)) {
                //If user canceled the document selection
                alert('Canceled from single doc picker');
            } else {
                //For Unknown Error
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    }




    return (
        <View style={styles.container}>

            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.buttonStyle}
                onPress={selectOneFile.bind(this)}>
                {/*Single file selection button*/}
                <Text style={{ marginRight: 10, fontSize: 19 }}>
                    Click here to pick one file
          </Text>
                <Image
                    source={{
                        uri: 'https://img.icons8.com/offices/40/000000/attach.png',
                    }}
                    style={styles.imageIconStyle}
                />
            </TouchableOpacity>
            {/*Showing the data of selected Single file*/}
            <Text style={styles.textStyle}>
                File Name:{' '}
                {singleFile ? singleFile.name : 'File not uploaded'}
            </Text>


            <Spacer>
                <Input label="Enter Amount" //value={empId}
                    onChangeText={setridePrice}
                    // autoCapitalize='none'
                    keyboardType="number-pad"
                    returnKeyType={"done"}
                    autoCorrect={false}
                    maxLength={7}
                />
            </Spacer>
            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                {/* <Spacer> */}
                <Image
                    style={{
                        width: 150, height: 150, alignItems: 'center', //alignSelf: 'stretch', 
                    }}
                    source={require('../assets/upload.png')}
                />
                {/* </Spacer> */}
            </View>

            <Spacer>
                <Button title="Select file to upload" onPress={() => billUploadPress(singleFile)} />
            </Spacer>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {

        flex: 1,
        justifyContent: 'center',
        // marginBottom: 100,
        marginTop: 20,
    }, setColorBlue: {
        color: '#03106E'
    },
    textStyle: {
        backgroundColor: '#fff',
        fontSize: 15,
        marginTop: 16,
        color: 'black',
    },

    buttonStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#DDDDDD',
        padding: 5,
    },
    imageIconStyle: {
        height: 20,
        width: 20,
        resizeMode: 'stretch',
    },

});

export default DriverBillUp;