import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../constants/colors';
import PLANTS from '../constants/plants';
import CategoryList from '../components/CategoryList';
import Card from '../components/Card';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {unicodeRegExpTransformer} from '../services/utils';
import {
  fetchAllPlants,
  fetchPlantsByCategory,
  fetchLikedPlants,
} from '../services/plants';

const HomeScreen = ({navigation}) => {
  const [plants, setPlants] = useState(PLANTS);
  const [searchValue, setSearchValue] = useState('');
  const [currentCategoryId, setCurrentCategoryId] = useState();
  const [noResults, setNoResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldClearSelectedCategory, setShouldClearSelectedCategory] =
    useState(false);

  useEffect(() => {
    if (plants.length === 0) {
      setNoResults(true);
    }
  }, [plants.length]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetchAllPlants();
        setPlants(res);
        AsyncStorage.setItem('Plants', JSON.stringify(res));
      } catch (er) {
        console.log(er);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const onSort = async category => {
    console.log(category);

    if (currentCategoryId && currentCategoryId === category.id) {
      setShouldClearSelectedCategory(true);
      //TODOO
      console.log(JSON.parse(AsyncStorage.getItem('Plants')));
      return setPlants(JSON.parse(AsyncStorage.getItem('Plants')));
    }

    setIsLoading(true);

    try {
      if (category.name === 'Favourites') {
        const likedPlants = await fetchLikedPlants();
        console.log(likedPlants);
        setPlants(likedPlants);
      } else {
        const filteredPlants = await fetchPlantsByCategory(category.id);
        setPlants(filteredPlants);
      }
    } catch (er) {
      console.log(er);
    } finally {
      setIsLoading(false);
    }

    setShouldClearSelectedCategory(false);
    setCurrentCategoryId(category.id);
  };

  const onSearch = () => {
    if (!searchValue) return;

    setNoResults(false);
    setPlants(
      PLANTS.filter(plant => {
        const plantName = plant.name.trim().toLowerCase();
        const trimmedSearchValue = searchValue.trim().toLowerCase();

        return plantName.match(unicodeRegExpTransformer(trimmedSearchValue));
      }),
    );
  };

  const onClearSearch = () => {
    setNoResults(false);
    setPlants(AsyncStorage.getItem('Plants'));
  };

  return (
    <SafeAreaView style={style.safeAreaView}>
      <Header navigation={navigation} />
      <View
        style={{
          marginTop: 30,
          flexDirection: 'row',
          paddingHorizontal: 15,
        }}>
        <View style={style.searchContainer}>
          <Icon name="search" size={25} style={{marginLeft: 20}} />
          <TextInput
            placeholder="Search"
            style={style.input}
            value={searchValue}
            onChangeText={value => {
              setSearchValue(value);

              if (!value) {
                onClearSearch();
              }
            }}
          />
        </View>
        <TouchableOpacity onPress={onSearch}>
          <View style={style.sortBtn}>
            <Icon name="arrow-forward" size={30} color={COLORS.white} />
          </View>
        </TouchableOpacity>
      </View>
      <CategoryList
        onSort={onSort}
        shouldClearSelectedCategory={shouldClearSelectedCategory}
      />
      {!noResults ? (
        <>
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.green} />
          ) : (
            <FlatList
              columnWrapperStyle={{justifyContent: 'space-evenly'}}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                marginTop: 10,
                paddingBottom: 50,
              }}
              keyExtractor={(item, index) => index}
              numColumns={2}
              data={plants}
              renderItem={({item}) => (
                <Card plant={item} navigation={navigation} />
              )}
            />
          )}
        </>
      ) : (
        <View style={{padding: 15}}>
          <Text> No results found! </Text>
        </View>
      )}
      <Footer navigation={navigation} />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: COLORS.white,
  },
  searchContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    color: COLORS.dark,
  },
  sortBtn: {
    marginLeft: 10,
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default HomeScreen;
