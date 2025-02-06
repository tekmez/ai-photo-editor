import { ProcessResponse } from "../../types/feature";

const REPLICATE_API_KEY = process.env.EXPO_PUBLIC_REPLICATE_API_KEY;
const PHOTO_REPAIR_MODEL = "microsoft/bringing-old-photos-back-to-life:c75db81db6cbd809d93cc3b7e7a088a351a3349c9fa02b6d393e35e0d51ba799";

export async function repairPhoto(
  imageBase64: string
): Promise<ProcessResponse> {
  try {
    const input = {
      image: `data:image/jpeg;base64,${imageBase64}`,
      with_scratch: true,
      HR: true,
      with_colorization: true,
    };

    // Model çalıştırma isteği
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${REPLICATE_API_KEY}`,
      },
      body: JSON.stringify({
        version: PHOTO_REPAIR_MODEL,
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
      throw new Error("Fotoğraf onarımı başarısız oldu");
    }
  } catch (error: any) {
    return {
      url: "",
      error: error.message || "Bir hata oluştu",
    };
  }
} 