import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

import COLORS from '../constants/colors';
import {fetchAllCategories} from '../services/categories';

const CategoryList = ({onSort, shouldClearSelectedCategory}) => {
  const [categoryIndex, setCategoryIndex] = useState();
  const [categories, setCategories] = useState([]);

  const onCategorySort = (category, index) => {
    setCategoryIndex(index);
    onSort(category);
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetchAllCategories();
        setCategories(res);
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();
  }, []);

  return (
    <View style={style.categoryContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => onCategorySort(category, index)}>
            <Text
              style={[
                style.categoryText,
                categoryIndex === index &&
                  !shouldClearSelectedCategory &&
                  style.categoryTextSelected,
              ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  categoryContainer: {
    marginTop: 20,
    marginBottom: 0,

    marginHorizontal: 15,
  },
  categoryText: {
    fontSize: 16,
    color: 'grey',
    fontWeight: 'bold',
    marginRight: 30,
  },
  categoryTextSelected: {
    color: COLORS.green,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: COLORS.green,
  },
});

export default CategoryList;
