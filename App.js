import {
  FlatList,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  SectionList,
  TextInput,
  Image,
} from "react-native";
import PokemonCard from "./components/PokemonCard";
import { useState } from "react";

export default function App() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    success: false,
    errors: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = () => {
    if (formData?.username?.length > 0 || formData?.password?.length > 0) {
      return setFormData((curr) => ({
        ...curr,
        success: true,
        errors: { username: null, password: null },
      }));
    }
    if (formData?.password?.length === 0) {
      console.log("herre");
      setFormData((curr) => ({
        ...curr,
        success: false,
        errors: {
          password: "Invalid Password",
          username: curr?.errors.username,
        },
      }));
    }
    if (formData?.username?.length === 0) {
      console.log("herre username");

      setFormData((curr) => ({
        ...curr,
        success: false,
        errors: {
          username: "Invalid Username",
          password: curr?.errors.password,
        },
      }));
    }
  };
  console.log(formData?.errors);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Image source={require("./assets/icon.png")} style={styles.image} />
        <View style={styles.form}>
          <Text
            style={{
              color: "green",
              fontSize: 16,
              textAlign: "center",
              marginBottom: 5,
            }}
          >
            {formData?.success ? "Success" : ""}
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              value={formData?.username}
              onChangeText={(value) =>
                setFormData((curr) => ({
                  ...curr,
                  username: value,
                  errors: { ...curr?.errors, username: null },
                }))
              }
              style={styles.textInput}
            />
            <Text style={styles.error}>{formData?.errors?.username || ""}</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              value={formData?.password}
              onChangeText={(value) =>
                setFormData((curr) => ({
                  ...curr,
                  password: value,
                  errors: { ...curr?.errors, password: null },
                }))
              }
              style={styles.textInput}
              secureTextEntry
            />
            <Text style={styles.error}>{formData?.errors?.password || ""}</Text>
          </View>
          <Button title="Submit" color="dodgerblue" onPress={handleSubmit} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    backgroundColor: "white",
    width: "90%",
    padding: 20,
    elevation: 5,
    borderWidth: 2,
    borderColor: "#d9d9d9",
    borderRadius: 5,
    alignItems: "center",
    gap: 20,
  },
  form: {
    gap: 10,
    paddingHorizontal: 30,
    marginBottom: 10,
  },

  image: { width: 150, height: 150 },
  inputContainer: {
    minWidth: 270,
    gap: 6,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#888",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 2,
  },
  label: {
    fontSize: 16,
    color: "dodgerblue",
  },
  error: {
    fontSize: 14,
    color: "red",
  },
});
