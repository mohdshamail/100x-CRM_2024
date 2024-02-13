import { useDispatch, useSelector } from "react-redux";
import { hideError } from "../../redux/slices/showErrorSlice";
import { Snackbar,Button } from "react-native-paper";
import DialogComponent from "../Dialog/Dialog";

const ApiError = () => {
  const showError = useSelector((state) => state.showError.showError);
  const dispatch = useDispatch();
  const hideDialogHandler = () => dispatch(hideError());
  return (
    <>
      {showError && (
        <DialogComponent
          visible={true}
          buttonText={"Ok"}
          hideDialog={hideDialogHandler}
          title="API Error"
          body={`API Failed with ${showError} response code.`}
        />
      )}
    </>
  );
};

export default ApiError;
