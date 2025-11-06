// src/components/NoteCard.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function NoteCard({ note, onPress, onDelete, colors }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>{note.title || 'Untitled'}</Text>
        <Text style={{ color: colors.text }} numberOfLines={3}>{note.details}</Text>
      </View>
      <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
        <Icon name="delete" size={20} color="#e53935" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 14,
    borderRadius: 10,
    marginVertical: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  deleteBtn: { marginLeft: 12, padding: 6 },
});
