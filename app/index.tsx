import { Redirect } from "expo-router";

export default function Index() {
  // Şimdilik direkt ana sayfaya yönlendir
  // Daha sonra auth durumuna göre yönlendirme yapılacak
  return <Redirect href="/(main)/home" />;
}
