import React, { useRef, useEffect, useState } from "react";
import { StyleSheet, View, Image, Text, ImageEditor } from "react-native";
import * as Print from "expo-print";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

const PrintLayout = ({ photos }) => {
  const [base64Photos, setBase64Photos] = useState([]);
  const [isReadyToPrint, setIsReadyToPrint] = useState(false);

  const formatDate = () => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date().toLocaleDateString("en-IN", options);
  };

  const currentDate = formatDate();

  const convertImagesToBase64 = async () => {
    try {
      const convertedPhotos = await Promise.all(
        photos.map(async (photo) => {
          const manipResult = await manipulateAsync(photo.uri, [], {
            base64: true,
            format: SaveFormat.PNG,
          });
          return `data:image/png;base64,${manipResult.base64}`;
        })
      );
      setBase64Photos(convertedPhotos);
      setIsReadyToPrint(true);
    } catch (error) {
      console.error("Failed to convert images to base64", error);
    }
  };

  useEffect(() => {
    convertImagesToBase64();
  }, []);

  useEffect(() => {
    if (isReadyToPrint) {
      const printLayout = async () => {
        try {
          const htmlContent = `
  <html>
    <head>
      <style>
        @page {
          size: 4in 6in; /* Set the page size to 4x6 inches */
          margin: 0;
          padding: 0;
        }
        body {
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
        }
        .photo-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: space-around;
          width: 100%;
          background-color: red
        }
        img {
          width: 44.55%;
          height: 43.2%;
        }
        .footer {
          margin: 10px 5px 0px 5px;
          width: 95%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="photo-container">
        ${base64Photos.map((photo) => `<img src="${photo}" />`).join("")}
      </div>
      <div class="footer">
        <p>${currentDate}</p>
        <p>Bengaluru</p>
        <p>12345</p>
      </div>
    </body>
  </html>
`;

          await Print.printAsync({ html: htmlContent });
        } catch (error) {
          console.error("Failed to print", error);
        }
      };

      printLayout();
    }
  }, [isReadyToPrint]);

  return (
    <View style={styles.container}>
      <Text>Preparing print preview...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
});

export default PrintLayout;
