import { useState } from "react";
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export type ModalProps = {
    visible: boolean,
    getFunction:(ownerid: string,repoid: string)=> void
    onCancel : () => void;
}

export default function AddModal({ visible, getFunction,onCancel}:ModalProps){

    const [ownerid, setOwnerid] = useState('');
    const [repoid, setRepoid] =  useState('');

    const clearInput = () =>{
        setOwnerid('');
        setRepoid('');
    }

    return(
         <Modal visible = {visible} animationType="fade" transparent={true} >
            <View style = {styles.container} >
                <View style = {styles.boxContainer}>
                    
                    <TextInput
                        style = {styles.boxInput}
                        value = {ownerid}
                        onChangeText={ text =>setOwnerid(text) }
                        placeholder="ownerid"
                        autoFocus
                    />
                    <TextInput
                        style = {styles.boxInput}
                        value = {repoid}
                        onChangeText={ text => setRepoid(text)}
                        placeholder="repoid"
                        autoFocus
                    />
                    
                </View>

                <View style = {styles.buttonContainer}>
                    <TouchableOpacity
                        style = {styles.buttonAdd}  
                        onPress = { () =>{
                            getFunction(ownerid,repoid);
                            clearInput();

                        }}>
                        <Text style = {styles.buttonText} >
                            Salvar
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style = {styles.buttonCancel} 
                        onPress={() =>{
                            onCancel()
                            clearInput();
                        }}>
                        
                        <Text style = {styles.buttonText} >
                            Cancelar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({

    container:{
        backgroundColor:'rgba(0, 0, 0, 0.7)',
        alignContent:'center',
        justifyContent: 'center',
        flex: 1
    },
    boxContainer:{
        backgroundColor:'#FFF',
        alignContent:'center',
        justifyContent: 'center',
        borderRadius:10,
        margin:20
    },
    buttonText:{
        textAlign:'center',
        fontWeight: 'bold',
        color:"#FFF"
    },
    
    buttonAdd:{
        backgroundColor:'green',
        alignContent:'center',
        borderRadius:10,
        justifyContent: 'center',
        flex:1,
        margin:10,
        padding:20,
        height:60
        
    },
    buttonCancel:{
        backgroundColor:'orange',
        justifyContent: 'center',
        alignContent:'center',
        borderRadius:10,
        flex:1,
        margin:10,
        padding:20,
        height:60
        
    },
    buttonContainer:{
        flexDirection: 'row',
        marginTop:10,
        height:70
    },
    boxInput:{
        alignSelf: 'stretch',
        height:40,
        borderRadius:5,
        margin:5,
    }
})