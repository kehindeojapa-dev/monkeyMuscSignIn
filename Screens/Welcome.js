import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { selectUsername, setUsername } from "../Redux/userData";
import tw from "tailwind-react-native-classnames";
import { DatabaseConnection } from "../Database/databaseConnection";

const db = DatabaseConnection.getConnection();

const Welcome = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // const username = useSelector(selectUsername);
  const [user, setUser] = useState(useSelector(selectUsername));

  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql("SELECT * FROM User", [], (tx, results) => {
        if (results.rows.length === 1) {
          const name = results.rows.item(0).Name;
          dispatch(setUsername(name));
          setUser(name);
        } else if (results.rows.length === 0) {
          navigation.navigate("SignUp");
        }
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={tw`text-white mb-2`}>{user}</Text>
      <Text style={tw`text-white text-xl`}>
        Welcome to Monkey Music Group Homes
      </Text>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
});
