import React, {
  useContext,
  useCallback,
  memo,
} from "react";
import { View } from "react-native";
import { Stack } from "expo-router";
import ProductList from "../../../Components/ProductList";
import AuthContext from "../../../../Context/AuthContext/AuthContext";
import SearchBar from "../../../Components/SearchBar";
import { isEqual } from "lodash";
//const SearchBar = lazy(() => import("../../../Components/SearchBar"));

const Homepage = () => {
  const {
    state: { product },
    searchstate: { searchQuery },
  } = useContext(AuthContext);

  /* performance optimazation using useCallback hook */
  const memoizedProducts = useCallback(() => {
    let filteredProducts = product;
    if (searchQuery) {
      filteredProducts = filteredProducts.filter((prod) => {
        return prod.name.toLowerCase().includes(searchQuery);
      });
    }
    return filteredProducts;
  }, [product]);

  return (
    <View className="flex-1 items-center">
      {/* custom Search component */}
      <Stack.Screen
        options={{
          header: () =><SearchBar />
        }}
      ></Stack.Screen>
      {/* product list custom component */}
      <ProductList data={memoizedProducts} />
    </View>
  );
};

export default memo(Homepage, isEqual);
