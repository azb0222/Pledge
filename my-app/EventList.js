import React from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { useState } from 'react'

const EventList = ({ events }) => {
  const [attendingEvent, setAttendingEvent] = useState(false);

  const handleButtonPress = () => {
    setAttendingEvent(!attendingEvent);
  };

  const renderItem = ({ item }) => (
    <View
      style={[styles.eventItem, item.isActive ? styles.active : styles.inactive]}
    >
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventCompany}>{item.company}</Text>
      <Text style={styles.eventAddress}>{item.address}</Text>
      <Text style={styles.eventDate}>{item.date}</Text>
      <Text style={styles.eventAttending}>{item.attending} attending</Text>
      <View style={styles.attendingContainer}>
        <View style={[styles.attendingBox, attendingEvent ? styles.attendingBoxActive : null]}>
          <Text style={styles.attendingText}>Attending</Text>
        </View>
      </View>
      <Button title="Will Attend" onPress={setAttendingEvent} />
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
  eventItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  active: {},
  inactive: {
    backgroundColor: '#eee',
  },
  eventTitle: {
    fontWeight: 'bold',
    fontSize: 18,
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
  attendingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  attendingBox: {
    width: 60,
    height: 25,
    backgroundColor: 'green',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  attendingBoxActive: {
    backgroundColor: 'darkgreen',
  },
  attendingText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EventList;
