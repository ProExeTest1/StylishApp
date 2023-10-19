import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {fs, hp, wp} from '../helpers/ResponsiveFonts';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {FlatList} from 'react-native-gesture-handler';
import {Image} from 'react-native-svg';
import {Images} from '../helpers/images';
import {useDispatch, useSelector} from 'react-redux';
import {Products} from '../helpers/interface';

interface FilterComponentProps {
  filterModel2: boolean;
}

const FilterComponent = (props: FilterComponentProps) => {
  const [filterModel2, setFilterModel2] = useState(props.filterModel2);
  const [selectedRating, setSelectedRating] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [selectedStock, setSelectedStock] = useState('');
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [newData, setNewData] = useState();
  const dispatch = useDispatch();
  const stateData = useSelector(state => state.Reducers);
  const [categoryData, setCategoryData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const RatingSelection = text => {
    console.log('pppp', text);
    setSelectedRating(text);
  };
  const renderFiveStar = ({item}) => {
    return (
      <Text
        onPress={() => RatingSelection(item)}
        style={selectedRating == item ? styles.FiveStar : styles.NonFiveStar}>
        {item}⭐
      </Text>
    );
  };
  const StockSelection = text => {
    console.log('pppp', text);
    setSelectedStock(text);
  };

  const renderStock = ({item}) => {
    return (
      <Text
        onPress={() => StockSelection(item)}
        style={
          selectedStock.toString().match(item)
            ? styles.FiveStar
            : styles.NonFiveStar
        }>
        {item}
      </Text>
    );
  };

  const ClearRating = () => {
    setSelectedRating('');
    setRefresh(!refresh);
  };
  const ClearStock = () => {
    setSelectedStock('');
    setRefresh(!refresh);
  };

  const ModalApplyButton = () => {
    setFilterModel2(!filterModel2);

    console.log('selectedRating------------', selectedRating);

    console.log('datadata', data);

    let stock1 = 0,
      stock2 = 0;

    if (selectedStock == 'out of stock') {
      (stock1 = 0), (stock2 = 0);
    } else if (selectedStock == '0 - 49') {
      (stock1 = 0), (stock2 = 49);
    } else if (selectedStock == '50 - 99') {
      (stock1 = 50), (stock2 = 99);
    } else {
      (stock1 = 100), (stock2 = 500);
    }

    if (selectedRating && selectedStock) {
      const tempData = data.filter(
        ele =>
          Math.round(ele.rating) == parseInt(selectedRating) &&
          ele.stock > stock1 &&
          ele.stock < stock2,
      );

      console.log('tempData-------------', tempData);
      setNewData(tempData);

      setRefresh(!refresh);
    } else if (selectedRating && !selectedStock) {
      const tempData = data.filter(
        ele => Math.round(ele.rating) == parseInt(selectedRating),
      );

      console.log('tempData-------------', tempData);
      setNewData(tempData);
      setRefresh(!refresh);
    } else if (selectedStock && !selectedRating) {
      const tempData = data.filter(
        ele => ele.stock > stock1 && ele.stock < stock2,
      );

      console.log('tempData-------------', tempData);
      setNewData(tempData);
      setRefresh(!refresh);
    } else {
      setNewData(data2);
      setData(data2);
    }
  };

  useEffect(() => {
    console.log('Products---------------------', stateData.products);

    setData(stateData.products);
    setData2(stateData.products);

    setCategoryData(stateData.products);
    const ids = stateData.products.map(({category}: Products) => category);
    const tempData = stateData.products.filter(
      ({category}: Products, index: number) => {
        return !ids.includes(category, index + 1);
      },
    );

    console.log('--------------------tempData', tempData);

    setFilterData(tempData);
  }, [refresh, stateData.products]);

  return (
    <View style={styles.container}>
      {filterModel2 && (
        <ReactNativeModal
          isVisible={filterModel2}
          swipeDirection={'down'}
          onSwipeComplete={() => setFilterModel2(!filterModel2)}
          style={{
            margin: 0,
            backgroundColor: 'transparent',
            justifyContent: 'flex-end',
          }}>
          <View style={styles.FilterModalView}>
            <Text style={styles.FilterByText}>Filter by</Text>
            <Text style={styles.RatingText}>rating</Text>
            <FlatList
              horizontal
              data={[1, 2, 3, 4, 5]}
              renderItem={renderFiveStar}
              contentContainerStyle={styles.RatingView}
              ListFooterComponent={
                <TouchableOpacity
                  style={styles.closeIconFilter}
                  onPress={ClearRating}>
                  <Image
                    source={Images.closeIcon}
                    style={styles.closeIconFilterImg}
                  />
                </TouchableOpacity>
              }
            />
            <Text style={styles.StockText}>Stock</Text>
            <FlatList
              horizontal
              data={['out of stock', '0 - 49', '50 - 99', '100 More']}
              renderItem={renderStock}
              contentContainerStyle={styles.RatingView}
              ListFooterComponent={
                <TouchableOpacity
                  style={styles.closeIconFilter}
                  onPress={ClearStock}>
                  <Image
                    source={Images.closeIcon}
                    style={styles.closeIconFilterImg}
                  />
                </TouchableOpacity>
              }
            />
            <TouchableOpacity onPress={ModalApplyButton}>
              <Text style={styles.ApplyText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </ReactNativeModal>
      )}
    </View>
  );
};

export default FilterComponent;

const styles = StyleSheet.create({
  container: {},
  FilterModalView: {
    height: hp(300),
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: wp(20),
  },
  SortText: {
    // fontWeight: 'bold',
    fontSize: fs(20),
    marginTop: hp(20),
    // alignSelf: 'center',
    color: Colors.Black,
  },
  FilterSortTextView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeIcon: {
    height: hp(18),
    width: wp(18),
    marginTop: hp(20),
  },
  FilterByText: {
    color: 'black',
    // fontWeight: 'bold',
    fontSize: 25,
    marginTop: 30,
    alignSelf: 'center',
  },
  ApplyText: {
    color: 'black',
    // fontWeight: 'bold',
    fontSize: 15,
    marginTop: 30,
    alignSelf: 'center',
    padding: 5,
    paddingHorizontal: 20,
    backgroundColor: Colors.Green,
    bottom: 10,
    // color: 'white',
    borderRadius: 10,
  },
  RatingText: {
    marginTop: 15,
    color: 'black',
    fontSize: 18,
    // marginLeft: 10,
  },
  StockText: {
    // marginTop: -70,
    color: 'black',
    fontSize: 18,
    // marginLeft: 10,
  },
  FiveStar: {
    borderWidth: 1,
    paddingHorizontal: 5,
    borderRadius: 5,
    color: 'white',
    backgroundColor: Colors.Green,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  RatingView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    // borderWidth: 1,
    marginVertical: 5,
    height: 25,
  },
  NonFiveStar: {
    borderWidth: 1,
    paddingHorizontal: 5,
    borderRadius: 5,
    color: 'black',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  closeIconFilter: {
    // borderWidth: 1,
    marginLeft: wp(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIconFilterImg: {
    height: hp(18),
    width: wp(18),
  },
});
