import { Button } from "react-native-paper";

const ButtonComponent = ({
  icon,
  mode,
  onPress,
  cssClassName,
  children,
  style,
  ...otherProps
}) => {
  return (
    <Button
      icon={icon || null}
      mode={mode}
      style={style}
      onPress={onPress}
      className={cssClassName}
      {...otherProps}
    >
      {children}
    </Button>
  );
};

export default ButtonComponent;
