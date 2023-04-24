import React from "react";
import Image, { StaticImageData } from "next/image";
import styles from "./HoverImage.module.css";

interface Props {
    pixelatedSrc: StaticImageData;
    highResSrc: StaticImageData;
}

const HoverImage: React.FC<Props> = ({ pixelatedSrc, highResSrc }) => {
    const [showHighRes, setShowHighRes] = React.useState<boolean>(false);
    const [x, setX] = React.useState<number>(0);
    const [y, setY] = React.useState<number>(0);
    const [diameter, setDiameter] = React.useState<number>(50);

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        setShowHighRes(true);
        setX(e.nativeEvent.offsetX);
        setY(e.nativeEvent.offsetY);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        setX(e.nativeEvent.offsetX);
        setY(e.nativeEvent.offsetY);
    };

    const handleMouseLeave = () => {
        setShowHighRes(false);
    };

    const highResStyle: React.CSSProperties = {
        visibility: showHighRes ? "visible" : "hidden",
        position: "absolute",
        left: 0,
        top: 0,
        clipPath: `circle(${diameter}px at ${x}px ${y}px)`,
        pointerEvents: "none",
        zIndex: 1
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <p>x: {x}</p>
                    <p>y: {y}</p>
                </div>
                <div className="col-md-6">
                    <div
                        className={styles.imagesContainer}
                        onMouseEnter={handleMouseEnter}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Image src={pixelatedSrc} alt="Pixelated" />
                        <Image src={highResSrc} alt="High-res" style={highResStyle} />
                    </div>
                    <div>
                        <label htmlFor="customRange1" className="form-label">
                            Dimater: {diameter} pixels
                        </label>
                        <input
                            type="range"
                            className="form-range"
                            id="customRange1"
                            min={30}
                            max={100}
                            value={diameter}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                setDiameter(parseInt(event.target.value))
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HoverImage;
