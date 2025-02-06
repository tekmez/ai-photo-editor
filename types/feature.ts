import { ImageSourcePropType } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export type FeatureId = 
  | 'background-remover'
  | 'image-generator'
  | 'photo-repair'
  | 'photo-upscale'
  | 'style-transfer';

export type FeatureRoute = 
  | '/(main)/features/background-remover'
  | '/(main)/features/image-generator'
  | '/(main)/features/photo-repair'
  | '/(main)/features/photo-upscale'
  | '/(main)/features/style-transfer';

// MaterialIcons tipini al
type IconNames = keyof typeof MaterialIcons.glyphMap;

export interface Feature {
  id: FeatureId;
  title: string;
  description: string;
  icon: IconNames;
  route: FeatureRoute;
  modelId: string;
  sampleImage?: ImageSourcePropType;
  promptPlaceholder?: string;
  suggestedPrompts?: string[];
}

export interface ProcessingOptions {
  prompt?: string;
  [key: string]: any;
}

export interface ProcessResponse {
  url: string;
  error?: string;
} 