import React, { CSSProperties, useCallback, useEffect, useState } from "react";
import styles from "./styles.module.css";

interface IProps {
    src: string[];
    alt?: string[];
    currentIndex?: number;
    backgroundStyle?: CSSProperties;
    imageStyle?: CSSProperties;
    captionStyle?: CSSProperties;
    disableScroll?: boolean;
    disableCaption?: boolean;
    closeOnClickOutside?: boolean;
    closeOnClickInside?: boolean;
    onClose?: () => void;
    closeComponent?: React.JSX.Element;
    leftArrowComponent?: React.JSX.Element;
    rightArrowComponent?: React.JSX.Element;
}

const ReactSimpleImageViewer = (props: IProps) => {
    const [currentIndex, setCurrentIndex] = useState(props.currentIndex ?? 0);

    const changeImage = useCallback(
        (delta: number) => {
            let nextIndex = (currentIndex + delta) % props.src.length;
            if (nextIndex < 0) nextIndex = props.src.length - 1;
            setCurrentIndex(nextIndex);
        },
        [currentIndex]
    );

    const handleClick = useCallback(
        (event: React.MouseEvent) => {
            if (!event.target || !props.closeOnClickOutside) {
                return;
            }

            const checkId = (event.target as HTMLDivElement).id === 'ReactSimpleImageViewer';
            const checkClass = (event.target as HTMLDivElement).classList.contains('react-simple-image-viewer__slide');

            if (checkId || checkClass) {
                event.stopPropagation();
                props.onClose?.();
            }
        },
        [props.onClose]
    );

    const handleClickImage = useCallback(
        (event: React.MouseEvent) => {
            if (!event.target || !props.closeOnClickInside) {
                return;
            }

            const checkId = (event.target as HTMLImageElement).id === 'ReactSimpleImageViewer';
            const checkClass = (event.target as HTMLImageElement).classList.contains('react-simple-image-viewer__image');

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
        (event: WheelEvent) => {
            if (event.deltaY > 0) {
                changeImage(-1);
            } else {
                changeImage(1);
            }
        },
        [changeImage]
    );

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        if (!props.disableScroll) document.addEventListener("wheel", handleWheel);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            if (!props.disableScroll) document.removeEventListener("wheel", handleWheel);
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

            {props.src.length > 1 && (
                <>
                    <span
                        className={`${styles.navigation} ${styles.prev} react-simple-image-viewer__previous`}
                        onClick={() => changeImage(-1)}
                    >
                        {props.leftArrowComponent || "❮"}
                    </span>
                    <span
                        className={`${styles.navigation} ${styles.next} react-simple-image-viewer__next`}
                        onClick={() => changeImage(1)}
                    >
                        {props.rightArrowComponent || "❯"}
                    </span>
                </>
            )}

            <div
                className={`${styles.content} react-simple-image-viewer__modal-content`}
                onClick={handleClick}
            >
                <div className={`${styles.slide} react-simple-image-viewer__slide`}>
                    <img
                        className={`${styles.image} react-simple-image-viewer__image`}
                        src={props.src[currentIndex]}
                        alt={props.alt?.[currentIndex] ?? ""}
                        onClick={handleClickImage}
                    />
                    {props.disableCaption || !props.alt?.[currentIndex] ? null : 
                        <div className={`${styles.caption} react-simple-image-viewer__caption`} style={props.captionStyle}>
                            {props.alt?.[currentIndex]}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default ReactSimpleImageViewer;
