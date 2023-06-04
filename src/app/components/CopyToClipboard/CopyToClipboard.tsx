import React from "react";
import { FaRegCopy } from "react-icons/fa";
import styles from "./CopyToClipboard.module.scss";

export const CopyClipboard: React.FC<{ text: string }> = ({ text }) => {
    const [copiedClass, setCopiedClass] = React.useState(false);

    const handleCopyClipboard = (c: string) => {
        navigator.clipboard.writeText(c);

        setCopiedClass(true);

        setTimeout(() => {
            setCopiedClass(false);
        }, 1500);
    };

    return (
        <span className={`${styles.copy} ${copiedClass ? styles.copied : ""}`} title="copy my email">
            <FaRegCopy size={24} onClick={() => handleCopyClipboard(text)} />
        </span>
    );
};

export default CopyClipboard;
