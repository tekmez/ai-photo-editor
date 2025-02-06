import { ProcessResponse } from "../../types/feature";

const REPLICATE_API_KEY = process.env.EXPO_PUBLIC_REPLICATE_API_KEY;
const STYLE_TRANSFER_MODEL = "lucataco/sdxl-controlnet:cc2086e563b62f7a0bb649e34b77da829d9b7cdf7e2a56cc5ff052a10d94b01a";

export async function transferStyle(
  imageBase64: string,
  prompt: string
): Promise<ProcessResponse> {
  try {
    const input = {
      image: `data:image/jpeg;base64,${imageBase64}`,
      prompt: prompt,
      negative_prompt: "blurry, bad quality, distorted",
      num_inference_steps: 30,
      guidance_scale: 7.5,
      controlnet_conditioning_scale: 0.8,
      style_strength: 0.8,
      seed: Math.floor(Math.random() * 1000000),
    };

    // Model çalıştırma isteği
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${REPLICATE_API_KEY}`,
      },
      body: JSON.stringify({
        version: STYLE_TRANSFER_MODEL,
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
      return { url: result.output[0] };
    } else {
      throw new Error("Stil transferi başarısız oldu");
    }
  } catch (error: any) {
    return {
      url: "",
      error: error.message || "Bir hata oluştu",
    };
  }
} 