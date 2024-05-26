import { useLocalSearchParams, useRouter} from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, Button, SafeAreaView,Image } from "react-native";
import axios from "axios";

const productDetail = () => {
  const { id } = useLocalSearchParams();
  const [detailProduct, setdetailProduct] = useState([]);
  const router = useRouter();
  /* Fetch single product from back-end */
  const singleProduct = async () => {
    const res = await axios.get(`http://192.168.0.9:5000/Api/products/${id}`,{
      withCredentials:true
  }).catch((err) => console.log(err));
    const data = await res.data;
    console.log(data);
    return data;
  };
  useEffect(() => {
    singleProduct().then((data) => setdetailProduct(data.product));
  }, [id]);
  /* it will display the file after the prduct is fetched from the back-end!!! */
  return (
    detailProduct&& (
      <SafeAreaView>
        <View>
          <Image
            source={{
              uri: "http://10.0.2.2:5000/public/uploads/1708190026909_.png",
            }}
            style={{ height: 300, width: 300 }}
          />
        </View>
        <View>
          <Text className="text-1xl pt-2 mb-2">{detailProduct?.name}</Text>
          <Text className=" text-1xl pt-2 mb-2">${detailProduct?.price}</Text>
        </View>
        <Button
          title="Goback"
          onPress={() => router.navigate("/(tabs)/home/")}
        ></Button>
      </SafeAreaView>
    )
  );
};

export default productDetail;
