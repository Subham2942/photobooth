import React, { useState, useRef, useEffect } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import PrintLayout from './Components/PrintLayout';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photos, setPhotos] = useState([]);
  const [isShooting, setIsShooting] = useState(false);
  const [isCameraReady, setIsCamerReady] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    let interval;
    
    if (countdown !== null) {
      interval = setInterval(() => {
        setCountdown(prev => {
          if (prev === 0) {
            clearInterval(interval);
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [countdown]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log("Captured photo URI:", photo.uri);
      setPhotos((prev) => [...prev, photo]);
    }
  };
  
  const startPhotoshoot = async () => {
    setIsShooting(true);
    setCountdown(5); // Set initial countdown for 5 seconds before the first photo
  
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    for (let i = 0; i < 4; i++) {
       // Set countdown for 3 seconds between photos
      await takePhoto();
      setCountdown(3);
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
    
    setIsShooting(false);
    setCountdown(null); // Reset countdown
  };
  
  
  const retakePhotos = () => {
    setPhotos([]);
    setIsShooting(false);
  };

  return (
    <View style={styles.container}>
      {photos.length < 4 ? (
        <CameraView style={styles.camera} facing={'front'} ref={cameraRef} onCameraReady={() => setIsCamerReady(true)}>
          <View style={styles.buttonContainer}>
            {!isShooting && (
              <TouchableOpacity style={styles.button} onPress={startPhotoshoot}>
                <Text style={styles.text}>Start Photoshoot</Text>
              </TouchableOpacity>
            )}
            {countdown !== null && (
              <View style={styles.countdownContainer}>
                <Text style={styles.countdownText}>{countdown} s</Text>
              </View>
            )}
          </View>
        </CameraView>
      ) : (
        <PrintLayout photos={photos} retakePhotos={retakePhotos} />
      )}
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
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  button: {
    padding: 20,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
  countdownContainer: {
    position: 'absolute',
    top: 50,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
  countdownText: {
    fontSize: 30,
    color: 'white',
  },
});
