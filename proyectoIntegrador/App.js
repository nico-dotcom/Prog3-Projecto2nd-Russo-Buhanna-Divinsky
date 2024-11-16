import { StyleSheet, Text, View } from 'react-native';
import {NavegationContainer} from "@react-navegation/native"
import NavegacionPrincipal from "./src/navegation/NavegacionPrincipal"

export default function App(){
  return (
    <NavegationContainer>
      <NavegacionPrincipal/>
    </NavegationContainer>
  )
}