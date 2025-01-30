import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import * as Yup from "yup";
import { FormInput } from "../../components/common/form-input";
import { useAuthContext } from "../../context/auth-context";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Geçerli bir e-posta adresi giriniz")
    .required("E-posta adresi gerekli"),
  password: Yup.string()
    .min(6, "Şifre en az 6 karakter olmalıdır")
    .required("Şifre gerekli"),
});

export default function SignIn() {
  const router = useRouter();
  const { signIn } = useAuthContext();

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      await signIn(values.email, values.password);
      // Başarılı giriş sonrası otomatik olarak ana sayfaya yönlendirilecek
    } catch (error: any) {
      Alert.alert("Hata", error.message);
    }
  };

  return (
    <View className="flex-1 bg-background justify-center">
      <StatusBar style="light" />

      {/* Header */}
      <View className="items-center pb-8">
        <Text className="text-3xl font-Ubuntu-Bold text-text-primary">
          Hoş Geldiniz
        </Text>
        <Text className="text-text-secondary mt-2">Hesabınıza giriş yapın</Text>
      </View>

      {/* Form */}
      <View className="px-4">
        <Formik
          initialValues={{ email: "", password: "" }}
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
              <TouchableOpacity
                className="bg-primary py-4 rounded-xl mt-4"
                onPress={() => handleSubmit()}
                disabled={isSubmitting}
              >
                <Text className="text-center text-text-primary font-Ubuntu-Medium">
                  {isSubmitting ? "Giriş yapılıyor..." : "Giriş Yap"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>

        {/* Footer */}
        <View className="flex-row justify-center mt-6">
          <Text className="text-text-secondary">Hesabınız yok mu? </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/sign-up")}>
            <Text className="text-primary font-Ubuntu-Medium">Kayıt Olun</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
