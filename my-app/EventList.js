import React from 'react';
import { View, Text, StyleSheet, FlatList, Button, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react'
import { HStack, VStack, NativeBaseProvider, Spacer } from 'native-base';
import Popover from 'react-native-popover-view';
function AttendingEventButton() {
  const [attendingEvent, setAttendingEvent] = useState(false);
  const handleButtonPress = () => {
    setAttendingEvent(!attendingEvent);
  };

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: attendingEvent ? '#A1E1A8' : '#CBCBCB' }]}
      onPress={handleButtonPress}
    >
      <HStack>
        <Text style={styles.buttonText}>{attendingEvent ? 'Attending  ' : 'I want to attend'}</Text>
        <Image source={require('./assets/images/check.png')} style={styles.checkLogo} />
      </HStack>
    </TouchableOpacity>
  )
}

const EventList = ({ events }) => {
  const renderItem = ({ item }) => (
    <NativeBaseProvider>
      <View style={styles.backgroundView}>
        <Popover
          from={(
            <TouchableOpacity>
              <Image source={require('./assets/images/Neon.jpg')} style={styles.imageView} />
            </TouchableOpacity>
          )}>
              <Image source={require('./assets/images/Neon.jpg')} style={{width: 350, height: 550}}/>
        </Popover>
        <HStack>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <Spacer></Spacer>
          <VStack space={1} alignItems="flex-end">
            <Text style={styles.eventCompany}>{item.company}</Text>
            <Text style={styles.eventAddress}>{item.address}</Text>
            <Text style={styles.eventDate}>{item.date}</Text>
            <Text style={styles.eventAttending}>{"🔥" + item.attending} </Text>
          </VStack>
        </HStack>
        <AttendingEventButton />
      </View>
    </NativeBaseProvider>
  );

  return (
    <FlatList
      data={events}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
    />
  );
};

const styles = StyleSheet.create({
  imageView: {
    width: "100%",
    height: "70%",
    marginBottom: 10,
    borderRadius: 7
  },
  bigImageView: { 
    width: "100%",
    height: "100%",
    marginBottom: 10,
    borderRadius: 7
  }, 
  button: {
    padding: 10,
    borderRadius: 10,
    marginTop: 10
  },
  buttonText: {
    textAlign: 'center'
  },
  backgroundView: {
    padding: 25,
    borderBottomWidth: 1,
    borderColor: '#F4F4F4',
    backgroundColor: '#F4F4F4',
    margin: 15,
    marginBottom: 0,
    borderRadius: 25,
    height: 450
  },
  eventTitle: {
    fontWeight: 'semibold',
    fontSize: 30,
    flexWrap: 'wrap',
    width: 150
  },
  eventCompany: {
    fontSize: 14,
    color: '#666',
  },
  eventAddress: {
    fontSize: 12,
    color: '#999',
  },
  eventDate: {
    fontSize: 12,
    color: '#999',
  },
  eventAttending: {
    fontSize: 12,
    color: '#999',
  },
  checkLogo: {
    height: 15,
    width: 15
  }
});

export default EventList;
