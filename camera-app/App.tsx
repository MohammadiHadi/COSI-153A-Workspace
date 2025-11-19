import {CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
const [permission, requestPermission] = useCameraPermissions();
const [facing, setFacing] = useState<CameraType>('back');
const [isCameraReady, setIsCameraReady] = useState(false);

const cameraRef = useRef<CameraView | null>(null);

  if (!permission) {
  return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
      <Text style={styles.message}> We need your permission to show the camera</Text>
      <Button onPress={requestPermission} title="Grant permission" />
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
      console.log('Photo URI:', photo.uri);
      alert('Photo taken! Check console for URI.');
    } catch (err) {
      console.warn('Error taking photo:', err);
    }
  };



  return (
    <View style={styles.container}>
    {/* <Text style={styles.message}>
    Camera permission granted!
    </Text>  */}
    <CameraView style={{ flex: 1 }} ref={cameraRef} facing={facing} onCameraReady={() => setIsCameraReady(true)} />
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.smallButton} onPress={toggleCamera}>
        <Text style={styles.text}>Flip</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.shutterButton} onPress={handleTakePhoto}   disabled={!isCameraReady}
>
        <View style={styles.shutterInner} />
      </TouchableOpacity>
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

});

