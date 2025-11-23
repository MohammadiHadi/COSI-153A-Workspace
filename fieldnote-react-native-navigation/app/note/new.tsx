import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { useNotes } from "../../src/context/NotesContext";
import { useTheme } from "../../src/context/ThemeContext";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";


export default function NewNote() {
  const { isDarkMode } = useTheme();
  const backgroundColor = isDarkMode ? "#121212" : "#ffffff";
  const textColor = isDarkMode ? "#ffffff" : "#000000";
  const inputBackgroundColor = isDarkMode ? "#1e1e1e" : "#f9f9f9";
  const { addNote } = useNotes();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");
  const [isCameraReady, setIsCameraReady] = useState(false);
  const cameraRef = useRef<CameraView | null>(null);

  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);

  const toggleFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const handleTakePhoto = async () => {
    if (!cameraRef.current || !isCameraReady) return;
    try {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);
      setShowCamera(false);
    } catch (err) {
      console.warn("Error taking photo:", err);
    }
  };

  const handleRetake = () => {
    setPhotoUri(null);
    setShowCamera(false);
  };

  const onSave = async () => {
    if (!title.trim() && !body.trim()) return;

    await addNote(
      {
        title,
        body,
        createdAt: Date.now(),
      },
      photoUri 
    );

    router.back();
  };


  
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.h1, { color: textColor }]}>New Note</Text>

      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        style={[styles.input, { color: textColor, backgroundColor: inputBackgroundColor }]}
      />
      <TextInput
        value={body}
        onChangeText={setBody}
        placeholder="Write something..."
        multiline
        submitBehavior= 'blurAndSubmit'
        style={[styles.input, styles.multiline, { color: textColor }, { backgroundColor: inputBackgroundColor }]}
      />
      {photoUri && (
        <View style={{ marginTop: 12 }}>
          <Image
            source={{ uri: photoUri }}
            style={{ width: "100%", height: 200, borderRadius: 8 }}
            resizeMode="cover"
          />
          <Pressable onPress={handleRetake} style={{ marginTop: 8 }}>
            <Text style={[styles.btn, { color: textColor }]}>Remove photo</Text>
          </Pressable>
        </View>
      )}

      <View style={{ marginTop: 12 }}>
        <Pressable onPress={() => { 
          setPhotoUri(null);
          setShowCamera(true)}}>
          <Text style={[styles.btn, { color: textColor }]}>
            {photoUri ? "Retake photo" : "Add photo"}
          </Text>
        </Pressable>
      </View>

      {showCamera && (
        <View style={{ marginTop: 16, height: 360 }}>
          {!permission?.granted ? (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ color: textColor, marginBottom: 8 }}>
                Camera permission is required to attach a photo.
              </Text>
              <Pressable onPress={requestPermission}>
                <Text style={[styles.btn, { color: textColor }]}>Grant Permission</Text>
              </Pressable>
            </View>
          ) : (
            <View style={{ flex: 1 }}>
              <CameraView
                style={{ flex: 1, borderRadius: 12, overflow: "hidden" }}
                facing={facing}
                ref={cameraRef}
                onCameraReady={() => setIsCameraReady(true)}
              />
              <View
                style={{
                  position: "absolute",
                  bottom: 16,
                  left: 0,
                  right: 0,
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                  <TouchableOpacity onPress={() => setShowCamera(false)}>
                    <Text style={{ color: "#fff" }}>Close</Text>
                  </TouchableOpacity>
                                  <TouchableOpacity
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 36,
                    borderWidth: 4,
                    borderColor: "#fff",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={handleTakePhoto}
                  disabled={!isCameraReady}
                >
                  <View
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 26,
                      backgroundColor: "#fff",
                    }}
                  />
                </TouchableOpacity>
                  <TouchableOpacity onPress={toggleFacing}>
                    <Text style={{ color: "#fff" }}>Flip</Text>
                  </TouchableOpacity>

              </View>
            </View>
          )}
        </View>
      )}

      <View style={styles.actions}>
        <Pressable onPress={() => router.back()}>
          <Text style={[styles.btn, { color: textColor }]}>Cancel</Text>
        </Pressable>

        <Pressable onPress={onSave}>
          <Text
            style={[styles.btn, { color: textColor }]}
        
          >
            Save
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  h1: { fontSize: 20, fontWeight: "700", marginBottom: 4 },
  input: { backgroundColor: "#fff", borderRadius: 8, borderWidth: 1, borderColor: "#ddd", padding: 10 },
  multiline: { minHeight: 120, textAlignVertical: "top" },
  actions: { flexDirection: "row", gap: 12, marginTop: 8 },
  btn: { paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8, overflow: "hidden", fontWeight: "600" },
  cancel: { backgroundColor: "#eee", color: "#333" },
  save: { backgroundColor: "#1f6feb", color: "#fff" }
});