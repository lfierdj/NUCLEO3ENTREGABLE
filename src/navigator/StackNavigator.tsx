import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreens'; 
import { HomeScreen } from '../screens/HomeScreen';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/config';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { styles } from '../theme/styles';
import DetailProductScreen from '../screens/DetailProductScreen';

interface Routes {
    name: string;
    screen: () => JSX.Element;
    headerShow?: boolean; //porpiedad opcional
}

const routesNoAuth: Routes[] = [
    { name: 'Login', screen: LoginScreen },
    { name: 'Registro', screen: RegisterScreen }, 
];

const routesAuth: Routes[] = [
    {name: 'Home', screen: HomeScreen},
    {name: 'Detail', screen: DetailProductScreen, headerShow: true}
];

const Stack = createStackNavigator();

export const StackNavigator = () => {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAuth(!!user); 
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <>
            {isLoading ? (
                <View style={styles.rootActivity}>
                    <ActivityIndicator animating={true} size={35} />
                </View>
            ) : (
                <Stack.Navigator>
                    {
                        !isAuth ? 
                            routesNoAuth.map((item, index) => (
                                <Stack.Screen
                                    key={index}
                                    name={item.name}
                                    options={{ headerShown: false }}
                                    component={item.screen}
                                />
                            )) :
                            routesAuth.map((item, index) => (
                                <Stack.Screen
                                    key={index}
                                    name={item.name}
                                    options={{ headerShown: item.headerShow ?? false }}
                                    component={item.screen}
                                />
                            ))
                    }
                </Stack.Navigator>
            )}
        </>
    );
};
