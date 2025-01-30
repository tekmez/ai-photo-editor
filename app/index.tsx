import { useState } from "react";
import { Alert, Button, Image, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
export default function Index() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Gallery access permission is required to select images."
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="font-Ubuntu-Bold text-2xl">Hello World</Text>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} className="w-52 h-52" />}
    </View>
  );
}
