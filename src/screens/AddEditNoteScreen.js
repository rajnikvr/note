import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { getNotes, saveNotes } from '../storage/noteStorage';

export default function AddEditNoteScreen({ route, navigation, theme }) {
  const note = route.params?.note;
  const [title, setTitle] = useState(note ? note.title : '');
  const [details, setDetails] = useState(note ? note.details : '');

  useLayoutEffect(() => {
    navigation.setOptions({ title: note ? 'Edit Note' : 'Add Note' });
  }, [navigation, note]);

  const saveNote = async () => {
    const notes = await getNotes();
    let newNotes;
    if (note) {
      newNotes = notes.map((n) =>
        n.id === note.id ? { ...n, title, details } : n
      );
    } else {
      const newNote = { id: Date.now(), title, details };
      newNotes = [newNote, ...notes];
    }
    await saveNotes(newNotes);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={{ padding: 16 }}>
        <TextInput
          placeholder="Title"
          style={[
            styles.input,
            {
              color: theme.colors.text,
              borderColor: theme.colors.border,
            },
          ]}
          placeholderTextColor={
            theme.dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)'
          }
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          placeholder="Details"
          style={[
            styles.input,
            {
              color: theme.colors.text,
              borderColor: theme.colors.border,
            },
          ]}
          placeholderTextColor={
            theme.dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)'
          }
          multiline
          value={details}
          onChangeText={setDetails}
        />

        <Button title="Save Note" onPress={saveNote} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
});
