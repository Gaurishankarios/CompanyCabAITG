import React from 'react'
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native'



const CanclePickUP = ({ navigation }) => {
   
    console.log(navigation.getParam('incidenceList'));
    let listofdata = navigation.getParam('incidenceList');
    return (
        <View>
            <FlatList
                data={listofdata}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={styles.touchView} onPress={() => { navigation.pop() }}>
                            <Text>{item.title}</Text>
                        </TouchableOpacity>
                    )
                }
            }
            />
        </View>
    )
}

const styles = StyleSheet.create({

}); 

export default CanclePickUP;