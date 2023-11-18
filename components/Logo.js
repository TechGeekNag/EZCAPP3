import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
    return <Image source={require('../assets/HBL_trans.png')} style={styles.image} />
  }
  
  const styles = StyleSheet.create({
    image: {
      width: 320,
      height: 110,
      marginBottom: 15,
    },
  })  