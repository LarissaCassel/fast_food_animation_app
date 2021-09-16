import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import { MotiView } from 'moti';
import { data, tray, logo } from '../../data';
import { AntDesign } from '@expo/vector-icons';

const { width, height } = Dimensions.get('screen');

export default function Home() {
  
  const [anima, setAnima] = useState(true);
  const [addItem, setAddItem] = useState([]);
  const [total, setTotal] = useState(0);
  const [select, setSelect] = useState<string>();

  function handleAddItemCart(price: number, item: string) {
    setTotal(total + price);
    setSelect(item);
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: logo }}
        style={styles.listContainer}
        resizeMode="contain">
        <FlatList
          style={styles.flastList}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <View style={styles.lisItem}>
                <View style={styles.itemContainer}>
                  <Image
                    style={styles.itemImage}
                    source={{ uri: item.img }}
                    resizeMode="contain"
                  />
                </View>

                {anima && (
                  <MotiView
                    style={styles.itemContain}
                    from={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{
                      type: 'timing',
                      duration: 3000,
                    }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                      <Text style={styles.productName}>{item.name}</Text>
                      <Text style={styles.productPrice}>R$:{item.price}</Text>
                    </View>

                    <TouchableOpacity
                      style={styles.addBtm}
                      onPress={() =>
                        handleAddItemCart(Number(item.price), item.id)
                      }>
                      <AntDesign name="plus" size={24} color="white" />
                    </TouchableOpacity>
                  </MotiView>
                )}
              </View>
            );
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={width}
          decelerationRate={'fast'}
          onScrollEndDrag={() => setAnima(true)}
          onScrollBeginDrag={() => setAnima(false)}
        />
      </ImageBackground>

      <View style={styles.divider} />

      <ImageBackground style={styles.tray} source={{ uri: tray }}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <View>
                {select == item.id && (
                  <MotiView
                    from={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{
                      type: 'timing',
                      duration: 3000,
                    }}>
                    <View>
                      <Image
                        style={styles.trayItem}
                        source={{ uri: item.img }}
                      />
                    </View>
                  </MotiView>
                )}
              </View>
            );
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </ImageBackground>

      <View style={styles.bottomContainer}>
        <View style={styles.divider} />

        <View style={styles.bottomContain}>
          <Text style={styles.total}>R$:{total}</Text>
          <TouchableOpacity style={styles.payBtm}>
            <Text style={styles.payBtmText}> Pagar </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
  },
  listContainer: {
    width,
    height: 300,
  },
  flastList: {
    flexGrow: 0,
  },
  lisItem: {
    width,
    height: 300,
    flexDirection: 'row',
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemImage: {
    height: 200,
    width: width - 100,
    resizeMode: 'center',
  },
  itemContain: {
    width: 150,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#4169e1',
  },
  productPrice: {
    fontSize: 20,
    color: '#4169e1',
  },
  addBtm: {
    backgroundColor: '#4169e1',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    width,
    backgroundColor: '#dcdcdc',
    marginTop: 5,
  },
  tray: {
    height: 200,
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trayItem: {
    height: 100,
    width: 100,
    transform: [{ translateY: 25 }],
  },
  bottomContainer: {
    flex: 1,
    width,
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  bottomContain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  total: {
    fontSize: 30,
    color: '#4169e1',
    flex: 1,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  payBtm: {
    backgroundColor: '#4169e1',
    height: 50,
    width: width / 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payBtmText:{
    fontSize: 30, 
    color: '#fff'
  }
});
