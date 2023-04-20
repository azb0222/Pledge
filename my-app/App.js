import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, SafeAreaView} from 'react-native';
import EventList from './EventList';
import NavigationBar from './NavigationBar';
const eventData = [
  {
    "_id": "644080851d383ec32290af15",
    "index": 0,
    "isActive": true,
    "company": "Qualitern",
    "address": "551 Beverly Road, Rosburg, New Jersey, 7914",
    "title": "Social Event",
    "date": "2023-03-04T08:53:01 +05:00",
    "attending": 86
  },
  {
    "_id": "644080855b72f7d944fde610",
    "index": 1,
    "isActive": true,
    "company": "Valreda",
    "address": "756 Willow Street, Alleghenyville, Mississippi, 4357",
    "title": "Social Event",
    "date": "2023-03-12T09:54:15 +04:00",
    "attending": 80
  },
  {
    "_id": "644080856a1d4c7ca771adae",
    "index": 2,
    "isActive": true,
    "company": "Dogspa",
    "address": "879 Battery Avenue, Hartsville/Hartley, California, 2649",
    "title": "Social Event",
    "date": "2023-02-23T06:19:50 +05:00",
    "attending": 61
  },
  {
    "_id": "64408085cad2c028133c2fe1",
    "index": 3,
    "isActive": false,
    "company": "Comtours",
    "address": "165 Lafayette Walk, Hillsboro, Louisiana, 8796",
    "title": "Social Event",
    "date": "2023-03-09T05:17:32 +05:00",
    "attending": 9
  },
  {
    "_id": "644080852ef36072b50a1751",
    "index": 4,
    "isActive": false,
    "company": "Amtas",
    "address": "759 Montauk Court, Bergoo, Minnesota, 1509",
    "title": "Social Event",
    "date": "2023-04-17T11:09:40 +04:00",
    "attending": 66
  },
  {
    "_id": "64408085aa9101688a520bd6",
    "index": 5,
    "isActive": true,
    "company": "Extremo",
    "address": "283 Varanda Place, Gloucester, Wisconsin, 5339",
    "title": "Social Event",
    "date": "2023-04-15T10:31:30 +04:00",
    "attending": 93
  }
]

const App = () => {
  return (
    <>
      <StatusBar  backgroundColor="0000FF"  />
      <NavigationBar />
        <View style={{ marginTop: 90 }}>
          <EventList events={eventData} />
        </View>
    </>
  );
};

export default App;