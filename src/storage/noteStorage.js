import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTES_KEY = 'NOTES_LIST';

export const getNotes = async () => {
  try {
    const raw = await AsyncStorage.getItem(NOTES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.warn('getNotes error', e);
    return [];
  }
};

export const saveNotes = async (notes) => {
  try {
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch (e) {
    console.warn('saveNotes error', e);
  }
};

export const clearAllNotes = async () => {
  try {
    await AsyncStorage.removeItem(NOTES_KEY);
  } catch (e) {
    console.warn('clearAllNotes error', e);
  }
};
