import React from "react";
import { FlatList } from "react-native";
import NoteCard from "./NoteCard";
import type { NoteItem } from "./types";

export default function NotesList({ data }: { data: NoteItem[] }) {
  return (
    <FlatList
      data={data}
      keyExtractor={(n) => n._id}
      renderItem={({ item }) => <NoteCard note={item} />}
      contentContainerStyle={{ paddingVertical: 8 }}
    />
  );
}