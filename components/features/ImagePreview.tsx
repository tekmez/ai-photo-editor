import React from "react";
import { View, Image, TouchableOpacity, Alert, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";

interface ImagePreviewProps {
  image: string | null;
  processedImage?: string | null;
  onImagePick: () => void;
  emptyStateText?: string;
  downloadFileName?: string;
}

export default function ImagePreview({
  image,
  processedImage,
  onImagePick,
  emptyStateText = "Fotoğraf Seç",
  downloadFileName = "processed-image",
}: ImagePreviewProps) {
  const handleDownload = async (imageUrl: string) => {
    try {
      const filename = imageUrl.split("/").pop() || `${downloadFileName}.jpg`;
      const directory = FileSystem.documentDirectory;

      if (!directory) {
        throw new Error("Dosya dizini bulunamadı");
      }

      await FileSystem.downloadAsync(imageUrl, directory + filename);
      Alert.alert("Başarılı", "Fotoğraf başarıyla indirildi!");
    } catch (error) {
      Alert.alert("Hata", "Fotoğraf indirilirken bir hata oluştu");
    }
  };

  if (processedImage) {
    return (
      <View className="aspect-[4/3] w-full bg-surface rounded-2xl overflow-hidden mb-4 relative">
        <Image
          source={{ uri: processedImage }}
          className="w-full h-full"
          resizeMode="contain"
        />
        <View className="absolute top-2 right-2 flex-row space-x-2">
          <TouchableOpacity
            onPress={onImagePick}
            className="w-12 h-12 bg-black/50 rounded-full items-center justify-center"
          >
            <MaterialIcons name="edit" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDownload(processedImage)}
            className="w-12 h-12 bg-black/50 rounded-full items-center justify-center"
          >
            <MaterialIcons name="file-download" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (image) {
    return (
      <View className="aspect-[4/3] w-full bg-surface rounded-2xl overflow-hidden mb-4 relative">
        <Image
          source={{ uri: image }}
          className="w-full h-full"
          resizeMode="contain"
        />
        <View className="absolute top-2 right-2">
          <TouchableOpacity
            onPress={onImagePick}
            className="w-12 h-12 bg-black/50 rounded-full items-center justify-center"
          >
            <MaterialIcons name="edit" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={onImagePick}
      className="aspect-[4/3] w-full bg-surface rounded-2xl items-center justify-center mb-4"
    >
      <MaterialIcons name="add-photo-alternate" size={48} color="#6366F1" />
      <Text className="text-text-secondary mt-2">{emptyStateText}</Text>
    </TouchableOpacity>
  );
}
