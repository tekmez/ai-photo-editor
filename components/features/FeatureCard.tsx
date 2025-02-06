import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Feature } from "../../types/feature";
import { useRouter } from "expo-router";
import React from "react";

interface FeatureCardProps {
  feature: Feature;
}

export default function FeatureCard({ feature }: FeatureCardProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      className="bg-surface rounded-xl p-4 flex-1"
      onPress={() => router.push(feature.route as any)}
    >
      <View className="items-center">
        <View className="aspect-auto w-40 h-32 bg-background-secondary rounded-lg mb-2 items-center justify-center overflow-hidden">
          {feature.sampleImage ? (
            <Image
              source={feature.sampleImage}
              className="w-full h-full"
              resizeMode="cover"
            />
          ) : (
            <MaterialIcons name={feature.icon} size={28} color="#6366F1" />
          )}
        </View>

        <Text className="text-lg font-Ubuntu-Medium text-text-primary mb-1">
          {feature.title}
        </Text>
        <Text className="text-sm text-text-secondary text-center">
          {feature.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
