import React, { useState } from 'react';
import { AsyncStorage, Alert, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import api from '../services/api';

export default function Book({ navigation }) {
    const [date, setDate] = useState('');
    const id = navigation.getParam('id');

    async function handleSubmit() {
        const user_id = await AsyncStorage.getItem('user');
        console.log(user_id);        
        await api.post(`/spots/${id}/bookings`, {
            date
        }, {
            headers: { user_id }
        })

        Alert.alert('Solicitação de reserva enviada');

        navigation.navigate('List');
    }

    function handleCancel() {
        navigation.navigate('List');
    }

    return <SafeAreaView style={style.container}>

        <Text style={style.label}>DATA DE INTERESSE *</Text>
        <TextInput
            style={style.input}
            placeholder="Qual a data você quer reservar?"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="words"
            autoCorrect={false}
            value={date}
            onChangeText={setDate}
        />
        <TouchableOpacity onPress={handleSubmit} style={style.button}>
            <Text style={style.buttonText}>Solicitar vaga</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCancel} style={[style.button, style.cancelButton]}>
            <Text style={style.buttonText}>Cancelar</Text>
        </TouchableOpacity>
    </SafeAreaView>
}

const style = StyleSheet.create({
    container: {
        margin: 30,
        marginTop: 50,
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
        marginTop: 30,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2,
    },
    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },
    cancelButton: {
        backgroundColor: '#ccc',
        marginTop: 10,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    }
}) 