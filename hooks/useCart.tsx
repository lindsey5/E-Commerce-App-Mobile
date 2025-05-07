import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid, Platform, Alert, Linking } from "react-native";
import { CartItem } from "../types/Cart";
import { postData } from "../services/api";

const showAddedPrompt = () => {
    if (Platform.OS === 'android') {
      ToastAndroid.show("Added to cart!", ToastAndroid.SHORT);
    } else {
      Alert.alert("Added to cart!");
    }
  };

const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const getValue = async () => {
      const value = await AsyncStorage.getItem("cart");
      if (value) setCart(JSON.parse(value));
    };

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

  const checkout = async () => {
      try{
        const response = await postData('/api/payment',
          cart.map(item => ({ currency: "PHP", amount: item.price * 100, name: item.name,  quantity: item.quantity }))
        )
        
        Linking.openURL(response.checkout_url).catch(err => console.error("Failed to open URL:", err));
      }catch(err){
        console.error(err)
      }
  }

  return { cart, addToCart, updateItem, checkout };
};

export default useCart;
