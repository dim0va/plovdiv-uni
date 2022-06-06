/* eslint-disable eslint-comments/no-unlimited-disable */
import React, {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {View, Text} from 'react-native';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';

const QuantityActions = ({smaller, initialQuantity, onChange}) => {
  const [count, setCount] = useState(initialQuantity);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    setIsButtonDisabled(count <= 1);
    onChange(count);
    //eslint-disable-next-line
  }, [count]);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <TouchableOpacity onPress={() => setCount(prev => prev + 1)}>
        <View>
          <SimpleLineIcon size={smaller ? 23 : 30} name="plus" />
        </View>
      </TouchableOpacity>

      <Text
        style={{
          fontSize: smaller ? 14 : 20,
          marginHorizontal: 10,
          fontWeight: 'bold',
        }}>
        {count}
      </Text>

      <TouchableOpacity
        onPress={() => setCount(prev => prev - 1)}
        disabled={isButtonDisabled}>
        <View>
          <SimpleLineIcon
            size={smaller ? 23 : 30}
            name="minus"
            color={isButtonDisabled ? 'grey' : 'black'}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default QuantityActions;
