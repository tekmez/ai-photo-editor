import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";

const plans = [
  {
    id: "weekly",
    title: "Haftalık",
    price: "$2.99",
    description: "Her hafta yenilenir",
    features: ["Sınırsız düzenleme", "Öncelikli destek"],
  },
  {
    id: "monthly",
    title: "Aylık",
    price: "$9.99",
    description: "Her ay yenilenir",
    features: ["Sınırsız düzenleme", "Öncelikli destek", "En esnek plan ⭐"],
    recommended: true,
  },
  {
    id: "yearly",
    title: "Yıllık",
    price: "$59.99",
    description: "Her yıl yenilenir",
    features: ["Sınırsız düzenleme", "Öncelikli destek", "%50 indirim 🎉"],
  },
];

export default function Subscription() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="light" />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pt-safe-top pb-4 bg-background-secondary">
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="close" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="text-xl font-Ubuntu-Medium text-text-primary">
          Premium Üyelik
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Content */}
      <ScrollView className="flex-1 p-4">
        {/* Hero */}
        <View className="items-center mb-8">
          <MaterialIcons name="star" size={64} color="#6366F1" />
          <Text className="text-2xl font-Ubuntu-Bold text-text-primary mt-4">
            Premium'a Yükselt
          </Text>
          <Text className="text-text-secondary text-center mt-2">
            Sınırsız düzenleme ve daha fazla özellik için Premium'a geç
          </Text>
        </View>

        {/* Plans */}
        <View className="space-y-4">
          {plans.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              className={`p-4 rounded-2xl ${
                plan.recommended
                  ? "bg-primary/10 border-2 border-primary"
                  : "bg-surface"
              }`}
            >
              {plan.recommended && (
                <View className="absolute -top-3 right-4 bg-primary px-3 py-1 rounded-full">
                  <Text className="text-text-primary text-xs font-Ubuntu-Medium">
                    Önerilen
                  </Text>
                </View>
              )}
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-lg font-Ubuntu-Medium text-text-primary">
                  {plan.title}
                </Text>
                <Text className="text-2xl font-Ubuntu-Bold text-text-primary">
                  {plan.price}
                </Text>
              </View>
              <Text className="text-text-secondary text-sm mb-3">
                {plan.description}
              </Text>
              <View className="space-y-2">
                {plan.features.map((feature, index) => (
                  <View key={index} className="flex-row items-center">
                    <MaterialIcons
                      name="check-circle"
                      size={20}
                      color="#6366F1"
                    />
                    <Text className="text-text-primary ml-2">{feature}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer */}
        <View className="mt-8 mb-4">
          <Text className="text-text-tertiary text-center text-xs">
            Aboneliğiniz seçtiğiniz plana göre otomatik olarak yenilenecektir.
            İstediğiniz zaman iptal edebilirsiniz.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
