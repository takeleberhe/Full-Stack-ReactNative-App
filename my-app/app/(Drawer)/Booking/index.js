import React, { useEffect, useState,useMemo,memo,useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
  TextInput,
  ScrollView,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const calanderPicker = () => {
  const router = useRouter();
  const [timeList, setTimeList] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [not, setNote] = useState();
  /* Create Get time Function */
  const getTime = () => {
    const timeList = [];
    for (i = 8; i <= 12; i++) {
      timeList.push({
        time: i + ":00 AM",
      });
    }
    for (i = 1; i <= 7; i++) {
      timeList.push({
        time: i + ":00 PM",
      });
    }
    setTimeList(timeList);
  };
  useEffect(() => {
    getTime();
  }, []);
  /* performance optimazation using useMemo */

   /* const memoizedProducts=useMemo(()=>{
    const getTime = () => {
      const timeList = [];
      for (i = 8; i <= 12; i++) {
        timeList.push({
          time: i + ":00 AM",
        });
      }
      for (i = 1; i <= 7; i++) {
        timeList.push({
          time: i + ":00 PM",
        });
      }
      setTimeList(timeList);
    };
    useEffect(() => {
      getTime();
    }, []);
   },[selectedTime]) */

  return (
    <ScrollView>
      <TouchableOpacity
        className="p-2 mt-5"
        onPress={() => router.push("/(tabs)/home/")}
      >
        <Ionicons name="arrow-back-outline" size={30} color="black" />
      </TouchableOpacity>
      <Text className="mt-5 ml-3 mb-2 text-2xl">Select Date</Text>
      <View style={styles.calanderContainer}>
        <CalendarPicker
          onDateChange={selectedDate}
          width={400}
          minDate={Date.now()}
          todayBackgroundColor="orange"
          selectedDayColor="green"
          selectedDayTextColor="white"
        />
      </View>
      {/* time Select View */}
      <View>
        <Text className="mt-5 mb-2 ml-3 text-2xl">Select Time Slot</Text>
        <FlatList
          data={timeList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              className="mr-4"
              onPress={() => setSelectedTime(item.time)}
            >
              <Text
                style={[
                  selectedTime == item.time
                    ? styles.selectedTime
                    : styles.unSelectedTime,
                ]}
              >
                {item.time}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      {/* Note Section */}
      <View>
        <Text className="mt-5 ml-3 mb-2 text-2xl">
          Any comment and Suggestion
        </Text>
        <KeyboardAvoidingView>
          <TextInput
            placeholder="Write Comment"
            onChangeText={(text) => setNote(text)}
            style={styles.notetextArea}
            numberOfLines={5}
            multiline={true}
          />
        </KeyboardAvoidingView>
      </View>
      {/* confirmation Button */}
      <TouchableOpacity className="mt-2">
        <Text style={styles.confirmBtn}>Confirm &Book</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  calanderContainer: {
    backgroundColor: "purple",
    padding: 20,
    borderRadius: 10,
    margin: 15,
  },
  selectedTime: {
    padding: 10,
    borderWidth: 1,
    borderColor: "purple",
    borderRadius: 99,
    paddingHorizontal: 15,
    backgroundColor: "green",
    color: "white",
  },
  unSelectedTime: {
    padding: 10,
    borderWidth: 1,
    borderColor: "purple",
    borderRadius: 99,
    paddingHorizontal: 15,
    color: "green",
  },
  notetextArea: {
    borderwidth: 2,
    borderRadius: 10,
    textAlignVertical: "top",
    padding: 20,
    fontSize: 16,
    fontFamily: "sans-serif",
    borderColor: "green",
    backgroundColor: "gray",
    margin: 10,
  },
  confirmBtn: {
    textAlign: "center",
    fontFamily: "sans-serif",
    fontSize: 17,
    backgroundColor: "green",
    color: "white",
    margin: 10,
    padding: 11,
    borderRadius: 99,
    elevation: 2,
  },
});
export default calanderPicker;
