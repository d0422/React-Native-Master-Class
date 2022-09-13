import AppLoading from "expo-app-loading";
import React from "react";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Asset, useAssets } from "expo-asset";
import { Text } from "react-native";
import Tabs from "./navigation/Tabs";
import { NavigationContainer } from "@react-navigation/native";
// const loadFonts = (fonts)=>fonts.map(font=>Font.loadAsync(font))
// const loadAssets =(assets)=> assets.map(asset=>{
//   if(typeof asset===String){
//     return Image.prefetch(asset)
//   }
//   else
//     return Asset.loadAsync(asset)
// })
export default function App() {
  // const [ready, setReady] = useState(false);
  // const onFinish = () => setReady(ture);
  // const startLoading = async () => {
  //   const fonts=loadFont([Ionicons.font])
  //   await Promise.all(fonts)
  // };
  const [assets] = useAssets([]);
  const [loaded] = Font.useFonts(Ionicons.font);
  if (!assets || !loaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}
