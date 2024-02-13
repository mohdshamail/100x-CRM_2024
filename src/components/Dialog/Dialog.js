import { Button, Paragraph, Dialog, Portal } from "react-native-paper";

const DialogComponent = ({ hideDialog, title, body, visible, buttonText }) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{body}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>{buttonText}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DialogComponent;
