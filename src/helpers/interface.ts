import { CSSProperties, ReactNode } from "react";
import { Image, ImageProps, StyleProp, ViewStyle } from "react-native";


export interface AppProps { }
export interface PreviewProps {
  
 }
export interface PreviewDataProps {
  image: Image;
  headingText: String;
  bodyText: String;
}
export interface AuthTextInputProps {
  placeholder?: String,
  UserIcon?: boolean,
  PasswordIcon?: boolean,
  EmailIcon?: boolean,
  style?: ViewStyle,
  onChangeText?: (text: string) => void;
  CountryCode?: string,
  CountryPress?: () => void;
}
export interface ScreenTemplateProps {
  children: ReactNode;
  scroll?: boolean,
}

export type Rating = {
  rate: Number,
  count: Number ,
}

export type Products = {
  id: Number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: ImageProps,
  rating: Rating, 
}
