import { View, Text, TextInput, TextInputProps } from "react-native";
import { useField } from "formik";

interface FormInputProps extends TextInputProps {
  name: string;
  label: string;
}

export function FormInput({ name, label, ...props }: FormInputProps) {
  const [field, meta] = useField(name);

  return (
    <View className="mb-4">
      <Text className="text-text-primary font-Ubuntu-Medium mb-2">{label}</Text>
      <TextInput
        className="bg-surface p-4 rounded-xl text-text-primary font-Ubuntu"
        placeholderTextColor="#71717A"
        value={field.value}
        onChangeText={field.onChange(name)}
        onBlur={field.onBlur(name)}
        {...props}
      />
      {meta.touched && meta.error ? (
        <Text className="text-error text-sm mt-1 font-Ubuntu">
          {meta.error}
        </Text>
      ) : null}
    </View>
  );
}
