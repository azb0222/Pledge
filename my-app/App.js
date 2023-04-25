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
    "title": "Social Event",
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

const App = () => {

  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <>
      <NativeBaseProvider>
        <VStack>
          <NavigationBar />
          <View style={styles.listView}>
            <EventList events={mockEventData} />
          </View>
        </VStack>
      </NativeBaseProvider>
    </>
  );
};

const styles = StyleSheet.create({
  listView: {
    transform: [{ translateY: 100 }],
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
})

export default App;
