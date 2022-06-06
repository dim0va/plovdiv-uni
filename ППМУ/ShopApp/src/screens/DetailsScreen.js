import React, {useState} from 'react';
import {View, SafeAreaView, Image, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Footer from '../components/Footer';
import QuantityActions from '../components/QuantityActions';
import COLORS from '../constants/colors';
import {addUpdateShoppingCartItem} from '../services/shoppingCart';
import plantImage from '../assets/plant1.png';

const DetailsScreen = ({navigation, route}) => {
  const plant = route.params;
  const [quantity, setQuantity] = useState(1);

  const addInCart = async () => {
    try {
      await addUpdateShoppingCartItem({plantId: plant.id, quantity});
      navigation.navigate('ShoppingCart');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <View style={style.header}>
        <MaterialIcon
          name="arrow-back"
          size={28}
          onPress={() => navigation.goBack()}
        />
        <MaterialIcon
          name="shopping-cart"
          size={28}
          onPress={() => navigation.navigate('ShoppingCart')}
        />
      </View>
      <View style={style.imageContainer}>
        <Image source={plantImage} style={{resizeMode: 'contain', flex: 1}} />
      </View>
      <View style={style.detailsContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 22, fontWeight: 'bold'}}>{plant.name}</Text>
          <View style={style.priceTag}>
            <Text
              style={{
                color: COLORS.white,
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              ${plant.price}
            </Text>
          </View>
        </View>
        <View style={{marginTop: 30}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>About</Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 16,
              lineHeight: 22,
              marginTop: 10,
              marginRight: 30,
            }}>
            {plant.description}
          </Text>
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <QuantityActions
              initialQuantity={quantity}
              onChange={newQuantity => setQuantity(newQuantity)}
            />

            <View style={style.buyBtn}>
              <TouchableOpacity onPress={addInCart}>
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
        </View>
      </View>

      <Footer navigation={navigation} />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 0.45,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    flex: 0.55,
    justifyContent: 'center',
    backgroundColor: COLORS.light,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 30,
    paddingRight: 0,
    marginTop: 30,
  },
  buyBtn: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginRight: 30,
  },
  priceTag: {
    backgroundColor: COLORS.green,
    width: 90,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
});

export default DetailsScreen;
