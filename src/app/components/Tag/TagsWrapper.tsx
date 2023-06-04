import React from "react";
import Tag, { ITag } from "./Tag";
import styles from "./Tag.module.scss";

interface ITagsWrapper {
    // Limitation with defining the children type: https://stackoverflow.com/questions/44475309/how-do-i-restrict-the-type-of-react-children-in-typescript-using-the-newly-adde
    children: React.ReactElement<ITag>[] | React.ReactElement<ITag>;
}

const TagsWrapper: React.FC<ITagsWrapper> = ({ children }) => {
    const tags = React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === Tag) {
            return child;
        }
        return null;
    });

    return <div className={styles.tagsWrapper}>{tags}</div>;
};

export default TagsWrapper;
