import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import savoryFoods from '../../backend/Models/diabetes/savoryFoods'

const HomePage = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        {savoryFoods.map((item) => (
          <View key={item.id} style={styles.foodItem}>
            <Text style={styles.foodName}>{item.name}</Text>
            <Text style={styles.foodBenefits}>{item.benefits}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  foodItem: {
    marginBottom: 12,
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
  },
  foodName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  foodBenefits: {
    fontSize: 14,
    color: "#555",
  },
});
