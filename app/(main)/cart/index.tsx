import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from "react-native"
import useCart from "../../../hooks/useCart"
import CartCard from "../../../components/ui/cart/CartCard"
import ThemedText from "../../../components/ThemedText"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import ThemedButton from "../../../components/ThemedButton"

const Cart = () => {
    const { cart, checkout, updateItem } = useCart()
    const router = useRouter();

    return <View style={styles.container}>
        <View style={styles.header}>
            <View style={{display: 'flex', flexDirection: 'row', gap: 15, alignItems: 'center'}}> 
                <TouchableOpacity
                    style={{ marginBottom: 15}}
                    onPress={() => router.back()}
                >
                    <Ionicons size={25} name="arrow-back"/>
                </TouchableOpacity>
                <ThemedText title style={styles.title}>Shopping Cart</ThemedText>
            </View>
            <Text style={{ fontSize: 16 }}>{cart.length} items</Text>
        </View>
        <ScrollView style={{ paddingHorizontal: 5, paddingVertical: 15}} showsVerticalScrollIndicator={false}>
            {cart.length > 0 && cart.map((item) => <CartCard key={item.id} item={item} updateItem={updateItem} />)}
        </ScrollView>
        <View style={{ padding: 20, backgroundColor: 'white', borderTopWidth: 1, borderTopColor: '#9CA3AF'}}>
            <View style={{ 
                display: 'flex', 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                width: '100%', 
                alignItems: 'center',
                marginBottom: 15
            }}>
                <Text style={{ fontSize: 17}}>Total</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold'}}>₱{cart.reduce((total, item) => (item.price * item.quantity) + total, 0)}</Text>
            </View>
            <ThemedButton onPress={checkout} disabled={cart.length === 0}>
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 17}}>Check out</Text>
            </ThemedButton>
        </View>
    </View>
}

export default Cart

const styles = StyleSheet.create({
    container: { 
        flex: 1,
    },
    header: { 
        backgroundColor: 'white', 
        padding: 20,
        borderBottomWidth: 1, 
        borderColor: 'rgb(190, 190, 190)'
    },
    title: {
        fontSize: 25, 
        marginBottom: 20, 
        fontWeight: 'bold'
    }
})