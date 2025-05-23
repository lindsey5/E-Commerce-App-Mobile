import { WebView } from 'react-native-webview';
import { View, StyleSheet, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import useSocket from '../../hooks/useSocket';
import { useEffect } from 'react';
import { deleteData, postData } from '../../services/api';

const WebViewScreen = () => {
  const { url } = useLocalSearchParams();
  const socket = useSocket();
  const router = useRouter();

  useEffect(() => {
    if(!socket) return
    socket.on("order-placed", async (data) => {
      const { user, address, items, paymentIntentId } = data
        for(const item of items){
          await postData('/api/order', {
            firstname: user.firstname,
            lastname: user.lastname,
            address: address.address,
            zip: address.zip,
            city: address.city,
            item: item.item_id,
            quantity: item.quantity,
            totalPrice: item.price * item.quantity,
            paymentIntentId
          })
          
          if(item?.id) await deleteData(`/api/cart/${item.id}`)
        }
        router.replace('/checkout/order-placed')
    });

    

  }, [socket]);

  if (!url) {
    return (
      <View style={styles.container}>
        <Text>No URL Provided</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView 
        source={{ uri: typeof url === 'string' ? url : url[0] }} 
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WebViewScreen;