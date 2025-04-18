import React from 'react';
import ChatProvider from './context/chat-context';
import DrawerNavigator from './component/drawer-navigation'; 
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      
        <ChatProvider>
          <DrawerNavigator />
          
        </ChatProvider>
     
    </SafeAreaProvider>
  );
};

export default App;
