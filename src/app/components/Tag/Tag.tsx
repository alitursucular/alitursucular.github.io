import React from "react";
import styles from "./Tag.module.scss";

export interface ITag {
    children: string;
}

const Tag: React.FC<ITag> = ({ children }) => {
    return <div className={styles.tag}>{children}</div>;
};

export default Tag;
