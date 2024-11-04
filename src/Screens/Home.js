import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'




const Home = () => {
    const navigator = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button}>
                <Text style={{ textAlign: 'center', fontSize: 18 }}>Play video </Text>
            </TouchableOpacity>
ß
            <TouchableOpacity onPress={()=>navigator.navigate('Video')} style={styles.button}>
                <Text style={{ textAlign: 'center', fontSize: 18 }}>Deep Message </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: .5
    },
    button: {
        width: '80%',
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        marginBottom: 10,

    }
})