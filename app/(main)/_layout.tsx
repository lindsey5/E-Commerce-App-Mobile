import { Tabs } from "expo-router"
import { useColorScheme, View } from "react-native"
import { Colors } from "../../constants/Colors"
import { Ionicons } from "@expo/vector-icons"
import { useEffect, useState } from "react"
import { fetchData } from "../../services/api"
import CustomBadge from "../../components/Badge"

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light
  const [orders, setOrders] = useState<number>(0);

  useEffect(() => {
    const getOrdersAsync = async() => {
      const response = await fetchData('/api/order')
      setOrders(response.orders.length)
    }

    getOrdersAsync();
  }, [])

  return (<Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: theme.navBackground },
          tabBarActiveTintColor: theme.iconColorFocused,
          tabBarInactiveTintColor: theme.iconColor,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{ title: "Home", tabBarIcon: ({ focused }) => (
            <Ionicons 
              size={24} 
              name={focused ? 'home': 'home-outline'} 
              color={focused ? theme.iconColorFocused : theme.iconColor} 
            />
          )}}
        />
        <Tabs.Screen
          name="cart/index"
          options={{ title: "Cart", tabBarIcon: ({ focused }) => (
            <Ionicons 
              size={24} 
              name={focused ? 'cart': 'cart-outline'} 
              color={focused ? theme.iconColorFocused : theme.iconColor} 
            />
          )}}
        />
        <Tabs.Screen
          name="orders/index"
          options={{ title: "Orders", tabBarIcon: ({ focused }) => (
            <>
              {orders > 0 && <CustomBadge text={orders.toString()}/>}
              <Ionicons 
                size={24} 
                name={focused ? 'receipt': 'receipt-outline'} 
                color={focused ? theme.iconColorFocused : theme.iconColor} 
              />
            </>
          )}}
        />
        <Tabs.Screen
          name="notifications"
          options={{ title: "Notifications", tabBarIcon: ({ focused }) => (
            <Ionicons 
              size={24} 
              name={focused ? 'notifications': 'notifications-outline'} 
              color={focused ? theme.iconColorFocused : theme.iconColor} 
            />
          )}}
        />
        <Tabs.Screen
          name="profile/index"
          options={{ title: "Profile", tabBarIcon: ({ focused }) => (
            <Ionicons 
              size={24} 
              name={focused ? 'person': 'person-outline'} 
              color={focused ? theme.iconColorFocused : theme.iconColor} 
            />
          )}}
        />
      </Tabs>
  )
}