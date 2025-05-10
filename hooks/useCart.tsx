import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid, Platform, Alert, Linking } from "react-native";
import { CartItem } from "../types/Cart";
import { postData } from "../services/api";
import { getToken } from "../services/auth";
import { useRouter } from "expo-router";

const showAddedPrompt = () => {
    if (Platform.OS === 'android') {
      ToastAndroid.show("Added to cart!", ToastAndroid.SHORT);
    } else {
      Alert.alert("Added to cart!");
    }
  };

const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getValue = async () => {
      const value = await AsyncStorage.getItem("cart");
      if (value) setCart(JSON.parse(value));
    }

    getValue();
  }, []);

  const addToCart = async (newItem: CartItem) => {
    const updatedCart = cart.some((item) => item.id === newItem.id)
      ? cart.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        )
      : [...cart, newItem];

    setCart(updatedCart);

    await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
    showAddedPrompt();
  };

  const updateItem = async (id : string, newQuantity : number) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: newQuantity }
        : item
    )

    setCart(updatedCart);
    await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  const removeItem = async (id) => {
    Alert.alert(
      "Confirm Removal",
      "Are you sure you want to remove this item?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            const updatedCart = cart.filter((item) => item.id != id)

            setCart(updatedCart);
            await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
          },
        },
      ],
      { cancelable: true }
    );
  }

  const checkout = async (items) => {
    const value = await getToken();

    if(value){
      await AsyncStorage.setItem("checkout-items", JSON.stringify(items));
      router.push('checkout');
    }else{
      router.push('login')
    }
  }

  return { cart, addToCart, updateItem, checkout, removeItem };
};

export default useCart;
