import 'react-native-gesture-handler'; // must be at top
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from './src/navigation/AppNavigator';
import { lightTheme, darkTheme } from './src/theme/theme';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTheme();
  }, []);

  // Safe loader with validation & fallback
  const loadTheme = async () => {
    try {
      const raw = await AsyncStorage.getItem('isDarkTheme');
      if (raw === null) {
        setIsDark(false);
      } else {
        // try parse; also handle the case someone saved "true" string earlier
        try {
          const parsed = JSON.parse(raw);
          if (typeof parsed === 'boolean') {
            setIsDark(parsed);
          } else {
            // fallback for legacy string values
            setIsDark(raw === 'true');
            await AsyncStorage.setItem('isDarkTheme', JSON.stringify(raw === 'true'));
          }
        } catch (e) {
          // if JSON.parse fails, fallback
          setIsDark(raw === 'true');
          await AsyncStorage.setItem('isDarkTheme', JSON.stringify(raw === 'true'));
        }
      }
    } catch (e) {
      console.warn('Error loading theme:', e);
      setIsDark(false);
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = async () => {
    const next = !isDark;
    setIsDark(next);
    try {
      await AsyncStorage.setItem('isDarkTheme', JSON.stringify(next));
    } catch (e) {
      console.warn('Error saving theme:', e);
    }
  };

  if (loading) {
    return (
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const theme = isDark ? darkTheme : lightTheme;

  return <AppNavigator theme={theme} toggleTheme={toggleTheme} />;
}
