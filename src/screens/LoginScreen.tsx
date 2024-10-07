import React, { useState } from 'react'
import { View } from 'react-native';
import { styles } from '../theme/styles';
import { Button, Snackbar, Text, TextInput } from 'react-native-paper';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/config';;
import { CommonActions, useNavigation } from '@react-navigation/native';

interface FormLogin {
    email: string;
    password: string;
}

interface ShowMessage {
    visible: boolean;
    message: string;
    color: string;
}
export const LoginScreen = () => {

    const [formLogin, setFormLogin] = useState<FormLogin>({
        email: '',
        password: '',
    });

    const handleSetValues = (key: string, value: string) => {
        setFormLogin({ ...formLogin, [key]: value });
    }

    const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);

    const navigation = useNavigation();
    
    const handleSignIn = async () => {
        if (!formLogin.email || !formLogin.password) {
            setShowMessage({
                visible: true,
                message: 'Completa todos los campos',
                color: 'red',
            });
            return;
        }

        console.log(formLogin);
        try {
            const response = await signInWithEmailAndPassword(
                auth,
                formLogin.email,
                formLogin.password
            )
            
        } catch (e) {
            console.log(e);
            setShowMessage({
                visible: true,
                message: 'Credenciales incorrectas',
                color: 'red',
            });
        }
    }

    const [showMessage, setShowMessage] = useState<ShowMessage>({
        visible: false,
        message: '',
        color: '#fff',
    })
    return (
        <View style={styles.root}>
            <Text style={styles.title}>Inicia sesion</Text>
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
            <Button icon="login" mode="contained" onPress={handleSignIn}>
                Iniciar
            </Button>
            <Text style={styles.textRedirect} 
            onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Registro' }))}>
                 No tienes una cuenta? 👉 Regístrate aquí 👈 </Text>
            <Snackbar
                visible={showMessage.visible}
                onDismiss={() => setShowMessage({ ...showMessage, visible: false })}
                style={{ ...styles.message, backgroundColor: showMessage.color }}>
                {showMessage.message}
            </Snackbar>
        </View>);

}
