import { View, Text, StyleSheet } from "react-native"

const Profile = () => {
    return <View>
        <Text>Profile</Text>
    </View>
}

export default  Profile

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