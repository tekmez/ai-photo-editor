// import { EXPO_PUBLIC_REPLICATE_API_KEY } from '@env';
import Replicate from 'replicate';

const MODEL_VERSION = 'stability-ai/stable-diffusion-3.5-large';

const replicate = new Replicate({
  auth: process.env.EXPO_PUBLIC_REPLICATE_API_KEY,
  useFileOutput: false // URL'leri tercih ediyoruz
});

export async function generateImage(image: string, prompt: string): Promise<string> {
  try {
    
    const formData = new FormData();
    formData.append("content", {
        uri: image,
        name: "image.jpg",
        type: "application/octet-stream",
    } as any);

    console.log(formData);

    const output = await replicate.run(MODEL_VERSION, {
      input: {
        content: formData,
        prompt,
        refine: "expert_ensemble_refiner",
        apply_watermark: false,
        num_inference_steps: 25
      },
      wait: { mode: "poll", interval: 1000 } // Polling modunu düzelt
    });

    
    // Output bir URL veya FileOutput nesnesi olabilir
    if (Array.isArray(output) && output.length > 0) {
      const result = output[0];
      // Eğer FileOutput nesnesi ise url özelliğini kullan
      return typeof result === 'string' ? result : result.url;
    }

    throw new Error('API geçerli bir çıktı döndürmedi');
    
  } catch (error: any) {
    throw new Error(`Görsel düzenleme hatası: ${error.message}`);
  }
} 