import React from 'react';
import { View, Text, StyleSheet, FlatList, Button, Image } from 'react-native';
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
      {/* <Button title="Will Attend" onPress={setAttendingEvent} /> */}
     

    <View style={styles.needPadding}> 
    <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventCompany}>{item.company}</Text>
      <Text style={styles.eventAddress}>{item.address}</Text>
      <Text style={styles.eventDate}>{item.date}</Text>
      <Text style={styles.eventAttending}>{item.attending} attending</Text>
    </View>


    <Image
        style={styles.logo}
        source={{
          uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
        }}
      />


      <View style={styles.attendingContainer}>
        <View style={[styles.attendingBox, attendingEvent ? styles.attendingBoxActive : null]}>
          <Text style={styles.attendingText}>Attending</Text>
        </View>
      </View>
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
  needPadding: { 
    padding: 16, 
    borderBottomWidth: 1,
    borderColor: '#bebebe',
    backgroundColor: '#bebebe', 
    margin: 15, 
    marginBottom: 0, 
    borderRadius: 25, 
    height: 200
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
    alignItems: 'center',
    marginTop: -27,
    backgroundColor: '#b5ffc1', 
    borderBottomLeftRadius: 25, 
    borderBottomRightRadius: 25, 
    margin: 15, 
    zIndex: -1, 
  },
  attendingBox: {
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  attendingBoxActive: {
    backgroundColor: 'darkgreen',
  },
  attendingText: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 0
  },
});

export default EventList;
