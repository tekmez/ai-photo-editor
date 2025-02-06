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

interface FeatureCardProps {
  feature: Feature;
}

export default function FeatureCard({ feature }: FeatureCardProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      className="bg-surface rounded-2xl p-4 flex-1 min-w-[160px]"
      onPress={() => router.push(feature.route as any)}
    >
      <View className="aspect-square bg-background-secondary rounded-xl mb-3 items-center justify-center overflow-hidden">
        {feature.sampleImage ? (
          <Image
            source={feature.sampleImage}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <MaterialIcons name={feature.icon} size={32} color="#6366F1" />
        )}
      </View>

      <Text className="text-lg font-Ubuntu-Medium text-text-primary mb-1">
        {feature.title}
      </Text>
      <Text className="text-sm text-text-secondary">{feature.description}</Text>
    </TouchableOpacity>
  );
}
