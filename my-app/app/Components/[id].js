import { useLocalSearchParams, useRouter, Image } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const productDetail = () => {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState();
  const router = useRouter();

  /* Fetch product from back-end */
  const productDetail = async () => {
    const res = await axios
      .get(`http://192.168.0.9:5000/Api/products/${id}`, {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log(data);
    return data;
  };
  useEffect(() => {
    productDetail().then((data) => setProduct(data.product));
  }, [id]);

  return (
    <SafeAreaView>
      <Text>Product Detail Page!{id}</Text>
      <FlatList
        data={product}
        keyExtractor={id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.price}</Text>
          </View>
        )}
      />

      {/*  <View>
        <Image
          source={{
            uri: "http://10.0.2.2:5000/public/uploads/1708597929856_.png",
          }}
          style={{ height: 300, width: 300 }}
        />
      </View>

      <View className="flex-row justify-around">
        <Text className="text-1xl pt-2 mb-2">{product.name}</Text>
        <Text className=" text-1xl pt-2 mb-2">${product.price}</Text>
      </View> */}
      <Button
        title="Goback"
        onPress={() => router.navigate("/(tabs)/home/")}
      ></Button>
    </SafeAreaView>
  );
};

export default productDetail;
