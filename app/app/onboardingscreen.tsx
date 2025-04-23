import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import Animated, {
  FadeInRight,
  FadeOutLeft,
  FadeInLeft,
  FadeOutRight,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import {
  MessageSquare,
  Users,
  Lock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react-native";
import * as Progress from "react-native-progress";
import { useChat } from "./context/chat-context";

const onboardingData = [
  {
    title: "Welcome to Chatrr",
    description:
      "Connect with friends, family, and colleagues instantly through seamless messaging.",
    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=60",
    icon: (color: string) => <MessageSquare size={32} color={color} />,
  },
  {
    title: "Group Conversations",
    description:
      "Create and join group chats to stay connected with your communities and teams.",
    image:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&auto=format&fit=crop&q=60",
    icon: (color: string) => <Users size={32} color={color} />,
  },
  {
    title: "Secure Messaging",
    description:
      "Your conversations are protected with end-to-end encryption for complete privacy.",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=60",
    icon: (color: string) => <Lock size={32} color={color} />,
  },
];


export default function OnboardingScreen() {
  const {loading} = useChat();
  const navigation = useNavigation<any>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  

 

  const handleNext = useCallback(() => {
    if (currentIndex < onboardingData.length - 1) {
      setDirection("forward");
      setCurrentIndex((prev) => prev + 1);
    } else {
      navigation.replace("SignIn");
    }
  }, [currentIndex]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setDirection("backward");
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const handleSkip = useCallback(() => {
    navigation.replace("SignIn");
  }, []);

  const currentItem = onboardingData[currentIndex];
  const isLastSlide = currentIndex === onboardingData.length - 1;
  const isFirstSlide = currentIndex === 0;

  return loading ? (
    <View className="flex-1 justify-center items-center bg-white">
      <Progress.Circle
        size={80}
        indeterminate={true}
        color="#2563EB"
        borderWidth={6}
        thickness={6}
      />
      <Text className="mt-4 text-gray-500 text-lg">Loading...</Text>
    </View>
  ) : (
    <View className="flex-1 bg-white">
      {/* Skip Button */}
      <TouchableOpacity
        className="absolute top-10 right-7"
        onPress={handleSkip}
      >
        <Text className="text-gray-600 font-medium text-xl">Skip</Text>
      </TouchableOpacity>

      {/* App Logo */}
      <View className="mt-20 items-center">
        <Image
          source={require("../assets/images/chatrr.png")}
          className="w-44 h-44"
          resizeMode="contain"
        />
      </View>

      {/* Onboarding Content */}
      <View className="flex-1 justify-center items-center px-5">
        <Animated.View
          key={currentIndex}
          entering={direction === "forward" ? FadeInRight : FadeInLeft}
          exiting={direction === "forward" ? FadeOutLeft : FadeOutRight}
          className="items-center w-full"
        >
          <View className="relative mb-10">
            <Image
              source={{ uri: currentItem.image }}
              className="w-[200px] h-[200px] rounded-full"
              resizeMode="cover"
            />
            <View className="absolute -bottom-6 -right-6 bg-white rounded-2xl w-16 h-16 justify-center items-center shadow-lg">
              {currentItem.icon("#2563EB")}
            </View>
          </View>
          <Text className="text-3xl font-bold text-gray-900 text-center mb-4 mt-5">
            {currentItem.title}
          </Text>
          <Text className="text-lg text-gray-600 text-center leading-7 px-5">
            {currentItem.description}
          </Text>
        </Animated.View>
      </View>

      {/* Navigation Buttons */}
      <View className="px-5 pb-10">
        <View className="flex-row justify-center mb-5">
          {onboardingData.map((_, index) => (
            <View
              key={index}
              className={`h-2 mx-1 rounded-full ${
                index === currentIndex ? "w-6 bg-blue-600" : "w-2 bg-gray-200"
              }`}
            />
          ))}
        </View>

        <View className="flex-row space-x-4 gap-4">
          {!isFirstSlide && (
            <TouchableOpacity
              className="flex-1 flex-row justify-center h-12 rounded-full items-center bg-gray-100"
              onPress={handlePrevious}
            >
              <ChevronLeft size={20} color="#4B5563" />
              <Text className="text-gray-700 text-lg font-semibold ml-2">
                Previous
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            className="flex-1 flex-row justify-center h-12 rounded-full items-center shadow-lg bg-blue-600"
            onPress={handleNext}
          >
            <Text className="text-white text-lg font-semibold mr-2">
              {isLastSlide ? "Start Chatting" : "Next"}
            </Text>
            {!isLastSlide && <ChevronRight size={20} color="white" />}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
