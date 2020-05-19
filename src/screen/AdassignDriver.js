import React, { Component } from 'react';
import { Dropdown } from 'react-native-material-dropdown';
import { View, StyleSheet, Alert, AsyncStorage } from 'react-native';
import axios from 'axios';
import { set } from 'react-native-reanimated';


class AdassignDriver extends Component {
    constructor(props) {
        //constructor to set default state  
        super(props);
        let tokenId = 0;
        this.state = {
            nameList: [],
            dataparam: null,
            listDriver: [],
            listVehicle: [],
        }
    }



   
    componentDidMount() {
        axios.get(`http://ait-taxitransport.aitglobalindia.com:8080/AITTransportModule/admin/fetchDetails`)
            .then(res => {
                console.log("api call")
                const listDriver1 = res.data.driverList;
                const listVehicle1 = res.data.vehicleList;
                let data = [];

                this.setState({ listDriver1 });
                console.log(res.data.driverList);

                for (let i = 0; i < listDriver1.length; i++) {
                    let obj = {};
                    // data.push()
                    obj["value"] = listDriver1[i].title;
                    obj["id"] = listDriver1[i].value;
                    data.push(obj);
                    // console.log("undert loop", data);
                }
                this.setState({ listDriver: data });
               
            })

        const { navigate } = this.props.navigation;

        // let dataparam1 = this.props.navigation.state.params;
        // console.log("dataparam from previous", this.props.navigation.state.params);

        // this.setState({ dataparam: dataparam1 });

        
       
    };

     filterdatas = (value) => {
        // 
        console.log(value);
        // console.log(this.state.listDriver.filter((item) => { return { value: item.id, label: (item.title=value), }; }))
    //    console.log( this.state.listDriver.findIndex(value));
    }

    valueExtractor = val => {
        console.log(val);
      };
      




    render() {
        // const { navigate } = this.props.navigation;

        // let dataparam = this.props.navigation.state.params;
        // console.log("dataparam from previous", this.props.navigation.state.params[0]);



        return (
            <View style={styles.container}>
                <Dropdown
                    containerStyle={styles.dropdown}
                    label='Select Driver'
                    data={this.state.listDriver} //keyAttribute={"value"} valueAttribute={"id"}
                    // selectedItem
                    // labelExtractor={this.state.listDriver['id']}
                    // value={this.state.listDriver.id}
                    
                    // valueExtractor= {this.valueExtractor}
                    onChangeText={(value) => {this.filterdatas(value)}}
                    // onChangeText={(valueExtractor) => {this.filterdatas(valueExtractor)}}
                    // onChangeText={(value)=>{this.onChangeTextPress(data.id, value)}}
                    // 
                    
                        //this.finalcallreach(value)}
                        
                />
                <Dropdown
                    containerStyle={styles.dropdown}
                    label='Select Vehical'
                    data={this.state.listDriver} //keyAttribute={"value"} valueAttribute={"id"}
                    
                    onChangeText={(value) => {this.filterdatas(value)}}
                    
                />
            </View>
        );
    }
}

AdassignDriver.navigationOptions = ({ navigation }) => {
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

export default AdassignDriver;