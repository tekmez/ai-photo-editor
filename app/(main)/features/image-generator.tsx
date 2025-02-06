import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  TextInput,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { generateImage } from "../../../services/ai-models/image-generator";
import { FEATURES } from "../../../constants/features";

export default function ImageGenerator() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const feature = FEATURES.find((f) => f.id === "image-generator");

  const handleGenerate = async () => {
    if (!prompt) return;

    try {
      setLoading(true);

      const result = await generateImage(prompt);

      if (result.error) {
        Alert.alert("Hata", result.error);
      } else {
        setGeneratedImage(result.url);
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
          Görsel Oluşturucu
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Main Content */}
      <ScrollView className="flex-1 p-4">
        {/* Prompt Input */}
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

        {/* Image Preview */}
        {generatedImage ? (
          <View className="aspect-square w-full bg-surface rounded-2xl overflow-hidden mb-4">
            <Image
              source={{ uri: generatedImage }}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>
        ) : (
          <View className="aspect-square w-full bg-surface rounded-2xl items-center justify-center mb-4">
            <MaterialIcons name="image" size={48} color="#6366F1" />
            <Text className="text-text-secondary mt-2">
              Görsel oluşturmak için prompt girin
            </Text>
          </View>
        )}

        {/* Action Button */}
        <TouchableOpacity
          className={`w-full py-4 rounded-xl ${
            prompt && !loading ? "bg-primary" : "bg-surface"
          }`}
          onPress={handleGenerate}
          disabled={!prompt || loading}
        >
          {loading ? (
            <View className="flex-row items-center justify-center">
              <ActivityIndicator color="#FFFFFF" />
              <Text className="text-text-primary font-Ubuntu-Medium ml-2">
                Oluşturuluyor...
              </Text>
            </View>
          ) : (
            <Text
              className={`text-center font-Ubuntu-Medium ${
                prompt ? "text-text-primary" : "text-text-tertiary"
              }`}
            >
              Görsel Oluştur
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
