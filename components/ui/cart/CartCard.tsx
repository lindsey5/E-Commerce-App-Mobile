import { View, StyleSheet, Image, Text, Pressable } from "react-native"
import { CartItem } from "../../../types/Cart"
import QuantityCounter from "../QuantityCounter"
import { useEffect, useState } from "react"
import { fetchData } from "../../../services/api"
import { useRouter } from "expo-router"

const CartCard = ({ item, updateItem } : { item : CartItem, updateItem: (value : string, value1: number) => void}) => {
    const [stock, setStock] = useState<number>();
    const [quantity, setQuantity] = useState<number>()
    const router = useRouter();

    useEffect(() => {
        const getItemAsync = async () => {
            const response = await fetchData(`/api/item/${item.id}`)
            setStock(response.item.stock)
            quantity > response.item.stock ? setQuantity(response.item.stock) : setQuantity(item.quantity)
        }
        
        getItemAsync()
    }, [item])

    const handleQuantity = (quantity : number) => {
        updateItem(item.id, quantity)
        setQuantity(item.quantity)
    }

    return <Pressable style={styles.card} onPress={() => router.push(`/product/${item.product_id}`)}>
       <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover"/>
       <View 
            style={{ 
                flex: 1, 
                height: '100%', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
            }}
        >
            <View> 
                <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 5}}>{item.name}</Text>
                <Text>{item.color} | {item.size}</Text>
            </View>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 18}}>₱{(item.price * item.quantity)}</Text>
                <QuantityCounter 
                    item={{ stock }}
                    quantity={quantity}
                    setQuantity={handleQuantity}
                />
            </View>
       </View>
    </Pressable>
}

export default CartCard

const styles = StyleSheet.create({
    card: {
        padding: 20,
        backgroundColor: 'white',
        width: '100%',
        height: 160,
        marginBottom: 10,
        flexDirection: 'row',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#c9c9c9',
        gap: 20,
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
    },
    image: {
        width: 80,
        height: "100%"
    }
});
