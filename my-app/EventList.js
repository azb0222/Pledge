import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity,  Animated, Easing } from 'react-native';
import { HStack, VStack, NativeBaseProvider, Spacer } from 'native-base';
import Popover from 'react-native-popover-view';
import LottieView from 'lottie-react-native';
import { format } from 'date-fns'
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage


const updateEvent = (id, isAttending) => { 
  const url = 'https://pledge.anvil.gg/api/events/' + id + "/" + (isAttending ? 'attend' : 'unattend')
  console.log(url)
  fetch(url, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    //TODADD
  }),
});
}

function AttendingEventButton(props) {
  const [attendingEvent, setAttendingEvent] = useState(false);

  const storageKey = `eventAttendingStatus:${props.eventId}`; 

  useEffect(() => {
    const loadAttendingStatus = async () => {
      const status = await AsyncStorage.getItem(storageKey);
      setAttendingEvent(status === 'true');
    };
    loadAttendingStatus();
  }, []);

  const handleButtonPress = async () => {
    props.setIsAnimationPlaying(true); // Update this line
    const newStatus = !attendingEvent;

    await AsyncStorage.setItem(storageKey, newStatus.toString());

    if (attendingEvent) { 
      updateEvent(props.eventId, false)
    } else { 
      updateEvent(props.eventId, true)
    }
    setAttendingEvent(newStatus);
    props.refreshList(); 
  };

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: attendingEvent ? '#A1E1A8' : '#CBCBCB' }]}
      onPress={handleButtonPress}
    >
      <HStack justifyContent="center">
        <Text style={styles.buttonText}>{attendingEvent ? 'Attending  ' : 'I want to attend '}</Text>
        <Image source={attendingEvent ? require('./assets/images/check.png') : require('./assets/images/raiseHand.png')} style={styles.checkLogo} />
      </HStack>
    </TouchableOpacity>
  )
}

const EventList = ({ events, refreshList }) => {
  const [showPopover, setShowPopover] = useState(false);

  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false);

  const changeAnimation = () => { 
    setIsAnimationPlaying(true)
  }

  const renderItem = ({ item }) => (
    <NativeBaseProvider>

      <View style={styles.backgroundView}>

        <HStack justifyContent="right">
          <Spacer> </Spacer>
          <Image source={require('./assets/images/party.png')} style={styles.partyImage} />
          <Text style={styles.whosThrowing}> {item.host}</Text>
        </HStack>


        <VStack>
          <View styles={styles.tester}>
            <TouchableOpacity onPress={() => setShowPopover(true)}>
              <Image source={{
                uri: item.header,
              }} style={styles.imageView} />


            </TouchableOpacity>
            <Popover isVisible={showPopover} onRequestClose={() => setShowPopover(false)}>
              <Image source={{
                uri: item.header,
              }} style={{ width: 350, height: 550 }} />
            </Popover>
          </View>
          <HStack style={styles.horiTextView}>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Spacer></Spacer>
            <VStack space={2} alignItems="flex-end" >
              <Text style={styles.eventCompany}>{format(
                new Date(item.start_date), 'MM/dd/yyyy')}</Text>
              <Text style={styles.eventAddress}>{item.address}</Text>
              <Text style={styles.eventAttending}>{"🔥" + item.participants} </Text>
            </VStack>
            
          </HStack>
          <AttendingEventButton
          eventId={item._id}
          setIsAnimationPlaying={setIsAnimationPlaying} // Pass the function
          refreshList={refreshList}
        />          
        </VStack>        
        {/* <LottieView
          source={require('./assets/images/sparkle.json')}
          autoPlay={true}
          loop={true}
          style={styles.celebrationAnimation}
          onAnimationFinish={() => {
            setIsAnimationPlaying(false);
            console.log('Animation finished'); // Add this line to check if the callback is being executed
          }}
          onAnimationLoop{... () => { 
            console.log('Animation finished'); // Add this line to check if the callback is being executed
          }}
        /> */}
      </View>
    </NativeBaseProvider>
  );

  return (
    <View>
      <View style={styles.gapView}>
      </View>
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>

  );
};

const styles = StyleSheet.create({
  whosThrowing: {
    fontWeight: '600',
    fontSize: 16,
    textAlign: "right",
    marginBottom: 10,
    marginTop: 5,
    marginRight: 5,
    color: '#030408',
  },
  partyImage: {
    width: 18,
    height: 18,
    marginTop: 5
  },
  imageView: {
    width: "100%",
    height: 300,
    borderRadius: 10
  },
  horiTextView: {
    paddingTop: 20
  },
  button: {
    padding: 10,
    borderRadius: 10,
    marginTop: 20
  },
  buttonText: {
    textAlign: 'center'
  },
  celebrationAnimation: { 
    width: 200, 
    height: 200, 
    position: "absolute",
    top: 120,
    right: -20,
    
  }, 
  backgroundView: {
    paddingHorizontal: 20,
    paddingBottom: 25,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderColor: '#F4F4F4',
    backgroundColor: '#F4F4F4',
    margin: 15,
    marginTop: 20,
    marginBottom: 0,
    borderRadius: 25,
    height: 520
  },
  eventTitle: {
    fontWeight: 'bold',
    fontSize: 30,
    flexWrap: 'wrap',
    width: 170,
  },
  eventCompany: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold',

  },
  eventAddress: {
    fontSize: 12,
    color: '#999',
    fontWeight: 'bold',

  },
  eventDate: {
    fontSize: 13,
    color: '#999',
    fontWeight: 'bold',

  },
  eventAttending: {
    fontSize: 13,
    color: '#999',
    fontWeight: 'bold',

  },
  checkLogo: {
    height: 15,
    width: 15
  }
});

export default EventList;
