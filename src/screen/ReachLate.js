import React, { Component } from 'react';
import { Dropdown } from 'react-native-material-dropdown';
import { View, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { set } from 'react-native-reanimated';
import { navigate } from '../navigationRef'


class ReachLate extends Component {
    constructor(props) {
        //constructor to set default state  
        super(props);
        this.state = {
            nameList: [],
            dataparam: null,
        }
    }

    finalcallreach = async(value) => {

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        console.log("in call", value, this.state.dataparam);
        let tmp = this.state.dataparam;
        tmp.incidenceValue = value;
        console.log("changed value is", tmp.incidenceValue)

        
        const response = await axios.post('http://ait-taxitransport.aitglobalindia.com:8080/AITTransportModule/driver/reach',
                tmp,
                headers)

            let coderespo = response.data.status;
            console.log(coderespo);

            if (coderespo == true) {
                this.props.navigation.pop()
                // Alert.alert(
                //     'Reached',
                //     'Reached at location with insidence',
                //     [
                //         { text: 'Ok', onPress: () => {this.props.navigation.pop()} },
                //     ],
                //     { cancelable: true }
                // )
               
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

    // shouldComponentUpdate() {
    //     return false
    //   }



    render() {
        const { navigate } = this.props.navigation;

        let dataparam = this.props.navigation.state.params;
        console.log("dataparam from previous", this.props.navigation.state.params);

        // this.setState({ dataparam });
        // this.finalcallreach(this.props.navigation.params);

        return (
            <View style={styles.container}>
                <Dropdown
                    containerStyle={styles.dropdown}
                    label='Select Incidence or Reason'
                    data={this.state.nameList}
                    onChangeText={(value) => this.finalcallreach(value)}
                />
            </View>
        );
    }
}

ReachLate.navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    console.log("i am inside navigation", params)
    return {
        title: null,
    }
};


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

export default ReachLate;