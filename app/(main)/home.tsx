import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";

export default function Home() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="light" />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pt-safe-top pb-4 bg-background-secondary">
        <Text className="text-2xl font-Ubuntu-Bold text-text-primary">
          AI Photo Editor
        </Text>
        <TouchableOpacity
          className="bg-primary px-4 py-2 rounded-full"
          onPress={() => router.push("/modals/subscription")}
        >
          <Text className="text-text-primary font-Ubuntu-Medium">Premium</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View className="flex-1 items-center justify-center p-4">
        <View className="bg-surface rounded-3xl p-8 items-center w-full max-w-sm">
          <MaterialIcons name="add-photo-alternate" size={64} color="#6366F1" />
          <Text className="text-xl font-Ubuntu-Medium text-text-primary mt-4 text-center">
            Fotoğraf Seç veya Çek
          </Text>
          <Text className="text-text-secondary text-center mt-2">
            Fotoğrafını seç ve AI ile düzenlemeye başla
          </Text>
          <TouchableOpacity
            className="bg-primary w-full py-4 rounded-xl mt-6"
            onPress={() => router.push("/(main)/edit")}
          >
            <Text className="text-text-primary font-Ubuntu-Medium text-center">
              Başla
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
