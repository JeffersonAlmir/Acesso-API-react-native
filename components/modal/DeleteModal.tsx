
import React, { useEffect } from "react";

import { Modal, TouchableOpacity, View, Text,StyleSheet } from "react-native";


export type ModalProps = {
    visible: boolean,
    onCancel : () => void;
    onDelete : () => void;      
}

export default function DeleteModal ({visible,  onCancel, onDelete }: ModalProps) {
    

    return(
        <Modal visible = {visible} animationType="fade" transparent={true} >
            <View style = {styles.container} >
                <View style = {styles.boxContainerAsk}>
                    <Text style = {styles.text}>
                    Tem certeza que deseja deletar?
                    </Text>
                </View>

                <View style = {styles.buttonContainer}>
                    
                    <TouchableOpacity 
                        style = {styles.buttonCancel} 
                        onPress={() =>{
                            onCancel()
                        }}>
                        
                        <Text style = {styles.buttonText} >
                            Cancelar
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style = {styles.buttonConfirm} 
                        onPress={() =>{onDelete()}}
                    >
                        <Text style = {styles.buttonText} >
                            Confirmar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </Modal>
    );
};

const styles = StyleSheet.create({

    container:{
        backgroundColor:'rgba(0, 0, 0, 0.7)',
        alignContent:'center',
        justifyContent: 'center',
        flex: 1
    },
    boxContainerAsk: {
        backgroundColor: '#FFF',
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 20,
        padding: 20, 
        minHeight: 100, 
        width: '80%', 
        alignSelf: 'center', 
    },
    text: {
        fontSize: 20, 
        fontWeight: 'bold',
        textAlign: 'center', 
        color: '#333', 
    },
    boxContainer:{
        backgroundColor:'#FFF',
        alignContent:'center',
        justifyContent: 'center',
        borderRadius:10,
        margin:20
    },
    buttonText:{
        fontSize: 12,
        textAlign:'center',
        fontWeight: 'bold',
        color:"#FFF"
    },
    buttonCancel:{
        backgroundColor:'#e74c3c',
        justifyContent: 'center',
        alignContent:'center',
        borderRadius:8,
        width: '45%',
        padding:10,      
    },
    buttonConfirm: {
        backgroundColor: '#2ecc71',
        justifyContent: 'center', 
        alignItems: 'center',
        padding: 10,
        borderRadius: 8,
        width: '45%'
    },
    buttonContainer:{
        flexDirection: 'row',
        marginTop:10,
        justifyContent: 'space-around', 
        width: '80%', 
        alignSelf: 'center', 
        height:50
    },

})