import React, { Component } from 'react';
import { Dropdown } from 'react-native-material-dropdown';
import { View, StyleSheet, Alert, AsyncStorage } from 'react-native';
import axios from 'axios';
import { set } from 'react-native-reanimated';


class CanclePickUp extends Component {
    constructor(props) {
        //constructor to set default state  
        super(props);
        let tokenId = 0;
        this.state = {
            nameList: [],
            dataparam: null,
        }
    }

    finalcallreach = async(value) => {
        tokenId=await AsyncStorage.getItem('token');
        console.log('token is ', tokenId);


        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        let parameter = {};
        if(this.state.dataparam[2] == "fromD"){
            console.log("from dricer");
            parameter = { empAssignedId: this.state.dataparam[0], rideDate: this.state.dataparam[1], driverAssignedId: tokenId, incidenceValue: "Hello4", rideType:this.state.dataparam[3]  }//need to change in  ListPD
        }else if(this.state.dataparam[2] == "fromE"){
            console.log("from employee");
           // parameter = { empAssignedId: tokenId, rideDate: this.state.dataparam[1], driverAssignedId: this.state.dataparam[0], incidenceValue: "Hello4", rideType:this.state.dataparam[3]  }
            parameter = { rideId: this.state.dataparam[4],  incidenceValue: "Hello4"  }
        }
     
        console.log("in call", value, this.state.dataparam);
        // let tmp = this.state.dataparam;
        parameter.incidenceValue = value;
        console.log("changed value is param", parameter.incidenceValue)

        
        const response = await axios.post('http://ait-taxitransport.aitglobalindia.com:8080/AITTransportModule/driver/cancel',
                parameter,
                headers)
                console.log("param is ", parameter)

            let coderespo = response.data.status;
            console.log(coderespo);

            if (coderespo == true) {
                // alert("Cancle ride with reason");
                this.props.navigation.pop()
                //  navigation.pop() 
            } else {
                alert("Fail");
            }
    }

    componentDidMount() {
        axios.get(`http://ait-taxitransport.aitglobalindia.com:8080/AITTransportModule/driver/incidencelist`)
            .then(res => {
                const nameList1 = res.data.incidenceList;
                let data = [];

                // this.setState({ nameList });
                // console.log(res.data.incidenceList);
                for (let i = 0; i < nameList1.length; i++) {
                    let obj = {};
                    // data.push()
                    obj["value"] = nameList1[i].title;
                    data.push(obj);
                    // console.log("undert loop", data);
                }
                this.setState({ nameList: data });
                // console.log(data);
            })

        const { navigate } = this.props.navigation;

        let dataparam1 = this.props.navigation.state.params;
        console.log("dataparam from previous", this.props.navigation.state.params);

        this.setState({ dataparam: dataparam1 });
    };

   



    render() {
        const { navigate } = this.props.navigation;

        let dataparam = this.props.navigation.state.params;
        console.log("dataparam from previous", this.props.navigation.state.params[0]);

        

        return (
            <View style={styles.container}>
                <Dropdown
                    containerStyle={styles.dropdown}
                    label='Select Insidence or Reason'
                    data={this.state.nameList}
                    onChangeText={(value) => this.finalcallreach(value)}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    dropdown: {
        width: '80%',
    }
});

export default CanclePickUp;