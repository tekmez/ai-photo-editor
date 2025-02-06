import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { repairPhoto } from "../../../services/ai-models/photo-repair";
import ImagePreview from "../../../components/features/ImagePreview";
import React from "react";

export default function PhotoRepair() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [repairedImage, setRepairedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
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
      <View className="flex-1 p-4">
        {/* Image Preview */}
        <ImagePreview
          image={image}
          processedImage={repairedImage}
          onImagePick={pickImage}
          downloadFileName="repaired-photo"
        />

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
      </View>
    </View>
  );
}
