import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Text, View, StyleSheet, Pressable, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { fetchData, postData } from '../../services/api';
import ImageViewer from 'react-native-image-zoom-viewer';
import ThemedText from '../../components/ThemedText';
import Chip from '../../components/Chip';
import { Ionicons } from '@expo/vector-icons';
import ThemedButton from '../../components/ThemedButton';

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>();
  const [selectedColor, setSelectedColor] = useState<string>();
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getData = async () => {
      const response = await fetchData(`/api/product/${id}`);
      if (response.success) {
        setProduct(response.product);
        setItem(response.product.items.sort((a, b) => a.price - b.price)[0])
      }
    };

    if (id) {
      getData();
    }
  }, [id]);

  useEffect(() => {
    const setData = () => {
      if(product){
        setQuantity(1)
        if(selectedColor && selectedSize){
          setItem(product?.items.find(item => item.size === selectedSize && item.color === selectedColor))
        }else{
          setItem(product.items.sort((a, b) => a.price - b.price)[0])
        }
      }
    }

    setData()

  }, [selectedColor, selectedSize])

  const checkout = async () => {
    try{
      const response = await postData('/api/payment',
        [{ currency: "PHP", amount: item.price * 100, name: product.name,  quantity }]
      )
      
      Linking.openURL(response.checkout_url).catch(err => console.error("Failed to open URL:", err));
    }catch(err){
      console.error(err)
    }
  }


  if (!product) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={styles.container}>
      <Pressable
      style={{ position: 'absolute', left: 5, top: 5, zIndex: 5 }}
      onPress={() => router.back()}
    >
      <Ionicons size={30} name="arrow-back" />
    </Pressable>
      <Pressable style={{ borderBottomWidth: 1, borderBottomColor: '#e0e0e0'}}onPress={() => setShowImage(true)}>
        <Image style={styles.productImage} source={{ uri: product.image }} resizeMode='contain'/>
      </Pressable>

      {showImage && (
        <View style={styles.imageViewerWrapper}>
          <Pressable onPress={() => setShowImage(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </Pressable>
          <ImageViewer style={{width: '100%', height: '100%'}} imageUrls={[{ url: product.image }]} />
        </View>
      )}

      <View style={{ padding: 20}}>
        <ThemedText 
            title
            style={styles.productName}
        >
          {product.name}
        </ThemedText>
        <Text style={{ marginTop: 10, fontSize: 20}}>
        ₱{item?.price}
        </Text>
      </View>
      <ScrollView
        style={{
          marginTop: 10,
          paddingHorizontal: 20,
        }}
      >
        <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Text>Sizes</Text>
          <View style={styles.chipContainer}>
            {[...new Set(product.items.map(item => item.size))].map((item, index) => (
              <Chip 
                key={`size-${index}`} 
                label={item.toString()} 
                isSelected={selectedSize === item}
                onClick={() => setSelectedSize(prev => prev === item ? '' : item.toString())}
              />
            ))}
          </View>

          <Text>Colors</Text>
          <View style={styles.chipContainer}>
            {[...new Set(product.items.map(item => item.color))].map((item, index) => (
              <Chip 
                key={`color-${index}`} label={item.toString()} 
                isSelected={selectedColor === item}
                onClick={() => setSelectedColor(prev => prev === item ? '' : item.toString())}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={{
        position: 'absolute', 
        bottom: 0,
        width: '100%',
        paddingHorizontal: 10,
        paddingBottom: 20,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0'
      }}>
        <View style={{ marginBottom: 10, paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>Quantity</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center'}}>
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity 
              onPress={() => setQuantity(quantity - 1)}
                style={[{ borderWidth: 1, borderColor: '#bdbdbd'}, 
                quantity === 1 && { opacity: 0.5}]}
                disabled={quantity === 1}
              >
                <Ionicons size={25} name={"remove"} color={quantity === 1 && "#e0e0e0"}/>
              </TouchableOpacity>

              <View style={{ width: 30}}>
                <Text style={{ textAlign: 'center'}}>{quantity}</Text>
              </View>
              
              <TouchableOpacity 
                onPress={() => setQuantity(quantity + 1)}
                style={[{ borderWidth: 1, borderColor: '#bdbdbd'}, 
                  quantity === item.stock && { opacity: 0.5}]}
                disabled={quantity === item.stock}
              >
                <Ionicons size={25} name={"add"} color={quantity === item.stock && "#e0e0e0"}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ 
          justifyContent: 'space-between',
          flexDirection: 'row',
          gap: 10,
          }}>
            <ThemedButton style={{ backgroundColor: '#e0e0e0', flex: 1}} disabled={!selectedColor || !selectedSize || item.stock === 0}>
              <Text style={{ textAlign: 'center' }}>Add to cart</Text>
            </ThemedButton>
            <ThemedButton style={{ flex: 1, justifyContent: 'center'}} disabled={!selectedColor || !selectedSize || item.stock === 0}>
              <Text style={{ textAlign: 'center', color: 'white'}} onPress={checkout}>Buy now</Text>
            </ThemedButton>

        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  imageViewerWrapper: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 2,
  },
  closeButtonText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#969696',
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  chipContainer:{
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    rowGap: 5, 
    columnGap: 5
  }
});
