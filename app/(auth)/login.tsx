import { ImageBackground, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Spacer from "../../components/Spacer";
import { Colors } from "../../constants/Colors";
import ThemedButton from "../../components/ThemedButton";
import ThemedText from "../../components/ThemedText";
import CustomInput from "../../components/CustomInput";
import { useRouter } from "expo-router";

const Login = () => {
    const router = useRouter();

    const handleSubmit = () => {
        console.log('Login successful')
    }

    return (
        <ImageBackground
            style={styles.container}
            source={require('../../assets/img/purple-bg.webp')}
            resizeMode="cover"

        >
            <ThemedText title={true} style={styles.title}>Login</ThemedText>
            <Spacer height={50}/>
            <CustomInput placeholder={"Email"} style={{ height: 60 }}/>
            <Spacer />
            <CustomInput placeholder={"Password"} style={{ height: 60 }} secureTextEntry={true}/>
            <Spacer height={30}/>
            <Pressable style={styles.forgotPasswordContainer}>
                <Text style={{borderBottomWidth: 1, borderColor: '#9137db', color: '#9137db'}}>Forgot Password?</Text>
            </Pressable>
            <Spacer />
            <ThemedButton onPress={handleSubmit}>
                <Text style={{ textAlign: "center", color: '#f2f2f2', fontWeight: 'bold', fontSize: 18 }}>Login</Text>
            </ThemedButton>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 30, gap: 5, alignItems: 'center'}}>
                <Text>Don't have an account?</Text>
                <TouchableOpacity onPress={() => router.push('signup')}>
                    <Text 
                        style={{
                            textAlign: 'center', 
                            color: '#9137db',
                            fontWeight: 'bold',
                            fontSize: 17
                        }}
                    >Sign up</Text>
                </TouchableOpacity>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 30, gap: 5, alignItems: 'center'}}>
                <Text>Go back to</Text>
                <TouchableOpacity onPress={() => router.push('/')}>
                    <Text 
                        style={{
                            textAlign: 'center', 
                            color: '#9137db',
                            fontWeight: 'bold',
                            fontSize: 17
                        }}
                    >Home</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 36,
        color: '#9137db'
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
        flexDirection: 'row', 
        justifyContent: 'flex-end',
        paddingRight: 10, 
    },
});