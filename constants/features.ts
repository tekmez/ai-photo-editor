import { Feature } from '../types/feature';

export const FEATURES: Feature[] = [
  {
    id: 'background-remover',
    title: 'Arka Plan Kaldırma',
    description: 'Fotoğraflardan arka planı otomatik olarak kaldırın',
    icon: 'content-cut',
    route: '/(main)/features/background-remover',
    modelId: 'background-remove-model',
    // sampleImage: require('../assets/samples/bg-remove.jpg'),
  },
  {
    id: 'image-generator',
    title: 'Görsel Oluşturucu',
    description: 'Metin açıklamasından yeni görseller oluşturun',
    icon: 'auto-awesome',
    route: '/(main)/features/image-generator',
    modelId: 'image-generator-model',
    // sampleImage: require('../assets/samples/image-gen.jpg'),
    promptPlaceholder: 'Oluşturmak istediğiniz görseli açıklayın...',
    suggestedPrompts: [
      'Gün batımında sahil manzarası',
      'Neon ışıklı şehir sokağı',
      'Dağ yamacında kamp ateşi'
    ]
  },
  {
    id: 'photo-repair',
    title: 'Fotoğraf Onarımı',
    description: 'Eski siyah beyaz fotoğrafları renklendir ve onar',
    icon: 'auto-fix-high',
    route: '/(main)/features/photo-repair',
    modelId: 'photo-repair-model',
    // sampleImage: require('../assets/samples/photo-repair.jpg'),
  },
  {
    id: 'photo-upscale',
    title: 'Fotoğraf İyileştirme',
    description: 'Düşük kaliteli fotoğrafları yüksek çözünürlüğe dönüştür',
    icon: 'hd',
    route: '/(main)/features/photo-upscale',
    modelId: 'photo-upscale-model',
    // sampleImage: require('../assets/samples/photo-upscale.jpg'),
  },
  {
    id: 'style-transfer',
    title: 'Stil Transferi',
    description: 'Fotoğrafları farklı sanat stillerine dönüştür',
    icon: 'brush',
    route: '/(main)/features/style-transfer',
    modelId: 'style-transfer-model',
    // sampleImage: require('../assets/samples/style-transfer.jpg'),
    promptPlaceholder: 'Hangi stile dönüştürmek istediğinizi yazın...',
    suggestedPrompts: [
      'Anime karakteri',
      'Yağlı boya tablo',
      'Pixel art'
    ]
  }
]; 