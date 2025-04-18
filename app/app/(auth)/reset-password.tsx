import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Mail } from "lucide-react-native";
import apiClient from "../../api/apiClient"; 

const { height } = Dimensions.get("window");

const ResetPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otpArray, setOtpArray] = useState(["", "", "", "", "", ""]);
  const [showNewPasswordForm, setShowNewPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const inputsRef = useRef<Array<TextInput | null>>([]);

  const handleResetPassword = () => {
    if (!email.trim()) {
      setEmailError("Please enter your email.");
      return;
    }

    setEmailError("");
    console.log("Password reset email sent to:", email);
    setShowOTP(true);
  };

  const handleOTPChange = (text: string, index: number) => {
    if (/^\d$/.test(text)) {
      const updatedOtp = [...otpArray];
      updatedOtp[index] = text;
      setOtpArray(updatedOtp);

      if (index < 5 && inputsRef.current[index + 1]) {
        inputsRef.current[index + 1]?.focus();
      }
    } else if (text === "") {
      const updatedOtp = [...otpArray];
      updatedOtp[index] = "";
      setOtpArray(updatedOtp);
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === "Backspace" && !otpArray[index] && index > 0) {
      if (inputsRef.current[index - 1]) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmitOTP = async () => {
    const finalOTP = otpArray.join("");
    console.log("Submitted OTP:", finalOTP);

    try {
      const response = await apiClient.post("/user/v1/verify-otp", {

      })

      

      if (response) {
        setShowNewPasswordForm(true);
      } else {
        Alert.alert("Invalid OTP", "The OTP you entered is incorrect.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong while verifying the OTP.");
    }
  };

  const handleSetNewPassword = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    // Call API to set new password
    console.log("New password set:", newPassword);
    Alert.alert("Success", "Your password has been reset successfully.");
    navigation.goBack(); // Or navigate to login
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
          {/* Top section */}
          <View
            className="bg-blue-700 px-6 rounded-b-3xl justify-center items-center"
            style={{ height: height * 0.4 }}
          >
            <Mail color="white" size={48} className="mb-4" />
            <Text className="text-4xl font-bold text-white mb-2 text-center">
              Reset Your Password
            </Text>
            <Text className="text-white text-base text-center">
              {showNewPasswordForm
                ? "Set your new password"
                : showOTP
                ? `Enter the OTP sent to ${email}`
                : "Enter your email to receive an OTP to reset your password."}
            </Text>
          </View>

          {/* Form Section */}
          <View className="flex-1 px-6 -mt-16 pb-10">
            <View className="bg-white rounded-3xl p-6 shadow-xl">
              {!showOTP && !showNewPasswordForm && (
                <>
                  <TextInput
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      setEmailError("");
                    }}
                    placeholder="Enter your email"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="email-address"
                    className="border border-gray-300 rounded-xl px-4 py-3 mb-6 text-md"
                  />
                  {emailError ? (
                    <Text className="text-red-500 mb-2 text-sm">
                      {emailError}
                    </Text>
                  ) : null}
                  <TouchableOpacity
                    onPress={handleResetPassword}
                    className="bg-blue-600 py-3 rounded-xl mb-4 shadow-md"
                  >
                    <Text className="text-white text-center font-semibold text-sm">
                      Send OTP
                    </Text>
                  </TouchableOpacity>
                </>
              )}

              {showOTP && !showNewPasswordForm && (
                <>
                  <View className="flex-row justify-between px-2 mb-6">
                    {otpArray.map((digit, index) => (
                      <TextInput
                        key={index}
                        ref={(ref) => (inputsRef.current[index] = ref)}
                        value={digit}
                        onChangeText={(text) => handleOTPChange(text, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        keyboardType="number-pad"
                        maxLength={1}
                        className="w-12 h-14 border border-gray-300 rounded-xl text-center text-lg bg-gray-100"
                      />
                    ))}
                  </View>
                  <TouchableOpacity
                    onPress={handleSubmitOTP}
                    className="bg-blue-600 py-3 rounded-xl mb-4 shadow-md"
                  >
                    <Text className="text-white text-center font-semibold text-sm">
                      Submit OTP
                    </Text>
                  </TouchableOpacity>
                </>
              )}

              {showNewPasswordForm && (
                <>
                  <TextInput
                    value={newPassword}
                    onChangeText={setNewPassword}
                    placeholder="New Password"
                    secureTextEntry
                    placeholderTextColor="#9CA3AF"
                    className="border border-gray-300 rounded-xl px-4 py-3 mb-4 text-md"
                  />
                  <TextInput
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Confirm Password"
                    secureTextEntry
                    placeholderTextColor="#9CA3AF"
                    className="border border-gray-300 rounded-xl px-4 py-3 mb-6 text-md"
                  />
                  <TouchableOpacity
                    onPress={handleSetNewPassword}
                    className="bg-blue-600 py-3 rounded-xl shadow-md"
                  >
                    <Text className="text-white text-center font-semibold text-sm">
                      Set New Password
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;
