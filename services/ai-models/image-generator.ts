import { ProcessResponse, ProcessingOptions } from "../../types/feature";

const REPLICATE_API_KEY = process.env.EXPO_PUBLIC_REPLICATE_API_KEY;
const IMAGE_GEN_MODEL = "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b";

export async function generateImage(
  prompt: string,
  options?: ProcessingOptions
): Promise<ProcessResponse> {
  try {
    const input = {
      prompt,
      negative_prompt: "blurry, bad quality, distorted, ugly",
      num_outputs: 1,
      scheduler: "K_EULER",
      num_inference_steps: 50,
      guidance_scale: 7.5,
      ...options,
    };

    // Model çalıştırma isteği
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${REPLICATE_API_KEY}`,
      },
      body: JSON.stringify({
        version: IMAGE_GEN_MODEL,
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
      throw new Error("Görsel oluşturma başarısız oldu");
    }
  } catch (error: any) {
    return {
      url: "",
      error: error.message || "Bir hata oluştu",
    };
  }
} 