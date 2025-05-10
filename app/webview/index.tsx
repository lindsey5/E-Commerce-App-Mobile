import React from 'react';
import { WebView } from 'react-native-webview';
import { View, StyleSheet, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const WebViewScreen = () => {
  const { url } = useLocalSearchParams();

  if (!url) {
    return (
      <View style={styles.container}>
        <Text>No URL Provided</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView 
        source={{ uri: typeof url === 'string' ? url : url[0] }} 
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WebViewScreen;