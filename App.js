import React, { useState } from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ScrollView
} from "react-native";

export default function App() {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [resultado, setResultado] = useState(null);
  const [classificacao, setClassificacao] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [corResultado, setCorResultado] = useState("#fff");

  function calcularIMC() {
    const pesoNum = parseFloat(peso);
    let alturaNum = parseFloat(altura);

    if (!peso || !altura) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    if (isNaN(pesoNum) || isNaN(alturaNum)) {
      Alert.alert("Erro", "Digite apenas números válidos.");
      return;
    }

    if (pesoNum <= 0 || alturaNum <= 0) {
      Alert.alert("Erro", "Peso e altura devem ser maiores que zero.");
      return;
    }

    // Converter cm para metros automaticamente
    if (alturaNum > 3) {
      alturaNum = alturaNum / 100;
    }

    if (alturaNum === 0) {
      Alert.alert("Erro", "Altura não pode ser zero.");
      return;
    }

    const imc = pesoNum / (alturaNum * alturaNum);
    const imcFinal = imc.toFixed(2);

    let nivel = "";
    let msg = "";
    let cor = "";

    if (imc < 18.5) {
      nivel = "Abaixo do peso";
      msg = "Atenção: você está abaixo do peso ideal.";
      cor = "#17a2b8";
    } else if (imc < 24.9) {
      nivel = "Peso normal";
      msg = "Parabéns! Você está dentro da faixa ideal.";
      cor = "#28a745";
    } else if (imc < 29.9) {
      nivel = "Sobrepeso";
      msg = "Atenção: sobrepeso. Considere hábitos mais saudáveis.";
      cor = "#ffc107";
    } else if (imc < 34.9) {
      nivel = "Obesidade Grau I";
      msg = "Atenção: obesidade grau I. Procure orientação profissional.";
      cor = "#fd7e14";
    } else if (imc < 39.9) {
      nivel = "Obesidade Grau II";
      msg = "Atenção: obesidade grau II. Procure orientação médica.";
      cor = "#dc3545";
    } else {
      nivel = "Obesidade Grau III (Obesidade mórbida)";
      msg = "Atenção: obesidade mórbida. Busque acompanhamento médico.";
      cor = "#721c24";
    }

    setResultado(imcFinal);
    setClassificacao(nivel);
    setMensagem(msg);
    setCorResultado(cor);
  }

  function limparCampos() {
    setPeso("");
    setAltura("");
    setResultado(null);
    setClassificacao("");
    setMensagem("");
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <Image
        source={{
          uri: "https://play-lh.googleusercontent.com/ouL1lfSP_CyUgb5OUvI51jG3cevMfulA1GZGtS63r3Xfa8STYiIxq6KiY3PkMc6PcTk"
        }}
        style={styles.logo}
      />

      <Text style={styles.titulo}>Calculadora de IMC</Text>

      <TextInput
        style={styles.input}
        placeholder="Peso (kg)"
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
      />

      <TextInput
        style={styles.input}
        placeholder="Altura (m ou cm)"
        keyboardType="numeric"
        value={altura}
        onChangeText={setAltura}
      />

      <View style={styles.botoes}>
        <TouchableOpacity style={styles.botaoCalcular} onPress={calcularIMC}>
          <Text style={styles.textoBotao}>Calcular IMC</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoLimpar} onPress={limparCampos}>
          <Text style={styles.textoBotao}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {resultado && (
        <View style={[styles.cardResultado, { backgroundColor: corResultado }]}>
          <Text style={styles.resultadoTexto}>IMC: {resultado}</Text>
          <Text style={styles.resultadoTexto}>{classificacao}</Text>
          <Text style={styles.resultadoTexto}>{mensagem}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f4f6f9"
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: "contain"
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#fff"
  },
  botoes: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
    marginBottom: 20
  },
  botaoCalcular: {
    flex: 1,
    backgroundColor: "#4e73df",
    padding: 15,
    borderRadius: 8,
    alignItems: "center"
  },
  botaoLimpar: {
    flex: 1,
    backgroundColor: "#858796",
    padding: 15,
    borderRadius: 8,
    alignItems: "center"
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold"
  },
  cardResultado: {
    width: "100%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    elevation: 5
  },
  resultadoTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5
  }
});