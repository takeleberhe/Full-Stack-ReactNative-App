import { useRouter } from "expo-router";
import { memo } from "react";
import { isEqual } from "lodash";
import {
  View,
  Text,
  FlatList,
  Image,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from "react-native";

const ProductList = ({ data }) => {
  const router = useRouter();
  const renderItem = ({ item, index }) => {
    return (
      <SafeAreaView
        className="flex-col w-86 gap-x-5 rounded-lg 
      shadow-lg p-15 pb-5 overflow-auto bg-white mb-5"
      >
        <TouchableOpacity
          onPress={() => router.push(`/Components/${item._id}`)}
          className="m-5"
        >
          {/* I am using Static image b/c it is not possible to fetch daynamic image from localhost
                in React Native this is only for testing purpose! */}
          <Image
            source={{
              uri: "http://10.0.2.2:5000/public/uploads/1708597929856_.png",
            }}
            className="w-[300px] h-[300px]"
          />
        </TouchableOpacity>
        <View className="flex-row justify-around">
          <Text className="text-1xl pt-2 mb-2">{item.name}</Text>
          <Text className=" text-1xl pt-2 mb-2">${item.price}</Text>
        </View>
      </SafeAreaView>
    );
  };
  return (
    <TouchableOpacity>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </TouchableOpacity>
  );
};
export default memo(ProductList, isEqual);
