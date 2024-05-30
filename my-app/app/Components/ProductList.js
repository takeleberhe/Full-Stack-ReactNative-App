import { useRouter } from "expo-router";
import { memo } from "react";
import { isEqual } from "lodash";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from "react-native";

const ProductList = ({ data }) => {
  const router = useRouter();
  const renderItem = ({ item, index }) => {
    return (
      <SafeAreaView style={styles.listContainer}>
        <TouchableOpacity
          onPress={() => router.push(`/Components/${item._id}`)}
        >
          <View style={styles.imageContainer}>
            {/* using Static image b/c it is not possible to fetch daynamic image from local host
                in React Native this is only for testing purpose! */}
            <Image
              source={{
                uri: "http://10.0.2.2:5000/public/uploads/1708597929856_.png",
              }}
              style={{ height: 300, width: 300 }}
            />
          </View>
          <View className="flex-row justify-around">
            <Text className="text-1xl pt-2 mb-2">{item.name}</Text>
            <Text className=" text-1xl pt-2 mb-2">${item.price}</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };
  return (
    <TouchableOpacity style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data()}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </TouchableOpacity>
  );
};

export default memo(ProductList, isEqual);
const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  listContainer: {
    flex: 1,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 20,
  },
  imageContainer: {
    margin: 15,
    borderRadius: 10,
  },
  image: {
    width: 300,
    height: 300,
  },
});
