import { StyleSheet, Text } from "react-native";
import ThemedView from "../../components/ThemedView";

const Index = () => {

    return (
        <ThemedView style={styles.container}>
            <Text>Notifications</Text>
            
        </ThemedView>
    );
}

export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24
    },
    link: {
        marginVertical: 10,
        borderBottomWidth: 1
    }
});