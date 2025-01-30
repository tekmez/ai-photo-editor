import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export default function Edit() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
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
          Fotoğraf Düzenle
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Main Content */}
      <View className="flex-1 p-4">
        {/* Image Preview */}
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

        {/* Prompt Input */}
        <View className="bg-surface rounded-2xl p-4 mb-4">
          <TextInput
            className="text-text-primary font-Ubuntu p-3 bg-background-secondary rounded-xl"
            placeholder="Fotoğrafı nasıl düzenlemek istediğinizi açıklayın..."
            placeholderTextColor="#71717A"
            value={prompt}
            onChangeText={setPrompt}
            multiline
            numberOfLines={3}
          />
          <View className="flex-row flex-wrap gap-2 mt-3">
            <TouchableOpacity
              className="bg-background-secondary px-3 py-1 rounded-full"
              onPress={() => setPrompt("Arka planı bulanıklaştır")}
            >
              <Text className="text-text-secondary">
                Arka planı bulanıklaştır
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-background-secondary px-3 py-1 rounded-full"
              onPress={() => setPrompt("Gün batımı efekti ekle")}
            >
              <Text className="text-text-secondary">Gün batımı efekti</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-background-secondary px-3 py-1 rounded-full"
              onPress={() => setPrompt("Anime tarzına dönüştür")}
            >
              <Text className="text-text-secondary">Anime tarzı</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity
          className={`w-full py-4 rounded-xl ${
            image && prompt ? "bg-primary" : "bg-surface"
          }`}
          disabled={!image || !prompt || loading}
        >
          <Text
            className={`text-center font-Ubuntu-Medium ${
              image && prompt ? "text-text-primary" : "text-text-tertiary"
            }`}
          >
            {loading ? "Düzenleniyor..." : "Düzenle"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
