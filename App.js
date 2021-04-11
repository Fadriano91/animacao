import React, { useRef, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Alert, Platform, Animated } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import Writer from './components/Writer'

const TAMANHO_CIRCULO = 100


const Circulo = ({ onPress, animatedValue }) => {
const animatedBackground = animatedValue.interpolate({
  inputRange: [0, 0.0001, 0.5, 0.5001, 1],
  outputRange: ["#F2CDAC", "#F2CDAC","#F2CDAC", "#D3367F", "#D3367F"]
})

const animatedCirculo = animatedValue.interpolate({
  inputRange: [0, 0.0001, 0.5, 0.5001, 1],
  outputRange: ["#D3367F", "#D3367F","#D3367F", "#F2CDAC", "#F2CDAC"]
})

const animatedText = animatedValue.interpolate({
  inputRange: [0, 0.5, 1],
  outputRange: [20, 35, 20]
})

  return (
    < Animated.View style={[StyleSheet.absoluteFillObject, styles.containerCirculo,{backgroundColor: animatedBackground}]}>
      <Text style={styles.titulo}>Animações em React Native</Text>
      <Writer />
      
      <Animated.Text
      style={{
        fontSize: animatedText,
        color: animatedCirculo,
        margin: 10
      }}
      >Frase importante sobre React Native e o conceito de animações</Animated.Text>
      
      
      <Animated.View style={[styles.circulo,{
        backgroundColor: animatedCirculo,
        transform: [
        {
          rotateY: animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ['0deg', '-180deg', '0deg']
          })
        },
        {
          scale: animatedValue.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, 5, 1]
        })
        },
        {
          translateX: animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 50, 0]
          })
        }
        ]
      }]}>
      
      
      <TouchableOpacity onPress={onPress}>
        <Animated.View style={[styles.circulo,{backgroundColor:{animatedCirculo}}]}>
          <AntDesign name="arrowright" size={28} color={"#8c4227"} />
        </Animated.View>
      </TouchableOpacity>
      </ Animated.View>

      
        
      <TouchableOpacity onPress={onPress}>

      <AntDesign name="sound" size={28} color={"#8c4227"} />
      </TouchableOpacity>

      
    </Animated.View>
    
    
    
  )
}


export default function App() {
/*useRef é um hook que retorna um objeto mutável, no qaul a propriedade current 
  é inicializado com o argumento passado.
  O objeto retornado persistirá durante todo o ciclo de vida do componente.
  */

const animatedValue = useRef(new Animated.Value(0)).current
const [indice, setIndice] = useState(0)

const animation =(toValue) => Animated.timing(animatedValue, {
  toValue: toValue,
  duration: 3000,
  useNativeDriver: false
})

  const onPress = () => {
    setIndice(indice === 1 ? 0 : 1)
    animation(indice === 1 ? 0 : 1).start()
  }

  return (
    <View style={styles.container}>
      <Circulo onPress={onPress} animatedValue={animatedValue} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2CDAC",
    alignItems: 'center'
  },
  titulo: {
    fontSize: 25,
    color: "#D99873",
    paddingTop: 20
  },
  containerCirculo: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: TAMANHO_CIRCULO
  },
  circulo: {
    backgroundColor: "#D3367F",
    width: TAMANHO_CIRCULO,
    height: TAMANHO_CIRCULO,
    borderRadius: TAMANHO_CIRCULO / 2,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

