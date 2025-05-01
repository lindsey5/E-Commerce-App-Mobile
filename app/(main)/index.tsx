import { ScrollView, StyleSheet} from "react-native";
import ThemedView from "../../components/ThemedView";
import Header from "../../components/partials/header";
import AllProducts from "../../components/products/AllProducts";

const Index = () => {

    return (
        <ThemedView style={styles.container}>
            <Header />
            <ScrollView  
                style={{flexGrow: 1, padding: 3,}}
                showsVerticalScrollIndicator={false}
            >
                <AllProducts />
            </ScrollView>
        </ThemedView>
    );
}

export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 70,
        paddingHorizontal: 20
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