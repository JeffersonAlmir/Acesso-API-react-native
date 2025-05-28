import { Image, StyleSheet, Text, View } from "react-native";

export type GitUserProps = {
    id: number;
    avatar_url: string;
    login: string;
    name: string;   
    description: string;
}

export default function GitUser({id, avatar_url ,login, name, description}: GitUserProps){

    return(
         <View style ={styles.box}>
             <View style={styles.row}>
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: avatar_url ,
                    }}
                />
                
                
            </View>
            <View style ={styles.row}>
                <Text style = {styles.title}>{id}</Text>
                <Text style = {styles.title}>{login}</Text>
                <Text style = {styles.title}>{name}</Text>
                <Text style = {styles.title}> {description}</Text>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    box:{
        backgroundColor :'white',
        alignItems:'center',
        padding:20,
        margin: 20,
        borderRadius:5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    row: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    title:{
        fontSize:20,
        margin:10,
    } 
})