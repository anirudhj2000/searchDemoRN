import React from "react";
import { useState,useEffect} from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TextInput,
    Dimensions
  } from 'react-native';

const Home = () => {

    const [text, onChangeText] = React.useState("");
    const [number, onChangeNumber] = React.useState(null);
    const [responseJson, setResponse] = useState([]);
    const [InitalList ,setInitialList] = useState([]);

    const Search = (text) => {
        // if(text.length==0){
        //     setResponse(InitalList);
        // }
        // else{//]
            onChangeText(text)
            const initList = InitalList;
            const newList = initList.filter(item => checkText(item,text));
            setResponse(newList);
        // }

    }

    const checkText = (item,text) => {
        if(item.name.includes(text)) return true;
        else if(item.name.toUpperCase().includes(text)) return true;
        else if(item.name.toLowerCase().includes(text)) return true;
        else return false;
    }

    const list = async() => {

        const response = await fetch('https://gorest.co.in/public/v2/users',
            {method : 'GET',

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            
            });
        const content = await response.json();
        console.log(content);
        setResponse(content);
        setInitialList(content);
        //console.log(responseJson.length);
    }

    useEffect(() => {
        list();
        console.log("List Function called")
    },[])
    
    return(
        <View style={styles.parentView}>

            <View style={styles.inputView}>
                <TextInput value={text} onChangeText={text => Search(text)} style={styles.input} placeholder="Search"/>
            </View>

            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={true} horizontal="false">
                {
                    responseJson.map((item) => {
                        return(
                            <View style={styles.itemStyle}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.email}>{item.email}</Text>
                            </View>
                        )
                        
                    })
                }
            </ScrollView>
        </View>
    )

}

const styles = StyleSheet.create({
    parentView:{
        height : window.innerHeight,
        width : window.innerWidth,
        display : 'flex',
        justifyContent:'center',
        alignItems : 'center',
    },

    inputView :{
        width : '90%',
        height : 50,
        borderWidth : 1,
        marginVertical : '5%',
        borderRadius :4,
    },

    input : {
        fontSize : 16,
        paddingHorizontal : 8,
    },

    scroll : {
        width:'100%',
    },

    itemStyle : {
        width : '90%',
        height : 70,
        backgroundColor : '#adadad',
        marginVertical : '2.5%',
        marginHorizontal:'5%',
        justifyContent:'center',
        borderRadius:4,
    },

    name : {
        fontSize:16,
        paddingHorizontal:8,
    },
    email:{
        fontSize:12,
        paddingHorizontal:8

    }

    
})

export default Home;