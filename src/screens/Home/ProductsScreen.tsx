import React, {useEffect, useMemo, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Pressable,
  Image,
  Platform,
  BackHandler,
  FlatList,
} from 'react-native';
import ScreenTemplate from '../../components/ScreenTemplate';
import DrawerIcon from '../../assets/SVGs/DrawerIcon.svg';
import StylishLogo from '../../assets/SVGs/StylishLogo.svg';
import ProfilePic from '../../assets/SVGs/ProfilePic.svg';
import SearchComponent from '../../components/SearchComponent';
import {fs, hp, wp} from '../../helpers/ResponsiveFonts';
import {Colors} from '../../helpers/colors';
import FilterIcon from '../../assets/SVGs/FilterIcon.svg';
import SortIcon from '../../assets/SVGs/SortIcon.svg';
import FeaturesComponent from '../../components/FeaturesComponent';

import {setProducts} from '../../Store/Reducer';
import {useDispatch, useSelector} from 'react-redux';
import {Products} from '../../helpers/interface';
import {ScrollView} from 'react-native-gesture-handler';
import ProductsList from '../../components/ProductsList';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import ReactNativeModal from 'react-native-modal';
import {Images} from '../../helpers/images';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import {radioButtons, radioButtons2} from '../../helpers/appData';
import BackIcon from '../../assets/SVGs/BackIcon.svg';
import ProfileView from '../../components/ProfileView';

const baseUrl = 'https://fakestoreapi.com/ProductsScreen';
interface ProductsScreenProps {}

const ProductsScreen = (props: ProductsScreenProps) => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const dispatch = useDispatch();
  const stateData = useSelector(state => state.Reducers);
  const navigation = useNavigation();
  const route = useRoute();
  const category = route.params?.category;
  const [search, setSearch] = useState('');
  const [refresh, setRefresh] = useState(false);

  const [filterModel, setFilterModel] = useState(false);
  const [filterModel2, setFilterModel2] = useState(false);
  const [selectedRadioId, setSelectedRadioId] = useState<string | undefined>();
  const [selectedRadioId2, setSelectedRadioId2] = useState<
    string | undefined
  >();
  const [selectedRating, setSelectedRating] = useState('');
  const [selectedStock, setSelectedStock] = useState('');
  const [newData, setNewData] = useState();

  console.log('data------------', newData);

  const handleSort = () => {
    setFilterModel(true);
  };

  const handleFilter = () => {
    console.log('FilterModel2 Called ---------- ');
    setFilterModel2(true);
    console.log('FilterModel2 ----------', filterModel2);
  };

  const handleRadio = (id: string) => {
    setSelectedRadioId(id);
    setFilterModel(!filterModel);

    if (id == '1') {
      let tempData = [...data];
      tempData.sort((a: Products, b: Products) => b.price - a.price);
      setData(tempData);
    } else if (id == '2') {
      let tempData = [...data];
      tempData.sort((a: Products, b: Products) => a.price - b.price);
      setData(tempData);
    }
  };
  const handleRadio2 = (id: string) => {
    setSelectedRadioId2(id);
    setFilterModel2(!filterModel2);

    if (id == '1') {
      let tempData = [...data];
      tempData.sort((a, b) => b.rating - a.rating);
      setData(tempData);
    } else if (id == '2') {
      let tempData = [...data];
      tempData.sort((a: Products, b: Products) => a.price - b.price);
      setData(tempData);
    }
  };

  const searchFilterFunction = (text: string) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = data.filter(function (item: Products) {
        // Applying filter for the inserted text in search bar
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setData(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setData(data2);
      setSearch(text);
    }
  };
  const ShowBottomTab = () => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        backgroundColor: Colors.white,
        height: Platform.OS === 'ios' ? '11%' : '10%',
        // justifyContent: 'center',
        paddingBottom: Platform.OS === 'ios' ? 15 : 0,
        borderTopColor: Colors.Transparent,
        elevation: 2,
        shadowOpacity: 0,

        borderWidth: 1,
      },
    });
  };
  const GoBack = () => {
    ShowBottomTab();
    navigation.goBack();
  };

  const handleBackPress = () => {
    ShowBottomTab();
    return true;
  };

  const RatingSelection = text => {
    console.log('pppp', text);
    setSelectedRating(text);
  };

  const renderFiveStar = ({item}) => {
    // console.log('99999-----------', item.category);
    return (
      <Text
        onPress={() => RatingSelection(item)}
        style={selectedRating == item ? styles.FiveStar : styles.NonFiveStar}>
        {item}⭐
      </Text>
      // </View>
    );
  };

  const StockSelection = text => {
    console.log('pppp', text);
    setSelectedStock(text);
  };

  const renderStock = ({item}) => {
    // console.log('99999-----------', item.category);
    return (
      // <View style={styles.renderFilterSection}>
      <Text
        onPress={() => StockSelection(item)}
        style={
          selectedStock.toString().match(item)
            ? styles.FiveStar
            : styles.NonFiveStar
        }>
        {item}
      </Text>
      // </View>
    );
  };

  const ModalApplyButton = () => {
    setFilterModel2(!filterModel2);

    console.log('selectedRating------------', selectedRating);

    // Math.round(ele.rating) == selectedRating
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
      // dispatch(setProducts(tempData));
      // setData(tempData);
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

  const ClearRating = () => {
    setSelectedRating('');
    setRefresh(!refresh);
  };
  const ClearStock = () => {
    setSelectedStock('');
    setRefresh(!refresh);
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

    // setFilterData([{ category: 'View All' }, ...tempData]);
    setFilterData(tempData);

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );
    return () => backHandler.remove();

    // const ids = books.map(({ title }) => title);
    //     const filtered = books.filter(({ title }, index) =>
    // !ids.includes(title, index + 1));
  }, [refresh, stateData.products]);

  return (
    <ScreenTemplate>
      <View style={styles.Header}>
        <TouchableOpacity style={styles.DrawerIcon} onPress={GoBack}>
          <BackIcon />
        </TouchableOpacity>
        <View style={styles.StylishLogo}>
          <Text style={styles.categoryheader}>
            {category == 'ViewAll'
              ? 'All Products'
              : category[0].toUpperCase() + category.slice(1)}
          </Text>
        </View>
        <View style={styles.ProfilePic}>
          <ProfileView />
        </View>
      </View>
      <View style={styles.SearchComponent}>
        <SearchComponent onChangeText={text => searchFilterFunction(text)} />
      </View>
      <View style={styles.Features}>
        <View style={styles.AllFeaturedView}>
          <Text style={styles.AllFeatured}>
            {category == 'ViewAll'
              ? data.length
              : newData == undefined
              ? data?.filter((item, index) => item.category == category).length
              : newData?.filter((item, index) => item.category == category)
                  .length}
            + Items
          </Text>
        </View>
        <Pressable style={styles.Sort} onPress={handleSort}>
          <Text>Sort</Text>
          <SortIcon />
        </Pressable>
        <Pressable style={styles.Filter} onPress={handleFilter}>
          <Text>Filter</Text>
          <FilterIcon />
        </Pressable>
      </View>

      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <ProductsList
          Data={
            category == 'ViewAll'
              ? data
              : newData == undefined
              ? data?.filter((item, index) => item.category == category)
              : newData?.filter((item, index) => item.category == category)
          }
          //   {

          //   (category == 'ViewAll')?
          //   Data={data}:
          // else
          // Data={data?.filter((item, index) => item.category == category)}
          //   }
        />
      </ScrollView>

      {filterModel && (
        <ReactNativeModal
          isVisible={filterModel}
          swipeDirection={'down'}
          onSwipeComplete={() => setFilterModel(!filterModel)}
          style={{
            margin: 0,
            backgroundColor: 'transparent',
            justifyContent: 'flex-end',
          }}>
          <View style={styles.FilterModalView}>
            <View style={styles.FilterSortTextView}>
              <Text style={styles.SortText}>Sort</Text>
              <Pressable onPress={() => setFilterModel(!filterModel)}>
                <Image source={Images.closeIcon} style={styles.closeIcon} />
              </Pressable>
            </View>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={id => handleRadio(id)}
              selectedId={selectedRadioId}
              containerStyle={styles.RadioGroup}
            />
          </View>
        </ReactNativeModal>
      )}

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
            <TouchableOpacity
              style={styles.ModalApplyButton}
              onPress={ModalApplyButton}>
              <Text style={styles.ApplyText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </ReactNativeModal>
      )}
    </ScreenTemplate>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  Header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  DrawerIcon: {width: '20%'},
  StylishLogo: {width: '60%', alignItems: 'center'},
  ProfilePic: {width: '20%', alignItems: 'flex-end'},
  SearchComponent: {
    alignItems: 'center',
    paddingVertical: hp(16),
  },
  Features: {
    flexDirection: 'row',
    justifyContent: 'center',
    // borderWidth: 1,
    marginBottom: hp(10),
  },
  AllFeaturedView: {
    width: wp(192),
  },
  Sort: {
    width: wp(61),
    marginRight: wp(12),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    backgroundColor: Colors.white,
    paddingHorizontal: wp(8),
    paddingVertical: hp(4),
    borderRadius: 6,
    fontFamily: 'Montserrat-Regular',
    color: Colors.Black,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: fs(12),
  },
  Filter: {
    width: wp(67),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    backgroundColor: Colors.white,
    paddingHorizontal: wp(8),
    paddingVertical: hp(4),
    borderRadius: 6,
    fontFamily: 'Montserrat-Regular',
    color: Colors.Black,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: fs(12),
  },
  AllFeatured: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
    fontSize: fs(20),
    color: Colors.Black,
  },
  FeaturesComponent: {
    marginTop: hp(17),
    paddingVertical: hp(8),
    paddingLeft: wp(8),
    backgroundColor: Colors.white,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  Adscard: {
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    height: hp(189),
    marginTop: hp(16),
  },
  DealoftheDay: {
    flexDirection: 'row',
    marginTop: hp(40),
    // borderWidth: 1,
    backgroundColor: Colors.DealofthDay,
    paddingVertical: hp(8),
    paddingHorizontal: wp(8),
    borderRadius: 8,
  },
  DOD1: {
    width: wp(234),
  },
  DODText1: {
    color: Colors.white,
    fontSize: fs(16),
    fontWeight: '500',
    fontFamily: 'Montserrat-Regular',
    marginBottom: hp(8),
  },
  DODText2: {
    color: Colors.white,
    fontSize: fs(12),
    fontWeight: '400',
    fontFamily: 'Montserrat-Regular',
    // marginBottom: hp(8),
  },
  ViewAll: {
    borderWidth: 1,
    height: fs(32),
    paddingHorizontal: wp(10),
    paddingVertical: hp(6),
    borderRadius: 4,
    borderColor: Colors.white,
    marginTop: hp(8),
    marginLeft: wp(24),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ViewAllText: {
    color: Colors.white,
    fontSize: fs(12),
    fontWeight: '600',
    fontFamily: 'Montserrat-Regular',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(4),
  },
  SpecialOfferView: {
    flexDirection: 'row',
    marginTop: hp(16),
    // borderWidth: 1,
    backgroundColor: Colors.white,
    paddingVertical: hp(12),
    paddingHorizontal: wp(8),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderRadius: 6,
  },
  SpecialOfferImage: {
    marginRight: wp(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  SOText1: {
    color: Colors.Black,
    fontSize: fs(16),
    fontWeight: '500',
    fontFamily: 'Montserrat-Regular',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(4),
    // borderWidth: 1,
  },
  SOText2: {
    color: Colors.Black,
    fontSize: fs(12),
    fontWeight: '300',
    fontFamily: 'Montserrat-Regular',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(4),
    width: wp(171),
    marginTop: hp(8),
  },
  SOemoji: {
    borderWidth: 1,
    marginLeft: 10,
  },
  HeelsImage: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  GroupStars: {
    right: wp(10),
    // borderWidth: 1,
  },
  Heels: {
    right: wp(70),
    // borderWidth: 1,
  },
  HeelsText1: {
    right: wp(50),
    top: hp(50),
    color: Colors.Black,
    fontSize: fs(16),
    fontWeight: '500',
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    width: wp(150),
  },
  HeelsText2: {
    right: wp(50),
    top: hp(50),
    color: Colors.Black,
    fontSize: fs(10),
    fontWeight: '400',
    fontFamily: 'Montserrat-Regular',
  },
  VisitnowText: {
    color: Colors.white,
    fontSize: fs(12),
    fontWeight: '500',
    fontFamily: 'Montserrat-Regular',
  },
  Visitnow: {
    borderWidth: 1,
    height: hp(24),
    width: wp(92),
    // paddingHorizontal: wp(8),
    paddingVertical: hp(4),
    borderRadius: 4,
    borderColor: Colors.Visitnow,
    backgroundColor: Colors.Visitnow,
    // marginTop: hp(8),
    // marginLeft: wp(24),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    right: wp(0),
    top: hp(60),
  },
  HotSummerSale: {
    marginTop: hp(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  NewArrivals: {
    flexDirection: 'row',
    width: wp(343),
    // marginTop: hp(40),
    // borderWidth: 1,
    backgroundColor: Colors.white,
    paddingVertical: hp(8),
    paddingHorizontal: wp(8),
    // borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  sponserdView: {
    paddingHorizontal: wp(16),
    backgroundColor: Colors.white,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    width: wp(343),
    alignSelf: 'center',
    marginVertical: hp(24),
    overflow: 'scroll',
  },
  sponserdText: {
    color: Colors.Black,
    fontSize: fs(20),
    fontWeight: '500',
    fontFamily: 'Montserrat-Regular',
    marginBottom: hp(12),
  },
  FiftyOff: {
    color: Colors.Black,
    fontSize: fs(16),
    fontWeight: '700',
    fontFamily: 'Montserrat-Regular',
    marginVertical: hp(12),
    width: wp(200),
    // borderWidth: 1,
  },
  FiftyOffView: {
    flexDirection: 'row',
    // borderWidth: 1,
    width: wp(327),
    justifyContent: 'space-between',
  },
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
  RadioGroup: {
    // borderWidth: 1,
    alignItems: 'flex-start',
    marginTop: hp(20),
    right: wp(10),
    padding: 0,
  },
  categoryheader: {
    color: Colors.Black,
    fontSize: fs(20),
    fontWeight: '700',
    fontFamily: 'Montserrat-Regular',
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
  ModalApplyButton: {
    bottom: hp(15),
  },
});
