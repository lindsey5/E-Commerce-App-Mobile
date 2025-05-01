import { TextInput, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { TextInputProps } from "react-native-paper";

interface CustomInputProps extends TextInputProps{
    placeholder: string,
    style?: StyleProp<ViewStyle>
}

const CustomInput = ({ placeholder, style, ...props} : CustomInputProps) => {
    return <TextInput
        style={[styles.input, style]}
        placeholder={placeholder}
        {...props}
    />
}

export default CustomInput

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 8,
        backgroundColor: '#fff',
        fontSize: 15
      },
});