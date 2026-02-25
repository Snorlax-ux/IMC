import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={ require("./unnamed.png")}  
      />
      <Text style={styles.texto}>Calculadora de IMC</Text>
      <TextInput 
        style={styles.TextInput}
        placeholder='digite sua altura'
      />
      <TextInput
        style={styles.TextInput}
        placeholder='digite seu peso'
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  logo: {
    width: 300,
    height: 300,
  },
  texto: {
    fontSize: 30,
  },
  TextInput:{
    borderColor: '#bdbdbd',
    borderWidth: 1,
    borderRadius: 100,
    fontFamily: 'Times New Roman',
    padding: 10,
    
  }
});
