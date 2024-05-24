import React, { useState } from "react";
import { useRouter } from "expo-router";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const router = useRouter();
  /* handle login Function */
  const handleLogin = async () => {
    const user = {
      email: email,
      password: password,
    };

    try {
      await axios
        .post("http://192.168.0.152:5000/Api/login", user)
        .then((response) => {
          console.log(response);
          Alert.alert("you have loged in successfully");
          setEmail(""), setPassword("");
        })
        .catch((error) => {
          Alert.alert("login failed try again pleace!");
          console.log("login error", error.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView className="flex-1">
        {/* Login start  */}

        <View style={styles.container}>
          <KeyboardAvoidingView>
            <View>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "bold",
                  marginTop: 12,
                  color: "#041E42",
                  textAlign: "center",
                }}
              >
                Sign In
              </Text>
            </View>

            <View style={{ marginTop: 70 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  backgroundColor: "#D0D0D0",
                  paddingVertical: 5,
                  borderRadius: 5,
                  marginTop: 5,
                }}
              >
                <MaterialIcons
                  style={{ marginLeft: 8 }}
                  name="email"
                  size={24}
                  color="gray"
                />
                <TextInput
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  style={{
                    color: "gray",
                    marginVertical: 10,
                    width: 300,
                    fontSize: email ? 16 : 16,
                  }}
                  placeholder="enter your email"
                />
              </View>
            </View>
            <View style={{ marginTop: 30 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  backgroundColor: "#D0D0D0",
                  paddingVertical: 5,
                  borderRadius: 5,
                  marginTop: 5,
                }}
              >
                <AntDesign
                  style={{ marginLeft: 8 }}
                  name="lock"
                  size={24}
                  color="gray"
                />
                <TextInput
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry={true}
                  style={{
                    color: "gray",
                    marginVertical: 10,
                    width: 300,
                    fontSize: password ? 16 : 16,
                  }}
                  placeholder="enter your password"
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <Text>Keep me logged in </Text>
              <Text style={{ color: "#007fff", fontWeight: "500" }}>
                Forget password?{" "}
              </Text>
            </View>
            <View style={{ marginTop: 70 }} />
            <Pressable
              onPress={handleLogin}
              onPressIn={() => router.push("/home")}
              style={{
                width: 200,
                backgroundColor: "#FEBE10",
                borderRadius: 6,
                marginLeft: "auto",
                marginRight: "auto",
                padding: 15,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Login
              </Text>
            </Pressable>
            <Pressable
              onPress={() => router.push("/profile/register")}
              style={{ marginTop: 15 }}
            >
              <Text
                style={{ textAlign: "center", color: "gray", fontSize: 16 }}
              >
                Don't have an acount?Sign Up
              </Text>
            </Pressable>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
export default login;
