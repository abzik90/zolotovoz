import {Dimensions} from "react-native";
const {width,height} = Dimensions.get("window");

export const COLORS = {
  primary : "#9863EC",
  black : "#322F3B",
  blue: "#2A6CF9",
  green: "#7fff7f",
  white : "#FFFFFF",
  lightGray : "#EFEFEF",
  transparent : "transparent",
  background : "#FFFFFF"
}

export const SIZES = {
  base: 10,
  radius:20,
  width,
  height
}

const theme = {COLORS,SIZES};
export default theme;
