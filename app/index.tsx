import { Redirect } from "expo-router";
import { useAuthContext } from "../context/auth-context";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const { user, loading } = useAuthContext();

  // Loading durumunda loading spinner göster
  if (loading) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#6366F1" />
      </View>
    );
  }

  // Auth durumuna göre yönlendirme yap
  return <Redirect href={user ? "/(main)/home" : "/(auth)/sign-in"} />;
}
