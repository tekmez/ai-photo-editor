import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { FEATURES } from "../../constants/features";
import FeatureCard from "../../components/features/FeatureCard";

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

      {/* Features Grid */}
      <ScrollView className="flex-1 p-4">
        <Text className="text-xl font-Ubuntu-Medium text-text-primary mb-4">
          Özellikler
        </Text>

        <View className="flex-row flex-wrap gap-4">
          {FEATURES.map((feature) => (
            <View key={feature.id} style={{ width: "47%" }}>
              <FeatureCard feature={feature} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
