import React from "react";
import Image, { StaticImageData } from "next/image";
import styles from "./HoverImage.module.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface Props {
    pixelatedSrc: StaticImageData;
    originalSrc: StaticImageData;
}

const HoverImage: React.FC<Props> = ({ pixelatedSrc, originalSrc }) => {
    const [showOriginal, setshowOriginal] = React.useState<boolean>(false);
    const [manuallyRevealed, setManuallyRevealed] = React.useState<boolean>(false);
    const [x, setX] = React.useState<number>(0);
    const [y, setY] = React.useState<number>(0);
    const [diameter, setDiameter] = React.useState<number>(80);

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        setshowOriginal(true);
        setX(e.nativeEvent.offsetX);
        setY(e.nativeEvent.offsetY);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        setX(e.nativeEvent.offsetX);
        setY(e.nativeEvent.offsetY);
    };

    const handleMouseLeave = () => {
        setshowOriginal(false);
    };

    const originalStyle: React.CSSProperties = {
        visibility: showOriginal || manuallyRevealed ? "visible" : "hidden",
        position: "absolute",
        left: 0,
        top: 0,
        clipPath: !manuallyRevealed ? `circle(${diameter}px at ${x}px ${y}px)` : "none",
        pointerEvents: "none",
        zIndex: 1
    };

    return (
        <>
            <div
                className={styles.imagesContainer}
                onMouseEnter={!manuallyRevealed ? handleMouseEnter : undefined}
                onMouseMove={!manuallyRevealed ? handleMouseMove : undefined}
                onMouseLeave={!manuallyRevealed ? handleMouseLeave : undefined}
            >
                <Image src={pixelatedSrc} alt="pixelated image" />
                <Image src={originalSrc} alt="original image" style={originalStyle} />
            </div>
            <div className={styles.revealContainer}>
                <p className={styles.revealContainer_data}>
                    X: <span>{x}</span> | Y: <span>{y}</span> | Diameter: <span>{diameter}</span> pixels
                </p>
                <button
                    className={styles.revealContainer_revealButton}
                    onClick={() => {
                        setManuallyRevealed(!manuallyRevealed), setX(0), setY(0);
                    }}
                >
                    {!manuallyRevealed ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                </button>
            </div>
            <div
                className={styles.settingsContainer}
                style={{ pointerEvents: manuallyRevealed ? "none" : "all", opacity: manuallyRevealed ? "0.5" : "1" }}
            >
                <label htmlFor="rangeSlider1" className="form-label">
                    Change the magnifier:
                </label>
                <input
                    type="range"
                    className={styles.settingsContainer_rangeSlider}
                    id="rangeSlider1"
                    min={30}
                    max={100}
                    value={diameter}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDiameter(parseInt(event.target.value))}
                />
            </div>
        </>
    );
};

export default HoverImage;
