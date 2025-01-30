import { Stack } from "expo-router";

export default function MainLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#0A0A0B",
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          fontFamily: "Ubuntu-Medium",
        },
        contentStyle: {
          backgroundColor: "#0A0A0B",
        },
      }}
    />
  );
}
