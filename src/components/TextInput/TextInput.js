import { TextInput } from "react-native-paper";

const TextInputComponent = ({
  label,
  placeholder,
  onInputChange,
  value,
  leftIcon,
  rightIcon,
  ...otherProps
}) => {
  return (
    <TextInput
      mode="outlined"
      label={label}
      placeholder={placeholder}
      value={value || ""}
      left={leftIcon && <TextInput.Icon icon={leftIcon} />}
      right={rightIcon && <TextInput.Icon icon={rightIcon} />}
      onChangeText={onInputChange}
  
      {...otherProps}
    />
  );
};

export default TextInputComponent;
