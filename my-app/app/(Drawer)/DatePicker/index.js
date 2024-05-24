import React, { useEffect, useState } from "react";
import { View, Button, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Link } from "expo-router";

const datePickerFunc = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState();
  console.log(date);

  const onChange = (e, selectedDate) => {
    setDate(selectedDate);
    setShow(false);
  };

  const showMode = (modeToShow) => {
    setShow(true);
    setMode(modeToShow);
  };
  return (
    <View>
      <Button title="Show Date Picker" onPress={() => showMode("date")} />
      <Button title="Show Time Picker" onPress={() => showMode("time")} />
      {show && (
        <DateTimePicker
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        ></DateTimePicker>
      )}
      <Text>{date.toLocaleString()}</Text>
      <Link href={"/(tabs)/home/"} asChild>
        <Button title="GoBack" />
      </Link>
      <StatusBar style="auto" />
    </View>
  );
};

export default datePickerFunc;
