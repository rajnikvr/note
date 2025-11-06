import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { getNotes, saveNotes } from '../storage/noteStorage';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function HomeScreen({ navigation, toggleTheme, theme }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const unsub = navigation.addListener('focus', loadNotes);
    loadNotes();
    return unsub;
  }, []);

  const loadNotes = async () => {
    const saved = await getNotes();
    setNotes(saved);
  };

  const deleteNote = async (id) => {
    Alert.alert('Delete note', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const newNotes = notes.filter(n => n.id !== id);
          setNotes(newNotes);
          await saveNotes(newNotes);
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.colors.card }]}
      onPress={() => navigation.navigate('AddEditNote', { note: item })}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={[styles.title, { color: theme.colors.text }]} numberOfLines={1}>{item.title || 'Untitled'}</Text>
        <TouchableOpacity onPress={() => deleteNote(item.id)}>
          <Icon name="delete" size={26} color="#ff3b30" />
        </TouchableOpacity>
      </View>
      <Text style={{ color: theme.colors.text }} numberOfLines={2}>{item.details}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={notes}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={{ color: theme.colors.text, textAlign: 'center', marginTop: 40 }}>No notes yet</Text>}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
      />

      <TouchableOpacity
        style={[styles.addBtn, { backgroundColor: theme.colors.primary }]}
        onPress={() => navigation.navigate('AddEditNote')}
      >
        <Icon name="add" size={28} color={theme.colors.background} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: {
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    flexShrink: 1,
  },
  addBtn: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    borderRadius: 50,
    padding: 14,
  },
  themeToggle: {
    position: 'absolute',
    right: 20,
    top: 12,
    zIndex: 10,
  },
});
