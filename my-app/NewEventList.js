import React from 'react';
import { View, Text, StyleSheet, FlatList, Button, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react'


function AttendingEventButton() { 
  const [attendingEvent, setAttendingEvent] = useState(false);

  const handleButtonPress = () => {
    setAttendingEvent(!attendingEvent);
  };

  return (
    <TouchableOpacity
    style={[styles.button, { backgroundColor: attendingEvent ? 'green' : 'red' }]}
    onPress={handleButtonPress}
  >
    <Text style={styles.text}>{attendingEvent ? 'ON' : 'OFF'}</Text>
  </TouchableOpacity>
  )
}


const NewEventList = ({ events }) => {
  const [attendingEvent, setAttendingEvent] = useState(false);

  const handleButtonPress = () => {
    setAttendingEvent(!attendingEvent);
  };

  const renderItem = ({ item }) => (
    <View style={styles.backgroundView}>
     <Image source={require('./assets/images/Neon.jpg')} style={styles.imageView} />
  
      <Text> {item.title} </Text>
      <Text> {item.company} </Text>
      <Text> {item.address} </Text>
      <Text> {item.date} </Text>
      <Text> {item.attending} </Text>
      <AttendingEventButton />
    </View>
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
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  backgroundView: { 
    backgroundColor: '#F4F4F4', 
    padding: 30, 
    borderRadius: 30, 
    marginHorizontal: 20, 
    marginBottom: 20 
  }, 
  imageView: { 
    width: "100%", 
    height: "50%"
  }
});

export default NewEventList;
