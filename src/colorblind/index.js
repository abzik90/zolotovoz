import React from 'react';
import { View } from 'react-native';
import { HueRotate } from "gl-react-hue-rotate";

const ColorBlind = props => {
  let hue=0;
  if(props.type === "protanopia")
    hue=Math.PI*1/36;
  else if(props.type === "deuteranopia")
    hue=Math.PI*7/36;
  else if(props.type === "tritanopia")
    hue=Math.PI*182/180;
  return (<HueRotate hue={hue}>
      ...
    </HueRotate>)
}

export default ColorBlind;
