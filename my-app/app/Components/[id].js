import { useLocalSearchParams, useRouter, Image } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const productDetail = () => {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState();
  const router = useRouter();

  /* Fetch product from back-end */
  const productDetail = async () => {
    const res = await axios
      .get(`http://localhost:5000/Api/products/${id}`, {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    productDetail().then((data) => setProduct(data.product));
  }, [id]);

  return (
    <SafeAreaView>
      <Text>Product Detail Page!{id}</Text>
      <View>
        {/* diplay image of product here */}
        <Image
          source={{
            uri: "http://10.0.2.2:5000/public/uploads/1708597929856_.png",
          }}
          style={{ height: 300, width: 300 }}
        />
      </View>
      {/* display details of the product here name,price*/}
      <View className="flex-row justify-around">
        <Text className="text-1xl pt-2 mb-2">{product.name}</Text>
        <Text className=" text-1xl pt-2 mb-2">${product.price}</Text>
      </View>
      <Button
        title="Goback"
        onPress={() => router.navigate("/(tabs)/home/")}
      ></Button>
    </SafeAreaView>
  );
};

export default productDetail;
