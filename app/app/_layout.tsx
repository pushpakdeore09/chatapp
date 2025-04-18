import { Stack } from "expo-router";
import "../global.css";
import ChatProvider from "./context/chat-context";
import React from "react";

export default function RootLayout() {
  return (
    <ChatProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
       
      </Stack>
    </ChatProvider>
  );
}
