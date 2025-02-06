import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { repairPhoto } from "../../../services/ai-models/photo-repair";
import React from "react";

export default function PhotoRepair() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [repairedImage, setRepairedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setRepairedImage(null);
    }
  };

  const handleRepair = async () => {
    if (!image) return;

    try {
      setLoading(true);

      const result = await repairPhoto(image);

      if (result.error) {
        Alert.alert("Hata", result.error);
      } else {
        setRepairedImage(result.url);
      }
    } catch (error: any) {
      Alert.alert("Hata", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="light" />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pt-safe-top pb-4 bg-background-secondary">
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="text-xl font-Ubuntu-Medium text-text-primary">
          Fotoğraf Onarımı
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Main Content */}
      <ScrollView className="flex-1 p-4">
        {/* Image Preview - Before */}
        <Text className="text-lg font-Ubuntu-Medium text-text-primary mb-2">
          Orijinal Fotoğraf
        </Text>
        {image ? (
          <View className="aspect-[4/3] w-full bg-surface rounded-2xl overflow-hidden mb-4">
            <Image
              source={{ uri: image }}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>
        ) : (
          <TouchableOpacity
            onPress={pickImage}
            className="aspect-[4/3] w-full bg-surface rounded-2xl items-center justify-center mb-4"
          >
            <MaterialIcons
              name="add-photo-alternate"
              size={48}
              color="#6366F1"
            />
            <Text className="text-text-secondary mt-2">Fotoğraf Seç</Text>
          </TouchableOpacity>
        )}

        {/* Image Preview - After */}
        {repairedImage && (
          <>
            <Text className="text-lg font-Ubuntu-Medium text-text-primary mb-2">
              Onarılmış Fotoğraf
            </Text>
            <View className="aspect-[4/3] w-full bg-surface rounded-2xl overflow-hidden mb-4">
              <Image
                source={{ uri: repairedImage }}
                className="w-full h-full"
                resizeMode="contain"
              />
            </View>
          </>
        )}

        {/* Action Button */}
        <TouchableOpacity
          className={`w-full py-4 rounded-xl ${
            image && !loading ? "bg-primary" : "bg-surface"
          }`}
          onPress={handleRepair}
          disabled={!image || loading}
        >
          {loading ? (
            <View className="flex-row items-center justify-center">
              <ActivityIndicator color="#FFFFFF" />
              <Text className="text-text-primary font-Ubuntu-Medium ml-2">
                Onarılıyor...
              </Text>
            </View>
          ) : (
            <Text
              className={`text-center font-Ubuntu-Medium ${
                image ? "text-text-primary" : "text-text-tertiary"
              }`}
            >
              Fotoğrafı Onar
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
