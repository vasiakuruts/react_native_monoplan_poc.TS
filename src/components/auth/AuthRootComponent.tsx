import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainPage from "../../pages/main/MainPage";
import FullInfoPage from "../../pages/full-info/FullInfoPage";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AuthRootComponent: FC = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainPage} />
        <Stack.Screen name="FullInfo" component={FullInfoPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AuthRootComponent;
