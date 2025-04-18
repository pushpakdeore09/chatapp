import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
const navigation = useNavigation();

const handleBackPress = () => {
    navigation.navigate('ChatScreen' as never)
};

return (
    <View className="flex-1 justify-center items-center">
        <Text className="text-xl font-bold">ProfileScreen</Text>
        {/* Back Button */}
        <TouchableOpacity
            onPress={handleBackPress}
            className="mt-5 p-3 bg-blue-500 rounded-md"
        >
        <Text className="text-white text-lg">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
