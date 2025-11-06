import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AddEditNoteScreen from '../screens/AddEditNoteScreen';

const Stack = createStackNavigator();

export default function AppNavigator({ theme, toggleTheme }) {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={({ navigation }) => ({
            title: 'My Notes',
            headerRight: () => (
              <TouchableOpacity
                onPress={toggleTheme}
                style={{ marginRight: 15 }}
              >
                <Icon
                  name="brightness-6"
                  size={24}
                  color={theme.colors.text}
                />
              </TouchableOpacity>
            ),
            headerStyle: { backgroundColor: theme.colors.card },
            headerTitleStyle: { color: theme.colors.text },
          })}
        >
          {props => (
            <HomeScreen {...props} toggleTheme={toggleTheme} theme={theme} />
          )}
        </Stack.Screen>
        <Stack.Screen name="AddEditNote" options={{ title: 'Add / Edit Note' }}>
          {props => <AddEditNoteScreen {...props} theme={theme} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
