import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  SafeAreaView,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setUsername as setUser } from "../Redux/userData";
import { DatabaseConnection } from "../Database/databaseConnection";

const db = DatabaseConnection.getConnection();

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='User'",
        [],
        function (tx, res) {
          console.log("item:", res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql("DROP TABLE IF EXISTS User", []);
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS User (ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Password TEXT)",
              []
            );
          }
        }
      );
    });
  }, []);

  const handleSignUp = () => {
    if (
      username.length === 0 &&
      password.length === 0 &&
      confirmPassword.length === 0
    ) {
      alert("All field is required");
    } else if (password !== confirmPassword) {
      alert("Password matching failed");
    } else {
      // createTable();

      // // Check for length
      db.transaction((tx) => {
        tx.executeSql("SELECT * FROM User", [], (tx, results) => {
          console.log(results.rows.length);
          if (results.rows.length === 1) {
            tx.executeSql(
              "UPDATE User SET Name=?, Password=?",
              [username.toLowerCase(), password],
              (tx, result) => {
                if (result.rowsAffected == 1) {
                  dispatch(setUser(username));
                  setTimeout(() => {
                    navigation.navigate("SignUp");
                  }, 500);
                }
              }
            );
            console.log("Wetin dey happen");
          } else if (results.rows.length === 0) {
            tx.executeSql(
              "INSERT INTO User (Name, Password) VALUES(?,?)",
              [username, password],
              (tx, result) => {
                if (result) {
                  dispatch(setUser(username));
                  setTimeout(() => {
                    navigation.navigate("SignUp");
                  }, 500);
                }
              }
            );
          }
        });
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={tw`w-80 ml-auto mr-auto`}>
        <View style={tw`mb-20`}>
          <Text style={tw`text-white text-2xl font-bold`}>Create</Text>
          <Text style={tw`text-white text-2xl font-bold`}>an account</Text>
          <Text style={tw`text-white text-xs mt-2`}>
            Fill the details & create your account
          </Text>
        </View>
        <View style={tw``}>
          <TextInput
            placeholder="Username/ Email ID"
            placeholderTextColor="#999"
            style={styles.input}
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#999"
            style={styles.input}
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#999"
            style={styles.input}
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <Button style={styles.button} onPress={() => handleSignUp()}>
            <Text style={tw`text-xs capitalize text-black font-bold`}>
              Continue
            </Text>
          </Button>
        </View>
        <View style={tw`mt-9`}>
          <Text style={tw`text-white ml-auto mr-auto text-xs`}>
            or sign in with
          </Text>
          <View style={styles.iconContainer}>
            <Image
              style={{ width: 50, height: 50 }}
              source={{
                uri: "https://img.icons8.com/color/48/000000/facebook-new.png",
              }}
            />
            <Image
              style={{ width: 50, height: 50 }}
              source={{
                uri:
                  "https://img.icons8.com/color-glass/48/000000/google-logo.png",
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  input: {
    height: 40,
    color: "#fff",
    // placeholderTextColor: "#999",
    borderWidth: 2,
    borderColor: "orangered",
    borderRadius: 20,
    paddingLeft: 25,
    fontSize: 16,
    marginBottom: 13,
    // outline: "none",
  },
  button: {
    height: 40,
    backgroundColor: "orangered",
    borderWidth: 2,
    borderColor: "orangered",
    borderRadius: 20,
    marginTop: 13,
  },
  iconContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    // gap: 25,
    marginTop: 8,
  },
});
