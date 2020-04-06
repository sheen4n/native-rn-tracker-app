import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Button, Text } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-navigation";

const AccountScreen = () => {
  const { signout } = useContext(AuthContext);
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Spacer>
        <Text h2>Account Screen</Text>
        <Button title="Sign Out" onPress={signout} />
      </Spacer>
    </SafeAreaView>
  );
};

AccountScreen.navigationOptions = {
  title: "Account",
  tabBarIcon: <FontAwesome name="gear" size={20}></FontAwesome>
};

const styles = StyleSheet.create({});

export default AccountScreen;
