import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { fetchData } from "../../services/api";
import ProductCard from "./ProductCard";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetchData(`/api/product?page=${page}&limit=20`);
      setProducts(response.products);
    };

    fetchProducts();
  }, []);

  return (
    <View style={styles.container}>
      {products
        .filter((product) => product.items.length > 0)
        .map((product) => (
          <ProductCard
            key={product.name}
            id={product._id}
            image={product.image}
            productName={product.name}
            price={Math.min(...product.items.map((item) => item.price))}
            style={{ minHeight: 250, width: "48%" }}
          />
        ))}
    </View>
  );
};

export default AllProducts;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
});