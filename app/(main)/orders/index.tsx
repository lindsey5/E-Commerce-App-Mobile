import { useEffect, useMemo, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, StyleProp, ScrollView, Image } from "react-native"
import { fetchData } from "../../../services/api";
import CustomBadge from "../../../components/Badge";

interface TabButtonProps {
  style?: StyleProp<ViewStyle>; 
  badge: string;    
  isSelected: boolean;              
  label: string;                    
  onPress?: () => void;            
}

const TabButton: React.FC<TabButtonProps> = ({ style, isSelected, badge, label, onPress }) => {
  return (
    <TouchableOpacity 
      style={[
        style, 
        { 
          backgroundColor: isSelected ? '#9137db' : '#E0E0E0',
          padding: 10,
          borderRadius: 10,
          minWidth: 80
        }
      ]}
      onPress={onPress}
    >
        {badge && <CustomBadge text={badge} />}
        <Text style={{ color: isSelected ? 'white' : '#9137db', textAlign: 'center' }}>
            {label}
        </Text>
    </TouchableOpacity>
  );
};

const tabs = ["All", "Pending", "Confirmed", "Shipped", "Completed", "Cancelled"];

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState<string>('All');

    const filteredOrders = useMemo(() => {
        if(selectedStatus === 'All')
            return orders
        
        return orders.filter(order => order.status === selectedStatus)

    }, [selectedStatus, orders])

    useEffect(() => {
        const getOrdersAsync = async () => {
            const response = await fetchData('/api/order')
            setOrders(response.orders)
        }

        getOrdersAsync();
    }, [])

    return <View style={styles.container}>
        <View style={{backgroundColor: 'white', padding: 20, paddingTop: 20, paddingBottom: 10}}>
            <Text style={styles.title}>My Orders</Text>

            <ScrollView 
                horizontal 
                style={{ width: '100%', maxHeight: 80, marginTop: 30, paddingTop: 10 }} 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ alignItems: 'center' }} 
            >
            {tabs.map((label, index) => {
                const badge = label === 'All' ? orders.length  : orders.filter(order => order.status === label).length
                return <TabButton 
                    key={index}
                    badge={badge !== 0 ? badge.toString() : ''}
                    label={label}
                    isSelected={selectedStatus === label}
                    onPress={() => setSelectedStatus(label)}
                    style={{ marginRight: 10 }}
                />
            })}
            </ScrollView>
        </View>

        <ScrollView
            style={{ width: '100%', padding: 20}} 
            showsVerticalScrollIndicator={false}
        >
        {filteredOrders.map(order => <View key={order._id} style={styles.card}>
            <View style={{ flexDirection: 'row', gap: 20}}>
                <Image style={styles.image} source={{ uri: order.item.product.image }} resizeMode="cover"/>
            
                <View style={{flex: 1, flexDirection: 'column', gap: 5}}> 
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10}}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 5}}>{order.item.product.name}</Text>
                        <Text style={{backgroundColor: '#E0E0E0', padding: 7, borderRadius: 15}}>{order.status}</Text>
                    </View>
                    <Text>{order.item.color} | {order.item.size}</Text>
                    
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                        <Text>x{order.quantity}</Text>
                        <Text>₱{order.item.price}</Text>
                    </View>

                    <View style={{ alignItems: 'flex-end', marginTop: 20}}>
                        <Text style={{fontWeight: "bold", fontSize: 17}}>Total: ₱{order.totalPrice}</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity style={{ padding: 10, borderRadius: 10, marginTop: 20}}>
                <Text style={{ color: '#9137db', textDecorationLine: 'underline'}}>Order details</Text>
            </TouchableOpacity>
        </View>)}

        </ScrollView>
    </View>
}

export default Orders

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30
    },
    card: {
        padding: 20,
        backgroundColor: 'white',
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#c9c9c9',
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
    },
    image: {
        width: 60,
        height: 100
    }
});