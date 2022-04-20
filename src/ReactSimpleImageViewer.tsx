import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from "react";
import styles from "./styles.module.css";

interface IProps {
  src: string[];
  currentIndex?: number;
  backgroundStyle?: CSSProperties;
  disableScroll?: boolean;
  closeOnClickOutside?: boolean;
  onClose?: () => void;
  closeComponent?: JSX.Element;
  leftArrowComponent?: JSX.Element;
  rightArrowComponent?: JSX.Element;
  showCounter?: boolean;
  counterComponent?: JSX.Element;
}

const ReactSimpleImageViewer = (props: IProps) => {
  const [currentIndex, setCurrentIndex] = useState(props.currentIndex ?? 0);

  const dataLength = useMemo(() => props.src.length, [props.src]);

  const changeImage = useCallback(
    (delta: number) => {
      let nextIndex = (currentIndex + delta) % dataLength;
      if (nextIndex < 0) nextIndex = dataLength - 1;
      setCurrentIndex(nextIndex);
    },
    [currentIndex]
  );

  const handleClick = useCallback(
    (event: any) => {
      if (!event.target || !props.closeOnClickOutside) {
        return;
      }

      const checkId = event.target.id === "ReactSimpleImageViewer";
      const checkClass = event.target.classList.contains(
        "react-simple-image-viewer__slide"
      );

      if (checkId || checkClass) {
        event.stopPropagation();
        props.onClose?.();
      }
    },
    [props.onClose]
  );

  const handleKeyDown = useCallback(
    (event: any) => {
      if (event.key === "Escape") {
        props.onClose?.();
      }

      if (["ArrowLeft", "h"].includes(event.key)) {
        changeImage(-1);
      }

      if (["ArrowRight", "l"].includes(event.key)) {
        changeImage(1);
      }
    },
    [props.onClose, changeImage]
  );

  const handleWheel = useCallback(
    (event: any) => {
      if (event.wheelDeltaY > 0) {
        changeImage(-1);
      } else {
        changeImage(1);
      }
    },
    [changeImage]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    if (!props.disableScroll) {
      document.addEventListener("wheel", handleWheel);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      if (!props.disableScroll) {
        document.removeEventListener("wheel", handleWheel);
      }
    };
  }, [handleKeyDown, handleWheel]);

  return (
    <div
      id="ReactSimpleImageViewer"
      className={`${styles.wrapper} react-simple-image-viewer__modal`}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      style={props.backgroundStyle}
    >
      <span
        className={`${styles.close} react-simple-image-viewer__close`}
        onClick={() => props.onClose?.()}
      >
        {props.closeComponent || "×"}
      </span>

      {dataLength > 1 && (
        <span
          className={`${styles.navigation} ${styles.prev} react-simple-image-viewer__previous`}
          onClick={() => changeImage(-1)}
        >
          {props.leftArrowComponent || "❮"}
        </span>
      )}

      {dataLength > 1 && (
        <span
          className={`${styles.navigation} ${styles.next} react-simple-image-viewer__next`}
          onClick={() => changeImage(1)}
        >
          {props.rightArrowComponent || "❯"}
        </span>
      )}

      <div
        className={`${styles.content} react-simple-image-viewer__modal-content`}
        onClick={handleClick}
      >
        <div className={`${styles.slide} react-simple-image-viewer__slide`}>
          <img className={styles.image} src={props.src[currentIndex]} alt="" />
        </div>
      </div>

      {props.showCounter && (
        <div
          className={`react-simple-image-viewer__counter`}
        >
          {props.counterComponent || <div className={styles.counter}>{currentIndex} / {dataLength}</div>}
        </div>
      )}
    </div>
  );
};

export default ReactSimpleImageViewer;
