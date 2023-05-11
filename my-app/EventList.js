import React, { useEffect, useRef, useState } from 'react';
import { RefreshControl, View, ScrollView, Text, StyleSheet, FlatList, Image, TouchableOpacity,  Animated, Easing } from 'react-native';
import { HStack, VStack, NativeBaseProvider, Spacer } from 'native-base';
import Popover from 'react-native-popover-view';
import LottieView from 'lottie-react-native';
import { formatInTimeZone } from 'date-fns-tz'
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import SkeletonPlaceholder from 'react-native-skeleton-placeholder-expo';
import ImageLoad from 'react-native-image-placeholder';

function AttendingEventButton(props) {
  const [attendingEvent, setAttendingEvent] = useState(false);
  const storageKey = `eventAttendingStatus:${props.event._id}`; 

  useEffect(() => {
    const loadAttendingStatus = async () => {
      const status = await AsyncStorage.getItem(storageKey);
      setAttendingEvent(status === 'true');
    };
    loadAttendingStatus();
  }, []);

  const updateEvent = (isAttending) => { 
    const url = 'https://pledge.anvil.gg/api/events/' + props.event._id + "/" + (isAttending ? 'attend' : 'unattend')
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
    })
    .then(e => e.json())
    .then(e => {
        console.log(e)
        props.event.participants += isAttending ? 1 : -1;
        props.sortEvents()
        setAttendingEvent(isAttending);
    });
  }

  const handleButtonPress = async () => {
    props.setIsAnimationPlaying(true); // Update this line
    const newStatus = !attendingEvent;

    await AsyncStorage.setItem(storageKey, newStatus.toString());
    updateEvent(newStatus);
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

const EventList = ({ events, sortEvents, refreshList, refreshing }) => {
  const [showPopoverId, setShowPopoverId] = useState(null);
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false);

  const changeAnimation = () => { 
    setIsAnimationPlaying(true)
  }
  const renderPlaceholder = () => {
    return (
      <NativeBaseProvider>
        <View style={styles.backgroundView}>
          <HStack justifyContent="right">
            <Spacer> </Spacer>
            <Image source={require('./assets/images/party.png')} style={styles.partyImage} />
            <Text style={styles.whosThrowing}> Loading</Text>
          </HStack>
          <SkeletonPlaceholder borderRadius={4}>
            <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
              <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
              <SkeletonPlaceholder.Item marginLeft={20}>
                <SkeletonPlaceholder.Item width={120} height={20} />
                <SkeletonPlaceholder.Item marginTop={6} width={80} height={20} />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        </View>
      </NativeBaseProvider>
    )
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
          <TouchableOpacity onPress={() => setShowPopoverId(item._id)}>
        <ImageLoad 
          source={{ uri: item.header }} 
          style={styles.imageView} 
          loadingStyle={{ size: 'large', color: 'black' }}
        />
      </TouchableOpacity>
      {
        showPopoverId &&
        <Popover isVisible onRequestClose={() => setShowPopoverId(null)}>
          {
            events.find(event => event._id === showPopoverId) &&
            <ImageLoad 
              source={{ uri: events.find(event => event._id === showPopoverId).header }} 
              style={{ width: 350, height: 550 }} 
              loadingStyle={{ size: 'large', color: 'black' }}
            />
          }
        </Popover>
      }
          </View>
          <HStack style={styles.horiTextView}>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Spacer></Spacer>
            <VStack style={styles.eventWrapper} space={2} alignItems="flex-end" >
              <Text style={styles.eventCompany}>{formatInTimeZone(
                new Date(item.start_date), 'GMT', "EEE dd LLL '@' h:mm a")}</Text>
              <Text style={styles.eventAddress}>{item.address}</Text>
              <Text style={styles.eventAttending}>{"🔥" + item.participants} </Text>
            </VStack>
            
          </HStack>
          <AttendingEventButton
            event={item}
            setIsAnimationPlaying={setIsAnimationPlaying} // Pass the function
            refreshList={refreshList}
            sortEvents={sortEvents}
            refreshing={refreshing}
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

  const EmptyListMessage = ({item}) => {
    return (
      // Flat List Item
      <Text
        style={styles.emptyListStyle}
        onPress={() => getItem(item)}>
        No events found! 😔
      </Text>
    );
  };

  return (
    <View>
      <View style={styles.gapView}>
      </View>
      <FlatList
        data={refreshing ? [1, 2, 3] : events}
        renderItem={refreshing ? renderPlaceholder : renderItem}
        keyExtractor={(item) => refreshing ? item : item._id}
        refreshControl={<RefreshControl
          colors={["#9Bd35A", "#689F38"]}
          refreshing={refreshing}
          onRefresh={refreshList.bind(this)} />}
        ListEmptyComponent={EmptyListMessage}
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
    paddingTop: 20,
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
  eventWrapper: {
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
    textAlign: "right",
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
  },
  emptyListStyle: {
    fontWeight: 'bold',
    paddingTop: 200,
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default EventList;
