import { View, Text, StyleSheet } from "react-native"

const Orders = () => {
    return <View>
        <Text>Orders</Text>
    </View>
}

export default Orders

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18
    }
});