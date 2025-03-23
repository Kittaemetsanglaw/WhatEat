import React, { useState } from "react";
import { View, Text, Pressable, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import axios from 'axios';

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ฟังก์ชันสำหรับการล็อกอิน
  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/login', { 
        name: email, 
        password: password 
      });
      console.log("Login successful:", response.data);
      // หากล็อกอินสำเร็จ คุณสามารถนำข้อมูลที่ได้มาใช้งานหรือไปที่หน้า Home ได้
      navigation.navigate('Home');
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Login failed: " + (error.response?.data || error.message));
    } finally {
      setLoading(false);
    }
  };

  const onPress = (email, password) => {
    navigation.navigate('ForgetPassword', { email: email, password: password });
    console.log(email, password);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email / Username"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <Pressable onPress={() => onPress(email, password)}>
        <View style={styles.Foget_Password}>
          <Text style={styles.text}>Forget Password</Text>
        </View>
      </Pressable>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading} // ปิดการใช้งานปุ่มเมื่อกำลังโหลด
        >
          <Text style={styles.buttonText}>
            {loading ? "Loading..." : "LOG IN"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#FFF9ED",
  },
  input: {
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    paddingLeft: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  Foget_Password: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  text: {
    color: "#616161",
  },
  button: {
    backgroundColor: "#FDD406", // สีฟ้า
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
    marginRight: 20,
    width: 200,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
