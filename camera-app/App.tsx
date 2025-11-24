import {CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';

import { Platform } from 'react-native';

const LOCALHOST = Platform.OS === 'android'
    ? 'http://10.0.2.2:3000' // Android emulator special localhost
    : 'http://localhost:3000'; // iOS simulator & web

const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? LOCALHOST;
type Photo = {
  id: string;
  url: string;
  publicId: string;
};
export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);

  const cameraRef = useRef<CameraView | null>(null);


useEffect(() => {
  const loadPhotos = async () => {
    try {
      const res = await fetch(`${BASE_URL}/photos`);
      const data = await res.json();
      if (data.success) {
        setPhotos(data.photos);
      } else {
        console.warn('Failed to load photos:', data.error);
      }
    } catch (err) {
      console.warn('Error loading photos:', err);
    }
  };

  loadPhotos();
}, []);

  if (!permission) {
    // Permission request is still loading
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Camera permission is required to use this app.</Text>
        <Button title="Request Camera Permission" onPress={requestPermission} />
      </View>
    );
  }

  function toggleCamera() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  const handleTakePhoto = async () => {
    if (!cameraRef.current || !isCameraReady) return;

    try {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);
    } catch (err) {
      console.warn('Error taking photo:', err);
    }
  };
  const handleRetake = () => {setPhotoUri(null);};
  const handleUploadPhoto = async () => {
    if (!photoUri) { alert('No photo to upload.'); return; }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', {uri: photoUri,name: 'photo.jpg',type: 'image/jpeg',} as any);

      const response = await fetch(`${BASE_URL}/upload`, {method: 'POST',body: formData,});

      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }

      alert('Photo uploaded successfully!');
    } catch (err: any) {
      alert('Failed to upload photo');
    } finally {
      setIsUploading(false);
    }
  };


 if (photoUri) {
    return (
      <View style={styles.previewContainer}>
        <Image source={{ uri: photoUri }} style={styles.previewImage} />
        <View style={styles.previewButtons}>
          <TouchableOpacity style={styles.previewButton} onPress={handleRetake}>
            <Text style={styles.previewButtonText}>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.previewButton,
              isUploading && styles.previewButtonDisabled,
            ]}
            onPress={handleUploadPhoto}
            disabled={isUploading}>
            <Text style={styles.previewButtonText}>
              {isUploading ? 'Uploading…' : 'Upload'}
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  }




  return (
    <View style={styles.container}>
    <CameraView style={{ flex: 1 }} ref={cameraRef} facing={facing} onCameraReady={() => setIsCameraReady(true)} />
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.smallButton} onPress={toggleCamera}>
        <Text style={styles.text}>Flip</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.shutterButton} onPress={handleTakePhoto} disabled={!isCameraReady}>
        <View style={styles.shutterInner} />
      </TouchableOpacity>
    </View>
    <View style={styles.galleryContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {photos.map(photo => (
          <Image
            key={photo.id}
            source={{ uri: photo.url }}
            style={styles.galleryImage}
          />
        ))}
      </ScrollView>
    </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
    buttonContainer: {
    position: 'absolute',
    bottom: 64,
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 64,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  smallButton: { 
    paddingHorizontal: 
    16,paddingVertical: 10, 
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  text: { fontSize: 16, fontWeight: 'bold', color: 'white',},
  shutterButton: { width: 80, height: 80, borderRadius: 40, borderWidth: 4,borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterInner: { width: 60, height: 60, borderRadius: 30, backgroundColor: 'white',},
previewContainer: { flex: 1, backgroundColor: 'black',},
previewImage: {flex: 1,resizeMode: 'contain',},
previewButtons: {position: 'absolute',bottom: 64,width: '100%',alignItems: 'center',},
previewButton: {backgroundColor: 'white',paddingHorizontal: 24,paddingVertical: 12,borderRadius:24,},
previewButtonText: {fontSize: 16,fontWeight: '600',},
previewButtonDisabled: {
  opacity: 0.6,
},
galleryContainer: {position: 'absolute',bottom: 0,width: '100%',paddingVertical: 8,     	paddingHorizontal: 8,backgroundColor: 'rgba(0,0,0,0.4)',},

galleryImage: {width: 64,height: 64,borderRadius: 8,marginRight: 8,backgroundColor: '#ccc',},

});

