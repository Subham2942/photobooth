import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";

const PrintLayout = ({ photos }) => {
  const formatDate = () => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date().toLocaleDateString("en-IN", options);
  };

  const currentDate = formatDate();
  return (
    <View style={styles.paper}>
      <View style={styles.photoGrid}>
        {photos.map((photo, index) => (
          <Image key={index} source={{ uri: photo.uri }} style={styles.photo} />
        ))}
       <View style={styles.footer}>
        <Text style={styles.footerText}>{currentDate}</Text>
        <Text style={styles.footerText}>Bengaluru</Text>
        <Text style={styles.footerText}>12345</Text>
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  paper: {
    flex: 1,
  },
  photoGrid: {
    flex: 1, // Take up the full screen
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    padding: "5%", // Add padding around the grid
    backgroundColor: "white",
  },
  photo: {
    width: "45%", // Each photo takes 45% of the paper's width
    height: "45%", // Each photo takes 45% of the paper's height
    margin: "2.5%", // Add some space between the photos
  },
  footer: {
    backgroundColor: "white",
    padding: "5%",
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  footerText: {
    fontWeight: 'bold',
  },
});

export default PrintLayout;
