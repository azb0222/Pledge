import { StyleSheet, View } from 'react-native';
import EventList from './EventList';
import NavigationBar from './NavigationBar';
import { useState, useEffect } from 'react'
import { VStack, NativeBaseProvider } from 'native-base';

const mockEventData = [
  {
    "_id": "644080851d383ec32290af15",
    "index": 0,
    "isActive": true,
    "company": "Qualitern",
    "address": "551 Beverly Road",
    "title": "Neon Outside",
    "date": "FRIDAY 4:00 PM",
    "attending": 86
  },
  {
    "_id": "644080855b72f7d944fde610",
    "index": 1,
    "isActive": true,
    "company": "Valreda",
    "address": "551 Beverly Road",
    "title": "Social Event",
    "date": "FRIDAY 4:00 PM",
    "attending": 80
  },
  {
    "_id": "644080856a1d4c7ca771adae",
    "index": 2,
    "isActive": true,
    "company": "Dogspa",
    "address": "551 Beverly Road",
    "title": "Social Event",
    "date": "FRIDAY 4:00 PM",
    "attending": 61
  },
  {
    "_id": "64408085cad2c028133c2fe1",
    "index": 3,
    "isActive": false,
    "company": "Comtours",
    "address": "165 Lafayette Walk",
    "title": "Social Event",
    "date": "FRIDAY 4:00 PM",
    "attending": 9
  },
  {
    "_id": "644080852ef36072b50a1751",
    "index": 4,
    "isActive": false,
    "company": "Amtas",
    "address": "551 Beverly Road",
    "title": "Social Event",
    "date": "FRIDAY 4:00 PM",
    "attending": 66
  },
  {
    "_id": "64408085aa9101688a520bd6",
    "index": 5,
    "isActive": true,
    "company": "Extremo",
    "address": "551 Beverly Road",
    "title": "Social Event",
    "date": "FRIDAY 4:00 PM",
    "attending": 93
  }
]

const mockData = {
  "success": true,
  "events": [
    {
      "_id": "64489f7d56e9c37f9fb6c489",
      "start_date": "2023-04-28T22:30:00.000Z",
      "end_date": "2023-04-28T22:30:00.000Z",
      "added_date": "2023-05-01T14:00:00.000Z",
      "host": "Delta Sigma Pi",
      "address": "123 Main St, Anytown",
      "header": "https://i.imgur.com/9ePjKyx.jpg",
      "participants": 10,
      "title": "Networking Night"
    },
    {
      "_id": "6448a12c56e9c37f9fb6c48a",
      "start_date": "2023-05-12T21:00:00.000Z",
      "end_date": "2023-05-13T01:00:00.000Z",
      "added_date": "2023-05-07T12:00:00.000Z",
      "host": "Kappa Delta",
      "address": "987 Oak Ave, Springfield",
      "header": "https://i.imgur.com/xQn4eRx.jpg",
      "participants": 11,
      "title": "Spring Fling"
    }
  ]
}



const App = () => {

  const [events, setEvents] = useState([]);
  const [displayedEvents, setDisplayEvents] = useState([]);
  const [resort, setResort] = useState("none");

  const refreshList = () => {
    fetch('https://pledge.anvil.gg/api/events/list')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setEvents(data.events);
      // setEvents(mockData.events)
      })
      .catch((err) => {
        console.log(err.message);
        //show error screen here
      });
      console.log("This is getting called!")
  }

  useEffect(() => {
    refreshList(); 
  }, []);

  const sortEvents = (x) => { 
    console.log(x); 

    switch (x) {
      /**
       * Logic for today: Make sure date is same as current IOS
       * date. This may be manipulated by the user. tough for them
       */
      case "Today": {
        const today = new Date();
        setDisplayEvents(events.filter(event => {
          const eventDate = new Date(event.start_date);
          return (
            eventDate.getDate() === today.getDate() &&
            eventDate.getMonth() === today.getMonth() &&
            eventDate.getFullYear() === today.getFullYear()
          );
        })); 
        break;
      }

      /**
       * This is the default functionality for hot and other stuff.
       * Lets leave it like this for the time being
       */
      default: {
        const sortedEvents = [...events].sort((a, b) => b.participants - a.participants);
        setDisplayEvents(sortedEvents);
        break;
      }
    }
  }; 
  
  return (
    <>
      <NativeBaseProvider>
        <View style={styles.listBackground}>
          <VStack>
          <NavigationBar  sortEvents={sortEvents}/>
              <View style={styles.listView}>
              <EventList events={displayedEvents} refreshList={refreshList} />
            </View>
          </VStack>
        </View>
      </NativeBaseProvider>
    </>
  );
};

const styles = StyleSheet.create({
  listView: {
    position: "fixed",
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
