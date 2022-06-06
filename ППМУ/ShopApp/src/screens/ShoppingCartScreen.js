import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CartItem from '../components/CartItem';
import COLORS from '../constants/colors';
import {
  fetchShoppingCartItems,
  addUpdateShoppingCartItem,
} from '../services/shoppingCart';
import {calculateTotalPrice} from '../services/utils';

const ShoppingCartScreen = ({navigation}) => {
  const [shoppingCartItems, setShoppingCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [totalPrice, setTotalPrice] = useState(0);

  const onQuantityChange = async ({plantId, newQuantity}) => {
    try {
      await addUpdateShoppingCartItem({
        plantId,
        quantity: newQuantity,
      });

      const updatedShoppingCartItems = shoppingCartItems.map(item => {
        if (item.plantId === plantId) {
          return {...item, quantity: newQuantity};
        }

        return item;
      });

      setTotalPrice(calculateTotalPrice(updatedShoppingCartItems));
    } catch (err) {
      console.log(err);
    }
  };

  const onCartItemDelete = deletedItemId => {
    const filteredCartItems = shoppingCartItems.filter(
      item => item.id !== deletedItemId,
    );
    console.log('tuk', filteredCartItems);

    setShoppingCartItems(filteredCartItems);
    setTotalPrice(calculateTotalPrice(filteredCartItems));
  };

  useEffect(() => {
    const getShoppingCartItems = async () => {
      try {
        const res = await fetchShoppingCartItems();
        setShoppingCartItems(res);
        setTotalPrice(calculateTotalPrice(res));
      } catch (er) {
        console.log(er);
      } finally {
        setIsLoading(false);
      }
    };

    getShoppingCartItems();
  }, []);

  return (
    <SafeAreaView style={style.safeAreaView}>
      <View style={style.header}>
        <Icon name="arrow-back" size={28} onPress={() => navigation.goBack()} />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.green} />
      ) : (
        <View style={{paddingHorizontal: 10}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={shoppingCartItems}
            renderItem={({item}) => (
              <CartItem
                item={item}
                onQuantityChange={onQuantityChange}
                onCartItemDelete={onCartItemDelete}
              />
            )}
          />

          <Text style={{fontSize: 16, marginTop: 20, alignSelf: 'flex-end'}}>
            Total price: <Text style={{fontWeight: '600'}}>${totalPrice}</Text>
          </Text>

          <View style={style.buyBtn}>
            <TouchableOpacity>
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Buy
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  buyBtn: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginVertical: 15,
  },
});

export default ShoppingCartScreen;
