import { View, Text , FlatList,Modal, StyleSheet, TouchableOpacity, Button} from 'react-native'
import React, {useState} from 'react'
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';

const Vehicles = () => {
    

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);
    const [vehicleinfo, setVehicleinfo] = useState(false);
    const data= ["Vehicle1", "Vehicle2"]
    const renderItem = ({item}) => (
        <TouchableOpacity onPress={() => {
            setSelectedValue(item);
            setModalVisible(false);
        }}>
            <Text style={{ marginBottom: 5, fontSize: 20, color: 'yellow' }}>{item}</Text>
        </TouchableOpacity>
    );


    const addField = async () => {
        console.log('Data');
        setVehicleinfo(true)
        // setAddFieldvalue(true);
        // if (dataelement != "") {
        //     // setData([...data, dataelement])
        //     // return
        //     // const citiesRef = collection(firedb, "cities");
        //     // console.log('Data');
        //     const userRef = collection(firedb, "users", (await userdetail).given_name, "fields");
        
        //     try {
        //         // const userRef = await addDoc(collection(firedb, "users", (await userdetail).given_name, "fields"), {
        //         //     fieldname: dataelement
        //         // });
                
                 
        //        await setDoc(doc(userRef, dataelement ),{
        //             fieldname: dataelement,
                 
                  
        //        })
        //        data.push(dataelement)

        //         console.log("Document written with ID: ", userRef.id);
        //     } catch (e) {
        //         console.error("Error adding document: ", e);
        //     }

        //     console.log(data);
        // }
        // setDataelement("")
        // setModalVisible(false)

    }







  return (
    <View>
        <Text style={{ fontSize: 20, color: 'white', marginBottom: 20 }}>Select Vehicle</Text>
                    
                   
      <View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            presentationStyle="overFullScreen"
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <View style={styles.modalContainer}>
                                <View style={styles.modalView}>
                                    <View style={{display:'flex', flexDirection:'row', alignItems:'center', gap:10}}>
                                     <Ionicons name='car-sport-outline' size={30} color='white' />
                                    <Text style={{ fontSize: 20, color: 'white', marginBottom: 20 }}>Confirm Vehicle</Text>

                                    </View>
                                    <Text >Select the vehicle you want to park with</Text>
                                    <FlatList
                                        style={{ marginBottom: 15,marginTop:20 }}
                                        data={data}
                                        renderItem={renderItem}
                                        keyExtractor={item => item}
                                    />
                                    {vehicleinfo && <View style={{borderWidth:1, borderColor:'white', width:290, padding:9, borderRadius:10, marginBottom:15}}>
                                         <TextInput placeholder="Vehicle name" style={{ padding: 5, width: 250, fontSize: 20, color: 'white', marginBottom: 10, marginLeft:7,backgroundColor: 'rgba(135, 207, 145, 0.8)' }} />
                                         <TextInput placeholder="License Plate number" style={{ padding: 5, width: 250, fontSize: 20, color: 'white', marginLeft:7,backgroundColor: 'rgba(135, 207, 145, 0.8)' }} />
                                         
                                    </View>}
                                    <TouchableOpacity onPress={() => addField()}>
                                        {/* {addFieldvalue && <TextInput placeholder="Enter field name" style={{ padding: 5, width: 200, fontSize: 20, color: 'white', marginBottom: 20, backgroundColor: 'rgba(135, 207, 145, 0.8)' }} value={dataelement} onChangeText={(text) => setDataelement(text)} />} */}
                                        <View style={{ display: 'flex', gap: 10, flexDirection: 'row', marginBottom: 30, alignItems: 'center' }}>
                                            <Ionicons name="add" size={24} color="white" />
                                            <Text style={{ fontSize: 20, color: 'white' }}>Add vehicle</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                        <TouchableOpacity style={{  borderWidth: 1, paddingHorizontal: 50, paddingVertical: 20, alignItems: 'center' }} onPress={() => setModalVisible(true)}>
                            <Text style={{fontSize:20}}>Select Vehicle</Text>
                            <Ionicons name="caret-down-outline" />
                        </TouchableOpacity>

                        {selectedValue &&
                            <View style={{ marginTop: 20, alignItems: 'center' }}>
                                <Text style={{ fontSize: 20, marginBottom: 10 }}>{selectedValue}</Text>
                                {/* <Button title="Measure" onPress={() => navigation.navigate('FarmScreen', {selectedValue: selectedValue})} /> */}
                            </View>} 
                    </View>
    </View>
  )
}

export default Vehicles




const styles = StyleSheet.create({
  
    modalView: {
        backgroundColor: "grey",
        width: '100%',
        height: 'auto',
        // backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingLeft: 30,
        paddingTop: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: 'auto'
    },


}
)