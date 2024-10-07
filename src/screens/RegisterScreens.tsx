import React, { useState } from 'react';
import { TextInput, Text, Button, Snackbar } from 'react-native-paper';
import { styles } from '../theme/styles';
import { View } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/config';
import { CommonActions, useNavigation } from '@react-navigation/native';

interface FormRegister {
    email: string;
    password: string;
}

interface ShowMessage {
    visible: boolean;
    message: string;
    color: string;
}
export const RegisterScreen = () => {
    const [formRegister, setFormRegister] = useState<FormRegister>({
        email: '',
        password: '',
    });

    const [showMessage, setShowMessage] = useState<ShowMessage>({
        visible: false,
        message: '',
        color: '#fff',
    });

    const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);

    const handleSetValues = (key: string, value: string) => {
        setFormRegister({ ...formRegister, [key]: value });
    }

    const navigation = useNavigation();

    
    const handleRegister = async () => {
        if (!formRegister.email || !formRegister.password) {
            setShowMessage({visible: true, message: 'Completa todos los campos', color: 'red'});
            return;
        }
        console.log(formRegister);
        try {


            const response = await createUserWithEmailAndPassword(
                auth,
                formRegister.email,
                formRegister.password
            );
            setShowMessage({
                visible: true,
                message: 'Cuenta creada con exito',
                color: 'green',
            });
        } catch (e) {
            console.log(e);
            setShowMessage({
                visible: true,
                message: 'Error al crear la cuenta',
                color: 'red',
            })
        }
    }

    return (
        <View style={styles.root}>
            <Text style={styles.title}>Registrate</Text>
            <TextInput
                label='Correo'
                mode='outlined'
                placeholder='Ingresa tu correo'
                onChangeText={(value) => handleSetValues('email', value)}
            />
            <TextInput
                label='Contraseña'
                mode='outlined'
                placeholder='Ingresa tu contraseña'
                secureTextEntry={hiddenPassword}
                onChangeText={(value) => handleSetValues('password', value)}
                right={<TextInput.Icon icon="eye" onPress={() => setHiddenPassword(!hiddenPassword)} />}
            />
            <Button icon="login" mode="contained" onPress={handleRegister}>
                Ingresar
            </Button>
            <Text
    style={styles.textRedirect} 
    onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Registro' }))}>
    No tienes cuenta? Regístrate aquí
</Text>
            <Snackbar
                visible={showMessage.visible}
                onDismiss={() => setShowMessage({ ...showMessage, visible: false })}
                style={{...styles.message, backgroundColor: showMessage.color}}>
                {showMessage.message}
            </Snackbar>
        </View>);
};
