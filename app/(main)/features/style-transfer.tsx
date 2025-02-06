import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { transferStyle } from "../../../services/ai-models/style-transfer";
import { FEATURES } from "../../../constants/features";
import ImagePreview from "../../../components/features/ImagePreview";
import React from "react";

export default function StyleTransfer() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [styledImage, setStyledImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const feature = FEATURES.find((f) => f.id === "style-transfer");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setStyledImage(null);
    }
  };

  const handleTransfer = async () => {
    if (!image || !prompt) return;

    try {
      setLoading(true);

      const result = await transferStyle(image, prompt);

      if (result.error) {
        Alert.alert("Hata", result.error);
      } else {
        setStyledImage(result.url);
      }
    } catch (error: any) {
      Alert.alert("Hata", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestedPrompt = (suggestedPrompt: string) => {
    setPrompt(suggestedPrompt);
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
          Stil Transferi
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Main Content */}
      <View className="flex-1 p-4">
        {/* Image Preview */}
        <ImagePreview
          image={image}
          processedImage={styledImage}
          onImagePick={pickImage}
          downloadFileName="styled-photo"
        />

        {/* Style Input */}
        <View className="bg-surface rounded-2xl p-4 mb-4">
          <TextInput
            className="text-text-primary font-Ubuntu p-3 bg-background-secondary rounded-xl"
            placeholder={feature?.promptPlaceholder}
            placeholderTextColor="#71717A"
            value={prompt}
            onChangeText={setPrompt}
            multiline
            numberOfLines={3}
            editable={!loading}
          />

          {/* Suggested Prompts */}
          {feature?.suggestedPrompts && (
            <View className="flex-row flex-wrap gap-2 mt-3">
              {feature.suggestedPrompts.map((suggestedPrompt) => (
                <TouchableOpacity
                  key={suggestedPrompt}
                  className="bg-background-secondary px-3 py-1 rounded-full"
                  onPress={() => handleSuggestedPrompt(suggestedPrompt)}
                  disabled={loading}
                >
                  <Text className="text-text-secondary">{suggestedPrompt}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Action Button */}
        <TouchableOpacity
          className={`w-full py-4 rounded-xl ${
            image && prompt && !loading ? "bg-primary" : "bg-surface"
          }`}
          onPress={handleTransfer}
          disabled={!image || !prompt || loading}
        >
          {loading ? (
            <View className="flex-row items-center justify-center">
              <ActivityIndicator color="#FFFFFF" />
              <Text className="text-text-primary font-Ubuntu-Medium ml-2">
                Dönüştürülüyor...
              </Text>
            </View>
          ) : (
            <Text
              className={`text-center font-Ubuntu-Medium ${
                image && prompt ? "text-text-primary" : "text-text-tertiary"
              }`}
            >
              Stili Uygula
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
