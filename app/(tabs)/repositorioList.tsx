import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyScrollView from '@/components/MyScrollView';
import { useEffect, useState } from 'react';
import axios from 'axios'

import { IgitUser } from '@/interface/IgitUser';
import DeleteModal from '@/components/modal/DeleteModal';
import AddModal from '@/components/modal/AddModal';
import GitUser from '@/components/gitUser/GitUser';


export default function repositorioList() {
  const [gitUser,setGitUser] = useState<IgitUser[]>([])
  const [modalVisibleAdd, setModalVisibleAdd] = useState<boolean>(false);
  const [modalVisibleDelete, setModalVisibleDelete] = useState<boolean>(false);


  useEffect(() =>{
       const getData = async () => {
           try {
               const data = await AsyncStorage.getItem("@GitUserApp: gitUser");
               const UserData = data != null ? JSON.parse(data) : [];
               setGitUser(UserData)
           } catch (e) {
               console.error("error",e);
           }
       };
       getData();
   },[])

  const openModalAdd = ()=>{   
    setModalVisibleAdd(true);
  };
  const openModalDelete = ()=>{   
    setModalVisibleDelete(true);
  };
  const closeModalAdd = ()=>{
    setModalVisibleAdd(false);
  }
   const closeModalDelete = ()=>{   
    setModalVisibleDelete(false);
  };

  const onDelete = async() =>{
    await AsyncStorage.setItem("@GitUserApp: gitUser", JSON.stringify([]))
    setModalVisibleDelete(false);
  } 


  const onAdd = async(id:number, avatar_url:string ,login:string, name:string, description:string) =>{
    const newGitUser: IgitUser ={
        
      id: id,
      avatar_url:avatar_url,
      login: login,
      name: name,   
      description: description,   
    }

    const userPlus : IgitUser[] =[
      ...gitUser, newGitUser
    ]
    setGitUser(userPlus);
    await AsyncStorage.setItem("@GitUserApp: gitUser", JSON.stringify(userPlus))
    setModalVisibleAdd(false);
  }
  const getGitUser =async (ownerid: string, repoid:string )=>{

    try{
      const response = await axios.get(`https://api.github.com/repos/${ownerid}/${repoid}`)
      if (response){
        onAdd(
          response.data.id, 
          response.data.owner.avatar_url,
          response.data.owner.login,
          response.data.name,
          response.data.description,

        )    
      }
    }catch (error) {
      console.error(error); 
      //colocar alert
      setModalVisibleAdd(false)
      
    } 
  }
  
  return (
    < MyScrollView headerBackgroundColor={{ light : "#A1CEDC", dark:'#1D3D47' }}>
      <View style={styles.containerButton}>

        <TouchableOpacity 
          style={styles.buttonAdd}
          onPress={openModalAdd}
        >
          <Text style={styles.text}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.buttonRemoveAll}
          onPress={openModalDelete}
          >
          <Text style={styles.text}>-</Text>
        </TouchableOpacity>
      </View>
      <DeleteModal
        visible ={modalVisibleDelete}
        onCancel={closeModalDelete}
        onDelete={onDelete}
      />
      <AddModal
        visible ={modalVisibleAdd}
        onCancel={closeModalAdd}
        getFunction={getGitUser}
      />
      
      {gitUser.map((user)=>{
        return(
          <GitUser
            key={user.id}
            id ={user.id}
            avatar_url={user.avatar_url}
            login={user.login}
            name={user.name}
            description={user.description}
          
          />
        )
      })

      }
    </MyScrollView>
  );
}

const styles = StyleSheet.create({

  containerButton:{
    flexDirection:'row',
    justifyContent: 'center',
    gap: 50,
    padding:30

  },
  buttonAdd: {
    width: 60,
    height: 60,
    borderRadius: 30, 
    backgroundColor: '#00BFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRemoveAll: {
    width: 60,
    height: 60,
    borderRadius: 30, 
    backgroundColor: '#FF6347',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize:20
  },
});
