import { useRef, useCallback, useMemo } from 'react';
import { useBottomSheetSpringConfigs } from '@gorhom/bottom-sheet';

const useBottomSheetModal = () => {
  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ['80%', '35%'], []);

  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500,
  });

  const presentModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const closeModal = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  return { bottomSheetModalRef, snapPoints, animationConfigs, presentModal, closeModal };
};

export default useBottomSheetModal;
