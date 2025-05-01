import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons";
import CustomInput from "../CustomInput";

const Header = () => {

    return <View style={styles.header}>
        <CustomInput placeholder="Search" style={{ flex: 1, marginRight: 20 }}/>
        <TouchableOpacity>
            <Ionicons size={30} name={"cart-outline"} color={'#fff'} />
        </TouchableOpacity>
    </View>
}

export default Header

const styles = StyleSheet.create({
    header: {
        padding: 10,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#9137db',
        flexDirection: 'row',
        alignItems: 'center',
    }

});