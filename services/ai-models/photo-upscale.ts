import { ProcessResponse } from "../../types/feature";

const REPLICATE_API_KEY = process.env.EXPO_PUBLIC_REPLICATE_API_KEY;
const UPSCALE_MODEL = "nightmareai/real-esrgan:42fed1c4974146d4d2414e2be2c5277c7fcf05fcc3a73abf41610695738c1d7b";

export async function upscalePhoto(
  imageBase64: string
): Promise<ProcessResponse> {
  try {
    const input = {
      image: `data:image/jpeg;base64,${imageBase64}`,
      scale: 4,
      face_enhance: true,
    };

    // Model çalıştırma isteği
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${REPLICATE_API_KEY}`,
      },
      body: JSON.stringify({
        version: UPSCALE_MODEL,
        input,
      }),
    });

    const prediction = await response.json();
    
    // Sonuç için bekleme
    const resultResponse = await fetch(prediction.urls.get, {
      headers: {
        Authorization: `Token ${REPLICATE_API_KEY}`,
      },
    });

    const result = await resultResponse.json();

    if (result.status === "succeeded") {
      return { url: result.output };
    } else {
      throw new Error("Fotoğraf iyileştirme başarısız oldu");
    }
  } catch (error: any) {
    return {
      url: "",
      error: error.message || "Bir hata oluştu",
    };
  }
} 