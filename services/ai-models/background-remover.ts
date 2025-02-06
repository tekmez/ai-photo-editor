import { ProcessResponse } from "../../types/feature";

const REPLICATE_API_KEY = process.env.EXPO_PUBLIC_REPLICATE_API_KEY;
const BG_REMOVE_MODEL = "ilkerc/rembg:7dcd75a87a1c0c2c01fc791a3d003a343d3b0277c5fb3ddf1131d675b2f8bed4";

export async function removeBackground(
  imageBase64: string
): Promise<ProcessResponse> {
  try {
    const input = {
      image: `data:image/jpeg;base64,${imageBase64}`,
    };

    // Model çalıştırma isteği
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${REPLICATE_API_KEY}`,
      },
      body: JSON.stringify({
        version: BG_REMOVE_MODEL,
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
      throw new Error("Görsel işleme başarısız oldu");
    }
  } catch (error: any) {
    return {
      url: "",
      error: error.message || "Bir hata oluştu",
    };
  }
} 