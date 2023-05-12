import React from "react";
import Tag, { ITag } from "./Tag";
import styles from "./Tag.module.scss";

interface ITagsWrapper {
    // Limitation with defining the children type: https://stackoverflow.com/questions/44475309/how-do-i-restrict-the-type-of-react-children-in-typescript-using-the-newly-adde
    children: React.ReactElement<ITag>[] | React.ReactElement<ITag>;
}

const TagsWrapper: React.FC<ITagsWrapper> = ({ children }) => {
    // const containerRef = React.useRef<HTMLDivElement>(null);
    // const [containerWidth, setContainerWidth] = React.useState(0);
    // const [totalItemWidth, setTotalItemWidth] = React.useState(0);

    const tags = React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === Tag) {
            return child;
        }
        return null;
    });

    // React.useEffect(() => {
    //     const container = containerRef.current;
    //     if (container) {
    //         setContainerWidth(container.clientWidth);
    //         const itemElements = container.querySelectorAll<HTMLDivElement>(":scope > div");
    //         const itemWidths = Array.from(itemElements).map((item) => item.getBoundingClientRect().width);
    //         const totalWidth = itemWidths.reduce((acc, width) => acc + width, 0);
    //         setTotalItemWidth(totalWidth);
    //     }
    // }, []);

    // const numItemsToShow = Math.floor((containerWidth / totalItemWidth) * children.length);
    // const showEllipsis = numItemsToShow < items.length;

    return (
        <div className={styles.tagsWrapper}>
            {/* <div ref={containerRef} className={styles.tagsWrapper}> */}
            {tags}
            {/* {showEllipsis && <div style={{ padding: "0 8px" }}>...</div>} */}
        </div>
    );
};

export default TagsWrapper;
