import React, {useEffect, useState} from 'react';
import {
    Alert,
StyleSheet,
Text,
View,
ActivityIndicator,
FlatList,
Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useBackHandler} from '@react-native-community/hooks'

const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

const Dashboard = () => {
    useBackHandler(() => {
        // let the default thing happenr
        return true
      })
    const [isLoading, setIsLoading] = useState(false)
    const getData=()=>{
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=>response.json())
        .then(data=> {
            // data.map(
            //     data1 => {console.log("from response " + data1.name)}
            // )
            
            setNames(data)
        }
        )
        .catch(error => {
            Alert.alert("There were some error while fetching data")
        })
        setIsLoading(false)
      }

    useEffect(
        () => {
          console.log("api called")
            setIsLoading(true)
            getData()
        },[]
    )
const [dataSet,setNames] = useState([])
return (
    <SafeAreaView>
{isLoading ? <ActivityIndicator size="large"/>: null}
 
    <FlatList
    data={dataSet}
    renderItem={({item}) => <Item title={item.name} />}
    keyExtractor={item => item.id}/>
</SafeAreaView>
);
}

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#4FD3DA',
alignItems: 'center',
justifyContent: 'center',
},
item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Dashboard;