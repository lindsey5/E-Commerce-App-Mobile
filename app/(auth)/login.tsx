import { ImageBackground, Pressable, StyleSheet, Text, TextInput } from "react-native";
import Spacer from "../../components/Spacer";
import { Colors } from "../../constants/Colors";
import ThemedButton from "../../components/ThemedButton";
import ThemedText from "../../components/ThemedText";
import CustomInput from "../../components/CustomInput";

const Login = () => {
    const handleSubmit = () => {
        console.log('Login successful')
    }

    return (
        <ImageBackground
            source={require('../../assets/img/purple-fluid-background_53876-99561.png')}
            style={styles.container}
            resizeMode="cover" 
        >
            <ThemedText title={true} style={styles.title}>Login</ThemedText>
            <Spacer height={50}/>
            <CustomInput placeholder={"Email"} style={{ width: '90%', height: 60 }}/>
            <Spacer />
            <CustomInput placeholder={"Password"} style={{ width: '90%', height: 60 }} secureTextEntry={true}/>
            <Spacer height={30}/>
            <Pressable style={styles.forgotPasswordContainer}>
                <Text style={{borderBottomWidth: 1}}>Forgot Password?</Text>
            </Pressable>
            <Spacer />
            <ThemedButton style={{ width: '90%'} } onPress={handleSubmit}>
                <Text style={{ textAlign: "center", color: '#f2f2f2', fontWeight: 'bold', fontSize: 18 }}>Login</Text>
            </ThemedButton>

        </ImageBackground>
    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 36
    },
    btn: {
        backgroundColor: Colors.primary,
        padding: 15,
        borderRadius: 5,
      },
      pressed: {
        opacity: 0.8
    },
    forgotPasswordContainer: {
        width: '90%',
        flexDirection: 'row', 
        justifyContent: 'flex-end',
        paddingRight: 10, 
    },
});