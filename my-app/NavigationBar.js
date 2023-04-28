import React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Dimensions, Text, Button, Image, TouchableOpacity } from 'react-native';
import { HStack, Center, NativeBaseProvider, Spacer } from "native-base";

const NavigationBarChildComponent = ({ changeFilter, textLabel, isSelected, currentFilter, sortEvents }) => {
  const handleInput = () => {
    changeFilter(currentFilter === textLabel ? "none" : textLabel);
  };

  return (
    <TouchableOpacity
      style={[
        styles.filterButton,
        { backgroundColor: isSelected ? "#CBCBCB" : "#EAE9E9" },
      ]}
      onPress={handleInput}
    >
      <Text>{textLabel}</Text>
    </TouchableOpacity>
  );
};

const NavigationBar = ({ sortEvents }) => {
  const [filter, setFilter] = useState("none");

  const changeFilter = (filterName) => {
    setFilter(filterName);
    if (filterName === "📅 Today") {
      sortEvents("Today");
    } else if (filterName === "🔥 Hot") {
      sortEvents("Hot");
    } else if (filterName === "👋 New") {
      sortEvents("New");
    } else {
      sortEvents("none");
    }
  };

  return (
    <NativeBaseProvider>
      <View style={styles.navigationBar}>
        <HStack space={3} style={styles.buttonHStack}>
          {["📅 Today", "🔥 Hot", "👋 New"].map((item) => (
            <NavigationBarChildComponent
              key={item}
              changeFilter={changeFilter}
              textLabel={item}
              isSelected={filter === item}
              currentFilter={filter}
              sortEvents={sortEvents}
            />
          ))}
        </HStack>
      </View>
    </NativeBaseProvider>
  );
};


const styles = StyleSheet.create({
  navigationBar: {
    backgroundColor: '#EAE9E9',
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

export default NavigationBar; 