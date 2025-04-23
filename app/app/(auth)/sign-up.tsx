import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { UserRound } from "lucide-react-native";
import apiClient  from "../../api/apiClient"; 
import Toast from 'react-native-toast-message';
import { useRouter } from "expo-router";
const { height } = Dimensions.get("window");

const SignUpScreen = () => {
  const router = useRouter()
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Submit handler
  const handleSignUp = async () => {
    if (!firstName || !lastName || !email || !password) {
      Alert.alert("All fields are required");
      return;
    }
  
    try {
      const response = await apiClient.post("/user/v1/register", {
        firstName,
        lastName,
        email,
        password,
      });
  
      if (response.status === 201) {
        setFirstName("");
        setLastName("");  
        setEmail("");
        setPassword("");
        Toast.show({
          type: 'success',
          text1: 'Account created successfully!',
          visibilityTime: 2000,
        })
        navigation.navigate("SignIn" as never);
      } else {
        Alert.alert("Signup failed", "Unexpected response from server.");
      }
    } catch (error: any) {
      Alert.alert("Error", error.response.data);
      
    }
  };
  
  

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Top blue section */}
          <View
            className="bg-blue-700 px-6 rounded-b-3xl justify-center items-center"
            style={{ height: height * 0.4 }}
          >
            <UserRound color="white" size={48} className="m-8" />
            <Text className="text-4xl font-bold text-white mb-2 text-center">
              Create Account
            </Text>
            <Text className="text-white text-base text-center">
              Let’s get you started
            </Text>
          </View>

          {/* Form Section */}
          <View className="flex-1 px-6 -mt-16 pb-10">
            <View className="bg-white rounded-3xl p-6 shadow-xl">
              <TextInput
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
                placeholderTextColor="#9CA3AF"
                className="border border-gray-300 rounded-xl px-4 py-3 mb-3 text-sm"
              />
              <TextInput
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
                placeholderTextColor="#9CA3AF"
                className="border border-gray-300 rounded-xl px-4 py-3 mb-3 text-sm"
              />
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                className="border border-gray-300 rounded-xl px-4 py-3 mb-3 text-sm"
              />
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                className="border border-gray-300 rounded-xl px-4 py-3 mb-4 text-sm"
              />

              <TouchableOpacity
                className="bg-blue-600 py-3 rounded-xl mb-4 shadow-md"
                onPress={handleSignUp}
              >
                <Text className="text-white text-center font-semibold text-sm">
                  Sign Up
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push("/(auth)/sign-in")}
              >
                <Text className="text-center text-sm text-gray-500">
                  Already have an account?{" "}
                  <Text className="text-blue-500 font-bold">Log In</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
