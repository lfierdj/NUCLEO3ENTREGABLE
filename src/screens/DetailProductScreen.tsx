import { View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, Divider, Snackbar, Text, TextInput } from 'react-native-paper';
import { styles } from '../theme/styles';
import { ref, remove, update } from 'firebase/database';
import { auth, database } from '../config/config';
import { useNavigation, useRoute } from '@react-navigation/native';

// Interfaz para el producto de videojuego
interface ShowMessage {
  visible: boolean;
  message: string;
  color: string;
}

interface Product {
  id: string;
    code: string;
    nameProduct: string;
    stock: number;
    price: number;
    description: string;
}

export const DetailProductScreen = () => {
  // Hook para manejar el estado del mensaje
  const [showMessage, setShowMessage] = useState<ShowMessage>({
    visible: false,
    message: '',
    color: '#fff',
  });

  // Hook para acceder a la información de la ruta
  const route = useRoute();
  const navigation = useNavigation();

  // Obtener los datos del producto desde la ruta
  const { product } = route.params as { product?: Product }; // Hacemos 'product' opcional

  // Hook para manejar el estado del formulario
  const [formEdit, setFormEdit] = useState<Product>({
    id: '',
    code: '',               
    nameProduct: '',
    stock: 0,              
    price: 0,
    description: ''        
});

  // Hook para cargar los datos del producto en el formulario
  useEffect(() => {
    if (product) {
      setFormEdit(product);
    } else {
      console.error('No se recibió un objeto product válido');
      // Redirigir o mostrar un mensaje si no se recibe el producto
      navigation.goBack(); 
    }
  }, [product, navigation]);

  // Función para actualizar los valores del formulario
  const handleSetValues = (key: keyof Product, value: string | number) => {
    setFormEdit((prev) => ({ ...prev, [key]: value }));
  };

  // Función para actualizar los datos del producto en la base de datos
  const handleUpdateProduct = async () => {
    const dbRef = ref(database, `products/${auth.currentUser?.uid}/${formEdit.id}`);
    try {
      await update(dbRef, {
        nameProduct: formEdit.nameProduct,
        stock: formEdit.stock,          
        price: formEdit.price,
        description: formEdit.description, 
        code: formEdit.code              
    });
      setShowMessage({
        visible: true,
        message: 'Producto Actualizado Correctamente',
        color: '#109048',
      });
      setTimeout(() => {
        navigation.goBack(); 
      }, 2000);
    } catch (e) {
      console.error(e);
      setShowMessage({
        visible: true,
        message: 'Producto no se pudo Actualizar',
        color: '#FF0000',
      });
    }
  };

  // Función para eliminar el producto de la base de datos
  const handleDeleteProduct = async () => {
    const dbRef = ref(database, `products/${auth.currentUser?.uid}/${formEdit.id}`);
    try {
      await remove(dbRef);
      setShowMessage({
        visible: true,
        message: 'Producto Eliminado Correctamente',
        color: '#109048',
      });
      setTimeout(() => {
        navigation.goBack(); 
      }, 2000);
    } catch (e) {
      console.error(e);
      setShowMessage({
        visible: true,
        message: 'No se pudo Eliminar el Producto',
        color: '#FF0000',
      });
    }
  };

  return (
    <>
      <ScrollView style={styles.rootDetail}>
        <Text style={styles.bookListTitle} variant="bodyLarge">
          Detalles del Producto
        </Text>

        <View>
          <Text variant="bodyLarge">Nombre del Producto:</Text>
          <TextInput
            mode="outlined"
            value={formEdit.nameProduct}
            onChangeText={(value) => handleSetValues('nameProduct', value)}
            style={styles.input}
          />
          <Divider style={{ backgroundColor: '#000' }} />
        </View>

        <View>
          <Text variant="bodyLarge">Precio:</Text>
          <TextInput
            mode="outlined"
            keyboardType="numeric"
            value={formEdit.price.toString()}
            onChangeText={(value) => handleSetValues('price', Number(value))}
            style={styles.input}
          />
          <Divider style={{ backgroundColor: '#000' }} />
        </View>

        <View>
          <Text variant="bodyLarge">Stock:</Text>
          <TextInput
            mode="outlined"
            value={formEdit.stock !== undefined ? formEdit.stock.toString() : ''}
            onChangeText={(value) => handleSetValues('stock', Number(value))}
            style={styles.input}
          />
          <Divider style={{ backgroundColor: '#000' }} />
        </View>

        <View>
          <Text variant="bodyLarge">Descripción:</Text>
          <TextInput
            mode="outlined"
            value={formEdit.description}
            onChangeText={(value) => handleSetValues('description', value)}
            style={styles.input}
          />
          <Divider style={{ backgroundColor: '#000' }} />
        </View>

        <View>
          <Text variant="bodyLarge">Código:</Text>
          <TextInput
            mode="outlined"
            value={formEdit.code}
            onChangeText={(value) => handleSetValues('code', value)}
            style={styles.input}
          />
          <Divider style={{ backgroundColor: '#000' }} />
        </View>

        <View style={styles.buttonContainer}>
  <Button
    icon="gamepad"
    mode="contained"
    onPress={handleUpdateProduct}
    style={[styles.buttonEditProduct, { backgroundColor: '#4f63d2' }]}
  >
    Actualizar Producto
  </Button>
  <Button
    icon="delete"
    mode="contained"
    onPress={handleDeleteProduct}
    style={[styles.buttonEditProduct, { backgroundColor: '#FF0000' }]}
  >
    Eliminar Producto
  </Button>
</View>
      </ScrollView>
      <Snackbar
        visible={showMessage.visible}
        onDismiss={() => setShowMessage({ ...showMessage, visible: false })}
        style={{ ...styles.snackbarForm, backgroundColor: showMessage.color }}
      >
        {showMessage.message}
      </Snackbar>
    </>
  );
};

export default DetailProductScreen;
