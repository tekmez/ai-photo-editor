import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";

export default function Profile() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="light" />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pt-safe-top pb-4 bg-background-secondary">
        <Text className="text-2xl font-Ubuntu-Bold text-text-primary">
          Profil
        </Text>
        <TouchableOpacity
          className="bg-primary px-4 py-2 rounded-full"
          onPress={() => router.push("/modals/subscription")}
        >
          <Text className="text-text-primary font-Ubuntu-Medium">Premium</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView className="flex-1 p-4">
        {/* User Info */}
        <View className="bg-surface rounded-2xl p-4 mb-4">
          <View className="flex-row items-center">
            <View className="w-16 h-16 rounded-full bg-background-secondary items-center justify-center">
              <MaterialIcons name="person" size={32} color="#6366F1" />
            </View>
            <View className="ml-4">
              <Text className="text-lg font-Ubuntu-Medium text-text-primary">
                Misafir Kullanıcı
              </Text>
              <Text className="text-text-secondary">Ücretsiz Plan</Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View className="flex-row gap-4 mb-4">
          <View className="flex-1 bg-surface rounded-2xl p-4">
            <Text className="text-3xl font-Ubuntu-Bold text-text-primary">
              0
            </Text>
            <Text className="text-text-secondary">Düzenleme</Text>
          </View>
          <View className="flex-1 bg-surface rounded-2xl p-4">
            <Text className="text-3xl font-Ubuntu-Bold text-text-primary">
              3
            </Text>
            <Text className="text-text-secondary">Kalan Hak</Text>
          </View>
        </View>

        {/* Menu */}
        <View className="bg-surface rounded-2xl">
          <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-background">
            <View className="flex-row items-center">
              <MaterialIcons name="history" size={24} color="#6366F1" />
              <Text className="text-text-primary ml-3">Düzenleme Geçmişi</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#71717A" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-background">
            <View className="flex-row items-center">
              <MaterialIcons name="settings" size={24} color="#6366F1" />
              <Text className="text-text-primary ml-3">Ayarlar</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#71717A" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between p-4">
            <View className="flex-row items-center">
              <MaterialIcons name="help" size={24} color="#6366F1" />
              <Text className="text-text-primary ml-3">Yardım</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#71717A" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
