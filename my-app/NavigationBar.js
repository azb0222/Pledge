import React from 'react';
import { View, StyleSheet, Dimensions, Text, Button } from 'react-native';
import { HStack } from 'native-base';
import {Center} from 'native-base'; 

const NavigationBar = () => {
  return (
    <HStack space={3} justifyContent="center" style={styles.navigationBar}>
      <Center h="40" w="20" bg="primary.300" rounded="md" shadow={3} />
      <Center h="40" w="20" bg="primary.500" rounded="md" shadow={3} />
      <Center h="40" w="20" bg="primary.700" rounded="md" shadow={3} />
      <Text> Umass </Text>
  
      <Button title="Today" />
      <Button title="Hot" />
      <Button title="New" />
      <Text>  Umass </Text>
    </HStack>
  );
};


const styles = StyleSheet.create({
  navigationBar: {
    backgroundColor: 'gray',
    height: 90,
    width: Dimensions.get('window').width,
    zIndex: 100,
    position: 'absolute',
    top: 0,
  },
});

export default NavigationBar;