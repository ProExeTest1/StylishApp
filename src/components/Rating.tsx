import React from 'react';
import {Image, View} from 'react-native';
import Starempty from '../assets/SVGs/Starempty.svg';
import Starfilled from '../assets/SVGs/Starfilled.svg';

interface RatingProps {
  rating: number;
}

const Rating = (props: RatingProps) => {
  // Determine the number of filled and empty stars based on the rating.
  //   const filledStars = Math.floor(rating);
  //   const halfStar = rating % 1 === 0.5;
  //   const stars = [];
  //   for (let i = 0; i < filledStars; i++) {
  //     stars.push(<Image key={i} name="star" size={30} color="gold" st  />);
  //   }
  //   if (halfStar) {
  //     stars.push(<Image key="half" name="star-half" size={30} color="gold" />);
  //   }
  //   while (stars.length < 5) {
  //     stars.push(
  //       <Icon key={stars.length} name="star-o" size={30} color="gold" />,
  //     );
  //   }

  //   return (<View style={{flexDirection: 'row'}}>{}</View>);

  return Array(Math.round(props.rating))
    ?.fill('')
    ?.map((item, index) => {
      index < Math.round(props.rating);
      return <Starfilled />;
    });
};
export default Rating;
