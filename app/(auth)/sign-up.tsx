import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import * as Yup from "yup";
import { FormInput } from "../../components/common/form-input";
import { useAuthContext } from "../../context/auth-context";
import { Ionicons } from "@expo/vector-icons";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Geçerli bir e-posta adresi giriniz")
    .required("E-posta adresi gerekli"),
  password: Yup.string()
    .min(6, "Şifre en az 6 karakter olmalıdır")
    .required("Şifre gerekli"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Şifreler eşleşmiyor")
    .required("Şifre tekrarı gerekli"),
});

export default function SignUp() {
  const router = useRouter();
  const { signUp } = useAuthContext();

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      await signUp(values.email, values.password);
      // Başarılı kayıt sonrası otomatik olarak ana sayfaya yönlendirilecek
    } catch (error: any) {
      Alert.alert("Hata", error.message);
    }
  };

  return (
    <View className="flex-1 bg-background justify-center">
      <StatusBar style="light" />

      {/* Back Button */}
      <TouchableOpacity
        className="absolute top-safe left-4 z-10 flex-row items-center gap-2"
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
        <Text className="text-white font-Ubuntu-Medium text-lg">Geri</Text>
      </TouchableOpacity>

      {/* Header */}
      <View className="items-center pb-8">
        <Text className="text-3xl font-Ubuntu-Bold text-text-primary">
          Kayıt Olun
        </Text>
        <Text className="text-text-secondary mt-2">
          Yeni bir hesap oluşturun
        </Text>
      </View>

      {/* Form */}
      <View className="px-4">
        <Formik
          initialValues={{ email: "", password: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, isSubmitting }) => (
            <View>
              <FormInput
                name="email"
                label="E-posta"
                placeholder="E-posta adresinizi girin"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
              <FormInput
                name="password"
                label="Şifre"
                placeholder="Şifrenizi girin"
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password"
              />
              <FormInput
                name="confirmPassword"
                label="Şifre Tekrarı"
                placeholder="Şifrenizi tekrar girin"
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password"
              />
              <TouchableOpacity
                className="bg-primary py-4 rounded-xl mt-4"
                onPress={() => handleSubmit()}
                disabled={isSubmitting}
              >
                <Text className="text-center text-text-primary font-Ubuntu-Medium">
                  {isSubmitting ? "Kayıt yapılıyor..." : "Kayıt Ol"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>

        {/* Footer */}
        <View className="flex-row justify-center mt-6">
          <Text className="text-text-secondary">Zaten hesabınız var mı? </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/sign-in")}>
            <Text className="text-primary font-Ubuntu-Medium">Giriş Yapın</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
