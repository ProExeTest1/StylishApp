import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import ScreenTemplate from '../../components/ScreenTemplate';
import DrawerIcon from '../../assets/SVGs/DrawerIcon.svg';
import StylishLogo from '../../assets/SVGs/StylishLogo.svg';
import ProfilePic from '../../assets/SVGs/ProfilePic.svg';
import SearchComponent from '../../components/SearchComponent';
import {fs, hp, wp} from '../../helpers/ResponsiveFonts';
import {Colors} from '../../helpers/colors';
import FilterIcon from '../../assets/SVGs/FilterIcon.svg';
import SortIcon from '../../assets/SVGs/SortIcon.svg';
import {setProducts} from '../../Store/Reducer';
import {useDispatch, useSelector} from 'react-redux';
import {Products} from '../../helpers/interface';
import {ScrollView} from 'react-native-gesture-handler';
import ProductsList from '../../components/ProductsList';
import {useFocusEffect} from '@react-navigation/native';
import ReactNativeModal from 'react-native-modal';
import {Images} from '../../helpers/images';
import RadioGroup from 'react-native-radio-buttons-group';
import {radioButtons} from '../../helpers/appData';

const baseUrl = 'https://fakestoreapi.com/Wishlist';

const Wishlist = props => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [filterModel, setFilterModel] = useState(false);
  const [selectedRadioId, setSelectedRadioId] = useState(undefined);
  const dispatch = useDispatch();
  const stateData = useSelector(state => state.Reducers);
  const [search, setSearch] = useState('');
  const [refresh, setRefresh] = useState(false);

  console.log('selectedRadioId------------', selectedRadioId);

  useEffect(() => {
    // Check if the screen is refreshed (when refresh state is true)
    if (refresh) {
      console.log('Products---------------------', stateData.products);

      setData(stateData.products);
      setData2(stateData.products);

      const ids = stateData.products.map(({category}) => category);
      const tempData = stateData.products.filter(
        ({category}, index) => !ids.includes(category, index + 1),
      );

      console.log('--------------------tempData', tempData);

      setFilterData(tempData);

      // Reset the refresh state after data is refreshed
      setRefresh(false);
    }
  }, [refresh, stateData.products]);

  useFocusEffect(
    React.useCallback(() => {
      console.log('Screen is focused');

      // Your logic to update data here
      setRefresh(true);

      return () => {
        console.log('Screen is unfocused');
        setRefresh(false);
      };
    }, []),
  );

  const handleSort = () => {
    setFilterModel(true);
  };

  const handleRadio = id => {
    setSelectedRadioId(id);
    setFilterModel(!filterModel);

    if (id == '1') {
      let tempData = [...data];
      tempData.sort((a, b) => b.price - a.price);
      setData(tempData);
    } else if (id == '2') {
      let tempData = [...data];
      tempData.sort((a, b) => a.price - b.price);
      setData(tempData);
    }
  };

  const searchFilterFunction = text => {
    if (text) {
      const newData = data.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setData(newData);
      setSearch(text);
    } else {
      setData(data2);
      setSearch(text);
    }
  };

  return (
    <ScreenTemplate>
      <View style={styles.Header}>
        <TouchableOpacity style={styles.DrawerIcon}>
          <DrawerIcon />
        </TouchableOpacity>
        <View style={styles.StylishLogo}>
          <StylishLogo />
        </View>
        <View style={styles.ProfilePic}>
          <ProfilePic />
        </View>
      </View>
      <View style={styles.SearchComponent}>
        <SearchComponent onChangeText={text => searchFilterFunction(text)} />
      </View>
      <View style={styles.Features}>
        <View style={styles.AllFeaturedView}>
          <Text style={styles.AllFeatured}>
            {data?.filter(item => item.fav == true).length}+ Items
          </Text>
        </View>
        <TouchableOpacity style={styles.Sort} onPress={handleSort}>
          <Text>Sort</Text>
          <SortIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.Filter}>
          <Text>Filter</Text>
          <FilterIcon />
        </TouchableOpacity>
      </View>

      <ScrollView style={{flex: 1}}>
        <ProductsList
          Data={stateData.products?.filter(item => item.fav == true)}
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
              <TouchableOpacity onPress={() => setFilterModel(!filterModel)}>
                <Image source={Images.closeIcon} style={styles.closeIcon} />
              </TouchableOpacity>
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
    </ScreenTemplate>
  );
};

export default Wishlist;

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
    color: 'black',
    // fontWeight: 'bold',
    fontSize: fs(20),
    marginTop: hp(20),
    // alignSelf: 'center',
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
});