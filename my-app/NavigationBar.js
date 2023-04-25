import React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Dimensions, Text, Button, Image, TouchableOpacity } from 'react-native';
import { HStack, Center, NativeBaseProvider, Spacer } from "native-base";

const NavigationBarChildComponent = ({ changeFilter, textLabel, currentFilter }) => {
  const isSelected = currentFilter === textLabel;

  const handleInput = () => {
    changeFilter(isSelected ? "none" : textLabel);
  };

  return (
    <TouchableOpacity
      style={[
        styles.filterButton,
        { backgroundColor: isSelected ? "#CBCBCB" : "#F4F4F4" },
      ]}
      onPress={handleInput}
    >
      <Text>{textLabel}</Text>
    </TouchableOpacity>
  );
};

const NavigationBar = () => {
  const [filter, setFilter] = useState("none");

  const changeFilter = (filterName) => {
    setFilter((prevFilter) => (prevFilter === filterName ? "none" : filterName));
  };

  return (
    <View style={styles.navigationBar}>
      <HStack space={3} style={styles.buttonHStack}>
        {["📅 Today", "🔥 Hot", "👋 New"].map((item) => (
          <NavigationBarChildComponent
            key={item}
            changeFilter={changeFilter}
            textLabel={item}
            currentFilter={filter}
          />
        ))}
      </HStack>
    </View>
  );
};


const styles = StyleSheet.create({
  navigationBar: {
    backgroundColor: '#F4F4F4',
    height: 100,
    width: Dimensions.get('window').width,
    zIndex: 100,
    borderRadius: 25,
  },
  buttonHStack: {
    marginTop: 60,
    justifyContent: 'center', 
  },
  filterButton: {
    color: 'black',
    fontWeight: 100,
    borderRadius: 20,
    paddingHorizontal: 20, 
    paddingVertical: 7
  }
});

export default () => {
  return (
    <NativeBaseProvider>
        <NavigationBar />
    </NativeBaseProvider>
  );
};
