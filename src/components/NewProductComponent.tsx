import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Divider, Icon, IconButton, Modal, Portal, Snackbar, Text, TextInput } from 'react-native-paper'
import { styles } from '../theme/styles';
import { push, ref, set } from 'firebase/database';
import { database } from '../config/config';

interface Props {
    showModalProduct: boolean;
    setShowModalProduct: Function;
}

interface ShowMessage {
    visible: boolean;
    message: string;
    color: string;
}

interface FormProduct {
    code: string;
    nameProduct: string;
    stock: number;
    price: number;
    description: string;
}

export const NewProductComponent = ({ showModalProduct, setShowModalProduct }: Props) => {

    const [formProduct, setFormProduct] = useState<FormProduct>({
        code: '',
        nameProduct: '',
        stock: 0,
        price: 0,
        description: '',
    });

    const [showMessage, setShowMessage] = useState<ShowMessage>({
        visible: false,
        message: '',
        color: '#fff',
    });

    const handleSetValues = (key: string, value: string) => {
        setFormProduct({ ...formProduct, [key]: value });
    }

    const handleSaveProduct = async () => {
        if (!formProduct.code || !formProduct.nameProduct || !formProduct.price || !formProduct.stock || !formProduct.description) {
            setShowMessage({
                visible: true,
                message: 'Completa todos los campos',
                color: 'red',
            });
            return;
        }

        const dbRef = ref(database, 'products');
        const saveProduct = push(dbRef);
        try {
            await set(saveProduct, formProduct);
            setShowModalProduct(false);
            setShowMessage({
                visible: true,
                message: 'Producto guardado correctamente',
                color: 'green',
            });
        } catch (e) {
            console.log(e);
            setShowMessage({
                visible: true,
                message: 'No se completó la transacción',
                color: 'red',
            });
        }
    }

    return (
        <>
            <Portal>
                <Modal visible={showModalProduct} contentContainerStyle={styles.modal}>
                    <View style={styles.header}>
                        <Text variant='headlineSmall'>Nuevo producto</Text>
                        <View style={styles.Icon}>
                            <IconButton
                                icon='close'
                                size={30}
                                onPress={() => { setShowModalProduct(false) }}
                            />
                        </View>
                    </View>
                    <Divider />
                    <TextInput
                        label='Código'
                        mode='outlined'
                        onChangeText={(value) => handleSetValues('code', value)} />

                    <TextInput
                        label='Nombre'
                        mode='outlined'
                        onChangeText={(value) => handleSetValues('nameProduct', value)} />

                    <View style={styles.rootInputsProducts}>
                        <TextInput
                            label='Precio'
                            mode='outlined'
                            keyboardType='numeric'
                            onChangeText={(value) => handleSetValues('price', value)}
                            style={{ width: '49%' }}
                        />
                        <TextInput
                            label='Stock'
                            mode='outlined'
                            keyboardType='numeric'
                            onChangeText={(value) => handleSetValues('stock', value)}
                            style={{ width: '49%' }}
                        />
                    </View>
                    <TextInput
                        label={'Descripción'}
                        mode='outlined'
                        onChangeText={(value) => handleSetValues('description', value)}
                        multiline
                        numberOfLines={3} />
                    <Button mode='contained' onPress={handleSaveProduct}> Agregar </Button>
                </Modal>
                <Snackbar
                    visible={showMessage.visible}
                    onDismiss={() => setShowMessage({ ...showMessage, visible: false })}
                    style={{ ...styles.message, backgroundColor: showMessage.color }}>
                    {showMessage.message}
                </Snackbar>
            </Portal>
        </>
    )
}
