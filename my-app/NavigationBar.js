import React from 'react';
import { View, StyleSheet, Dimensions, Text, Button } from 'react-native';
import { HStack, Center, NativeBaseProvider, Spacer } from "native-base";


const NavigationBar = () => {
  return (
    
      <View style={styles.navigationBar}> 
      <HStack space={3} justifyContent="center" style={styles.buttonHStack}>
      
      <Button title="Umass" />
      <Spacer></Spacer>
      <View> 
      <HStack>
      <Button title="Today" />
        <Button title="Hot" />
        <Button title="New" />
      </HStack>
      </View>
      </HStack>
      </View>
    
  );
};


const styles = StyleSheet.create({
  navigationBar: {
    backgroundColor: 'lightblue',
    height: 90,
    width: Dimensions.get('window').width,
    zIndex: 100,
    position: 'absolute',
    top: 0,
  },
  buttonHStack: { 
    marginTop: 40, 
    paddingHorizontal: 15, 
    paddingBottom: 10
  }

});

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
          <NavigationBar />
      </Center>
    </NativeBaseProvider>
  );
};
