import { Redirect } from "expo-router";
import { useAuthContext } from "../context/auth-context";

export default function Index() {
  const { user, loading } = useAuthContext();

  if (loading) return null;

  // Auth durumuna göre yönlendirme yap
  return <Redirect href={user ? "/(main)/home" : "/(auth)/sign-in"} />;
}
