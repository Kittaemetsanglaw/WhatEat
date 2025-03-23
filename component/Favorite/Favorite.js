import React from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import { savoryFoods } from "../../backend/Models/diabetes/savoryFoods";

const FavoriteScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorite ❤️</Text>
      <FlatList
        data={savoryFoods}
        keyExtractor={(item) => item.name} // ใช้ชื่อเป็น key
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.benefits}>{item.benefits}</Text>
              <Text style={styles.calories}>{item.calories} kcal</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCEFEF",
    padding: 15,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#D72638",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  benefits: {
    fontSize: 14,
    color: "#2E8B57",
    marginTop: 5,
  },
  calories: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
});

export default FavoriteScreen;
