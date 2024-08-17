import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, ScrollView } from 'react-native';

export default function Carousel({ photos, retakePhotos }) {
  return (
    <View style={styles.carouselContainer}>
      <ScrollView horizontal pagingEnabled>
        {photos.map((photo, index) => (
          <Image key={index} source={{ uri: photo.uri }} style={styles.image} />
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={retakePhotos}>
          <Text style={styles.text}>Retake</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 400,
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
});
