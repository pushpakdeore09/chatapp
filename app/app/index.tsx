import React from "react";
import ChatProvider from "./context/chat-context";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./component/app-navigator";

const App = () => {
  return (
    <SafeAreaProvider>
      <ChatProvider>
        <AppNavigator />
      </ChatProvider>
    </SafeAreaProvider>
  );
};

export default App;
