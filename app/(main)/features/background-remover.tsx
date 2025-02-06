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
import { removeBackground } from "../../../services/ai-models/background-remover";
import ImagePreview from "../../../components/features/ImagePreview";

export default function BackgroundRemover() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setProcessedImage(null);
    }
  };

  const handleProcess = async () => {
    if (!image) return;

    try {
      setLoading(true);

      const result = await removeBackground(image);

      if (result.error) {
        Alert.alert("Hata", result.error);
      } else {
        setProcessedImage(result.url);
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
          Arka Plan Kaldırma
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Main Content */}
      <View className="flex-1 p-4">
        {/* Image Preview */}
        <ImagePreview
          image={image}
          processedImage={processedImage}
          onImagePick={pickImage}
          downloadFileName="background-removed"
        />

        {/* Action Button */}
        <TouchableOpacity
          className={`w-full py-4 rounded-xl ${
            image && !loading ? "bg-primary" : "bg-surface"
          }`}
          onPress={handleProcess}
          disabled={!image || loading}
        >
          {loading ? (
            <View className="flex-row items-center justify-center">
              <ActivityIndicator color="#FFFFFF" />
              <Text className="text-text-primary font-Ubuntu-Medium ml-2">
                İşleniyor...
              </Text>
            </View>
          ) : (
            <Text
              className={`text-center font-Ubuntu-Medium ${
                image ? "text-text-primary" : "text-text-tertiary"
              }`}
            >
              Arka Planı Kaldır
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
