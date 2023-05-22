import React from "react";
import Link from "next/link";
import styles from "./BackToHome.module.scss";

const BackToHome: React.FC = () => (
    <div className={styles.backToHome}>
        <Link href="/">← Back to home</Link>
    </div>
);

export default BackToHome;
