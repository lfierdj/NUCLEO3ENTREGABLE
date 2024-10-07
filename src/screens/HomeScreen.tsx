import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Avatar, Button, Divider, FAB, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper';
import { styles } from '../theme/styles';
import { auth, database } from '../config/config';
import firebase from '@firebase/auth';
import { updateProfile, signOut } from 'firebase/auth'; 
import { FlatList } from 'react-native-gesture-handler';
import { ProductCardComponent } from '../components/ProductCardComponent';
import { NewProductComponent } from '../components/NewProductComponent';
import { onValue, ref } from 'firebase/database';

interface FormUser {
    name: string;
}

export interface Product {
    id: string;
    code: string;
    nameProduct: string;
    stock: number;
    price: number;
    description: string;
}

export const HomeScreen = () => {
    const [formUser, setFormUser] = useState<FormUser>({ name: '' });
    const [userData, setUserData] = useState<firebase.User | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [showModalProfile, setShowModalProfile] = useState<boolean>(false);
    const [showModalProduct, setShowModalProduct] = useState<boolean>(false);

    const handleSetValues = (key: string, value: string) => {
        setFormUser({ ...formUser, [key]: value });
    };

    useEffect(() => {
        setUserData(auth.currentUser);
        setFormUser({ name: auth.currentUser?.displayName ?? '' })
        getAllProduct();
    }, []);

    const handleUpdateUser = async () => {
        try {
            await updateProfile(userData!, { displayName: formUser.name });
        } catch (e) {
            console.log(e);
        }
        setShowModalProfile(false);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth); 
        } catch (e) {
            console.log(e);
        }
    };

    const getAllProduct =() => {
    const dbRef = ref(database, 'products');
    onValue(dbRef, (snapshot) => {
        const data=snapshot.val();
        const getKeys = Object.keys(data);
        const listProduct: Product[] = [];
        getKeys.forEach((key) => {
            const value ={...data[key], id: key}
            listProduct.push(value);
        });
            setProducts(listProduct);

    })
    }

    return (
        <>
            <View style={styles.rootHome}>
                <View style={styles.header}>
                    <Avatar.Text size={50} label='KN' />
                    <View>
                        <Text variant='bodySmall'>Bienvenid@</Text>
                        <Text variant='labelLarge'>{userData?.displayName}</Text>
                    </View>
                    <View style={styles.Icon}>
                        <IconButton
                            icon="account-edit"
                            size={30}
                            mode='contained'
                            onPress={() => setShowModalProfile(true)}
                        />
                    </View>
                </View>
                <View>
                    <FlatList
                        data={products}
                        renderItem={({ item }) => <ProductCardComponent product={item}/>}
                    />
                </View>
            </View>
            
            <Portal>
                <Modal visible={showModalProfile} contentContainerStyle={styles.modal}>
                    <View style={styles.header}>
                        <Text variant='headlineSmall'>Mi perfil</Text>
                        <View style={styles.Icon}>
                            <IconButton
                                icon='close'
                                size={20}
                                onPress={() => setShowModalProfile(false)} />
                        </View>
                    </View>
                    <Divider />
                    <TextInput
                        mode='outlined'
                        label='Nombre'
                        value={formUser.name}
                        onChangeText={(value) => handleSetValues('name', value)}
                    />
                    <TextInput
                        mode='outlined'
                        label={'Email'}
                        value={userData?.email!}
                    />
                    <Button mode='contained' onPress={handleUpdateUser}> Actualizar</Button>
                </Modal>
            </Portal>

            <FAB
                icon="plus"
                style={styles.fabProduct}
                onPress={() => setShowModalProduct(true)}
            />
            <NewProductComponent showModalProduct={showModalProduct} setShowModalProduct={setShowModalProduct} />

            <Button mode="contained" onPress={handleLogout} style={styles.logoutButton}>
                Cerrar Sesión
            </Button>
        </>
    );
};
