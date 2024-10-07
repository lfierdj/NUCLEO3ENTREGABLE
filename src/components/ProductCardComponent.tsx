import React from 'react'
import { View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { styles } from '../theme/styles'
import { Product } from '../screens/HomeScreen'
import { CommonActions, useNavigation } from '@react-navigation/native'

interface Props {
    product: Product;
}
export const ProductCardComponent = ({product}: Props) => {
    const navigation = useNavigation();

    return (
        <View style={styles.rootListProduct}>
            <View>
                <Text variant='labelLarge'>Nombre: {product.nameProduct}</Text>
                <Text variant='bodyMedium'>Precio: {product.price}</Text>
                <Text variant='bodyMedium'>Stock: {product.stock}</Text>
                <Text variant='bodyMedium'>Descripción: {product.description}</Text>
                <Text variant='bodyMedium'>Código: {product.code}</Text>
            </View>
            <View style={styles.Icon}>
                <IconButton
                    icon='cart-plus'
                    size={25}
                    mode='contained'
                    onPress={() => navigation.dispatch(CommonActions.navigate({name: 'Detail', params:{product}}))}
                />
            </View>
        </View>
    )
}
