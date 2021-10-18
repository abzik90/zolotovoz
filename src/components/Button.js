import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { COLORS, SIZES } from '../constants'

const Button = ({label, isPrimary, style, handleOnPress}) => {
    return (
        <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleOnPress}
        style={{
            paddingVertical: SIZES.base*1.5,
            backgroundColor: isPrimary ? COLORS.blue : COLORS.green,
            borderWidth: 3,
            borderColor: isPrimary ? COLORS.blue : COLORS.green,
            borderRadius: 30,
            width: SIZES.base*30,
            height:SIZES.base*6,
            margin:SIZES.base*0.5,
            alignItems: 'center',
            ...style

        }}
        >
        <Text style={{
            color: COLORS.white,
            fontSize: 20,
            // fontWeight: 'bold'
        }}>
            {label}
        </Text>
        </TouchableOpacity>

    )
}

export default Button
