import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {CustomDropdownProps} from '../helpers/interface';
import {fs, hp, wp} from '../helpers/ResponsiveFonts';
import {Colors} from '../helpers/colors';

const CustomDropdown = (props: CustomDropdownProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (item: string) => {
    setOpen(false);
    props.onValueChange(item);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setOpen(!open)}
        style={styles.dropdownHeader}>
        {props.selectedValue ? (
          <Text style={styles.selectedValue}>Qty {props.selectedValue}</Text>
        ) : (
          <Text style={styles.placeholder}>{props.placeholder}</Text>
        )}
      </TouchableOpacity>
      {open && (
        <View style={styles.dropdownList}>
          {props.items.map(item => (
            <TouchableOpacity
              key={item}
              onPress={() => handleSelect(item)}
              style={styles.dropdownItem}>
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

// Usage in another screen
{
  /* <CustomDropdown
  items={[1, 2, 3, 4, 5]}
  selectedValue={selectedValue}
  onValueChange={value => setSelectedValue(value)}
  placeholder="Qty 1"
/>; */
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 5,
    // borderWidth: 1,
    width: wp(60),
    // height: hp(20),
    borderWidth: 0.3,
  },
  dropdownHeader: {
    backgroundColor: '#eee',
    padding: 10,
  },
  placeholder: {
    color: '#aaa', // Customize the placeholder text style
    fontSize: fs(12),
  },
  selectedValue: {
    fontSize: fs(12),
  },
  dropdownList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'white', // Set the background color to white or any other color you prefer
    border: '#ccc',
    borderWidth: 0.3,
    // height: hp(100),
    borderColor: '#ccc',
    zIndex: 10,
  },

  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    zIndex: 6,
    // backgroundColor: Colors.Red,
  },
});

export default CustomDropdown;
