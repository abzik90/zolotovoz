import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import { COLORS, SIZES } from '../constants'

const FileInput = ({label, style, handleOnPress}) => {
    return (
        <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleOnPress}
        style={{
            ...style

        }}
        >

        <View style={{
            position: 'relative',
            justifyContent: 'flex-end'
        }}>
        <Text style={{
            textAlign:'left',
            // fontWeight: 'bold'
        }}>
            {label}
        </Text>
          <AntDesignIcon name="upload" style={{
              position:"absolute",
              right:0,
              fontSize:30,
              color: COLORS.black
            }}/>
          </View>
        </TouchableOpacity>
    )
}

export default FileInput
