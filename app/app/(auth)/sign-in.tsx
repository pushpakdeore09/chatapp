import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserRound } from "lucide-react-native";
import apiClient from "../../api/apiClient"; 
import Toast from 'react-native-toast-message';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const { height } = Dimensions.get("window");

const SignInScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSignin = async () => {
    if (!email || !password) {
      Alert.alert("All fields are required");
      return;
    }

    try {
      const response = await apiClient.post("/user/v1/login", {
        email,
        password,
      })
      
      
      if (response.status === 200) {
        setEmail("");
        setPassword("");
        
        
        await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
        await AsyncStorage.setItem("token", response.data.token);
        
        Toast.show({
          type: 'success',
          text1: 'Login successful!',
          visibilityTime: 2000,
        });
        navigation.navigate('ChatScreen' as never);

      }
    } catch (error: any) {
      console.log(error);
      
      Alert.alert("Error", error.response.data);
      
    }
  }

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
          
          {/* Top blue header */}
          <View
            className="bg-blue-700 px-6 rounded-b-3xl justify-center items-center"
            style={{ height: height * 0.4 }}
          >
            <UserRound color="white" size={48} className="mb-4" />
            <Text className="text-4xl font-bold text-white mb-2 text-center">
              Sign in to your account
            </Text>
            <Text className="text-white text-base text-center">
              Enter your email and password to continue
            </Text>
          </View>

          {/* Form section */}
          <View className="flex-1 px-6 -mt-16 pb-10">
            <View className="bg-white rounded-3xl p-6 shadow-xl">
              <TouchableOpacity className="border border-gray-300 py-3 rounded-xl mb-4">
                <Text className="text-center text-sm">
                  Continue with Google
                </Text>
              </TouchableOpacity>

              <Text className="text-center text-gray-400 text-xs mb-4">OR</Text>

              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                placeholderTextColor="#9CA3AF"
                className="border border-gray-300 rounded-xl px-4 py-3 mb-4 text-sm"
              />
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                className="border border-gray-300 rounded-xl px-4 py-3 mb-2 text-sm"
              />

              <TouchableOpacity className="mb-4 self-end" onPress={() => {
                navigation.navigate("ResetPassword" as never);
              }}>
                <Text className="text-blue-500 text-xs font-semibold">
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              <TouchableOpacity className="bg-blue-600 py-3 rounded-xl mb-4 shadow-md" onPress={handleSignin}>
                <Text className="text-white text-center font-semibold text-sm">
                  Log In
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push("/(auth)/sign-up")}
                className="mt-6"
              >
                <Text className="text-center text-sm text-gray-500">
                  Don’t have an account?{" "}
                  <Text className="text-blue-500 font-bold">Sign Up</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignInScreen;
