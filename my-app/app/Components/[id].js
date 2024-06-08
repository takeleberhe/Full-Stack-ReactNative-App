import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const productDetail = () => {
  const { id } = useLocalSearchParams();
  const [detailProduct, setdetailProduct] = useState([]);
  const router = useRouter();
  /* Fetch single product From API*/
  const singleProduct = async () => {
    const res = await axios
      .get(`http://10.0.2.2:5000/Api/products/${id}`, {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log(data);
    return data;
  };
  useEffect(() => {
    singleProduct().then((data) => setdetailProduct(data.product));
  }, [id]);

  return (
    detailProduct && (
      <SafeAreaView>
        <TouchableOpacity
          className="p-4 mt-3"
          onPress={() => router.push("/(tabs)/home/")}
        >
          <Ionicons name="arrow-back-outline" size={30} color="black" />
        </TouchableOpacity>
        {/* I am using static image b/c it is not possible to fetch dynamic 
          image from localhost using source={{uri:detailProduct.image}} in React Native*/}
        <View>
          <Image
            source={{
              uri: "http://10.0.2.2:5000/public/uploads/1708597929856_.png",
            }}
            style={{ height: 300, width: 300 }}
          />
        </View>
        <View className="flex-row justify-around mb-10 mt-10">
          <Text className="text-1xl pt-2 mb-2">{detailProduct?.name}</Text>
          <Text className=" text-1xl pt-2 mb-2">${detailProduct?.price}</Text>
        </View>
      </SafeAreaView>
    )
  );
};

export default productDetail;
