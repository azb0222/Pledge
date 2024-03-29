import { StyleSheet, View } from 'react-native';
import EventList from './EventList';
import NavigationBar from './NavigationBar';
import { useState, useEffect } from 'react'
import { VStack, NativeBaseProvider } from 'native-base';
import { set } from 'date-fns';
import HGestureRecognizer from './components/hgesturerecognizer';

const filters = ['Today', 'Hot', 'New']
const App = () => {
  const [refreshing, setRefreshing] = useState(true);
  const [events, setEvents] = useState([]);
  const [displayedEvents, setDisplayedEvents] = useState([]);
  const [filter, setFilter] = useState("Hot");

  const refreshList = () => {
    setRefreshing(true);
    return fetch('https://pledge.anvil.gg/api/events/list')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setEvents(data.events);
        if (displayedEvents.length === 0) {
          sortEvents(filter, data.events);
          console.log(displayedEvents);
        } else {
          setDisplayedEvents(data.events.filter(e => displayedEvents.some(d => d._id === e._id)));
        }
        setRefreshing(false);
      // setEvents(mockData.events)
      })
      .catch((err) => {
        console.log(err);
        setRefreshing(false);
        //show error screen here
      });
  }

  useEffect(() => {
    refreshList();
  }, []);

  const sortEvents = (x = filter, eventList = events) => { 
    setFilter(x);

    switch (x) {
      /**
       * Logic for today: Make sure date is same as current IOS
       * date. This may be manipulated by the user. tough for them
       */
      case "Today": {
        const today = new Date();
        setDisplayedEvents(eventList.filter(event => {
          const eventDate = new Date(event.start_date);
          return (
            eventDate.getDate() === today.getDate() &&
            eventDate.getMonth() === today.getMonth() &&
            eventDate.getFullYear() === today.getFullYear()
          );
        })); 
        break;
      }

      case "New": {
        const sortedEvents = [...eventList].sort((a, b) => b.added_date - a.added_date);
        setDisplayedEvents(sortedEvents);
        break;
      }

      /**
       * This is the default functionality for hot and other stuff.
       * Lets leave it like this for the time being
       */
      default: {
        const sortedEvents = [...eventList].sort((a, b) => b.participants - a.participants);
        setDisplayedEvents(sortedEvents);
        break;
      }
    }
  }; 

  const updateItem = (left) => {
    sortEvents(filters[Math.max(Math.min(filters.indexOf(filter) + (left ? 1 : -1), filters.length - 1), 0)])
  }  
  
  return (
    <>
      <NativeBaseProvider>
        <HGestureRecognizer
          onSwipeLeft={() => updateItem(true)}
          onSwipeRight={() => updateItem(false)}
        >
          <View style={styles.listBackground}>
            <VStack>
              <NavigationBar filter={filter} setFilter={setFilter} sortEvents={sortEvents}/>
              <View style={styles.listView}>
                <EventList events={displayedEvents} sortEvents={sortEvents} refreshList={refreshList} refreshing={refreshing}/>
              </View>
            </VStack>
          </View>
        </HGestureRecognizer>
      </NativeBaseProvider>
    </>
  );
};

const styles = StyleSheet.create({
  listView: {
    marginTop: 100 
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: "80%",
    marginTop: 40,
    width: "100%",
  },
  blurContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 600,
    height: 600,
    resizeMode: 'contain',
  },
  listBackground: { 
    marginBottom: 30
  }
})

export default App;
