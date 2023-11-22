import { Image } from "react-native"
import { Images } from "./images"
import { RadioButtonProps } from "react-native-radio-buttons-group"
import { useMemo } from "react"

export const PreviewData = [
    {
        image: Images.choose_products,
        headingText: "Choose Products",
        bodyText: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
    },
    {
        image: Images.make_payment,
        headingText: "Make Payment",
        bodyText: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
    },
    {
        image: Images.get_your_order,
        headingText: "Get Your Order",
        bodyText: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
    },
]

export type FeatureType = {
    feature: string,
}
export const FearuresData : Array<FeatureType> = [
    { feature: 'Beauty' },
    { feature: 'Fashion' },
    { feature: 'Kids' },
    { feature: 'Mens' },
    { feature: 'Womens' },
]

export type AdsCardsType= {
    Image?: Image;
    category?: string,
}
export const AdsCardsData : Array<AdsCardsType> = [
    { Image: Images.AdsCard, category: 'smartphones' },
    { Image: Images.AdsCard, category: 'laptops' },
    { Image: Images.AdsCard, category: 'fragrances' },
]

export type ProductImagesType = {
    Images?: Image;
}


export type ShoppingCardType= {
    Image?: Image,
    Title?: string,
    Desc?: string,
    Price?: Number,
    MRP?: Number,
    Discount?: Number,
    NoOfRatings?: Number,
}
export const ShoppingCardData : Array<ShoppingCardType> = [
    {
        Image: Images.ShoppingCard, Title: 'Women Printed Kurta', Desc: 'Neque porro quisquam est qui dolorem ipsum quia',
        Price: 1500, MRP: 2499, Discount: 40, NoOfRatings: 56890
    },
    {
        Image: Images.ShoppingCard, Title: 'Women Printed Kurta', Desc: 'Neque porro quisquam est qui dolorem ipsum quia',
        Price: 1500, MRP: 2499, Discount: 40, NoOfRatings: 56890
    },
    {
        Image: Images.ShoppingCard, Title: 'Women Printed Kurta', Desc: 'Neque porro quisquam est qui dolorem ipsum quia',
        Price: 1500, MRP: 2499, Discount: 40, NoOfRatings: 56890
    },
    {
        Image: Images.ShoppingCard, Title: 'Women Printed Kurta', Desc: 'Neque porro quisquam est qui dolorem ipsum quia',
        Price: 1500, MRP: 2499, Discount: 40, NoOfRatings: 56890
    },
]
export const TrendingProductsData : Array<ShoppingCardType> = [
    {
        Image: Images.TrendingProducts, Title: `IWC Schaffhausen 2021 Pilot's Watch "SIHH 2019" 44mm`, Desc: 'Neque porro quisquam est qui dolorem ipsum quia',
        Price: 1500, MRP: 2499, Discount: 40, NoOfRatings: 56890
    },
    {
        Image: Images.TrendingProducts, Title: `IWC Schaffhausen 2021 Pilot's Watch "SIHH 2019" 44mm`, Desc: 'Neque porro quisquam est qui dolorem ipsum quia',
        Price: 1500, MRP: 2499, Discount: 40, NoOfRatings: 56890
    },
    {
        Image: Images.TrendingProducts, Title: `IWC Schaffhausen 2021 Pilot's Watch "SIHH 2019" 44mm`, Desc: 'Neque porro quisquam est qui dolorem ipsum quia',
        Price: 1500, MRP: 2499, Discount: 40, NoOfRatings: 56890
    },
    {
        Image: Images.TrendingProducts, Title: `IWC Schaffhausen 2021 Pilot's Watch "SIHH 2019" 44mm`, Desc: 'Neque porro quisquam est qui dolorem ipsum quia',
        Price: 1500, MRP: 2499, Discount: 40, NoOfRatings: 56890
    },
]

 export const radioButtons: RadioButtonProps[] = [
      {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Price: High to Low',
        value: 'hightolow',
      },
      {
        id: '2',
        label: 'Price: Low to High',
        value: 'lowtohigh',
         },
    //   {
    //     id: '3', // acts as primary key, should be unique and non-empty string
    //     label: 'All Products',
    //     value: 'allproducts',
    //   },
 ]
    
  export const radioButtons2: RadioButtonProps[] = [
      {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Rating',
        value: 'rating',
      },
  ]
    
  export type SettingsDataType= {
      id: number,
      title: string, 
      description: string,
      screenname: string
}
export const SettingsData : Array<SettingsDataType> = [
    { id: 1, title: 'My orders', description: 'Already have 12 orders', screenname: 'Myorders' },
    { id: 2, title: 'Shipping addresses', description: '3 addresses', screenname: 'Shippingaddresses' },
    { id: 3, title: 'Settings', description: 'Notifications, password', screenname: 'SettingsProfile' },
]
