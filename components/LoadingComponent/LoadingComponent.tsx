import { BeatLoader } from "react-spinners";
import styles from "./LoadingComponent.module.scss";

const LoadingComponent: React.FC = () => (
    <div className={styles.loadingComponent}>
        <BeatLoader color="black" size={32} />
    </div>
);

export default LoadingComponent;
