import HoverImage from "@/components/HoverImage";
import a1 from "../public/images/a1.png";
import a2 from "../public/images/a2.png";

const Test = () => {
    return (
        <>
            <HoverImage pixelatedSrc={a1} highResSrc={a2} />
        </>
    );
};

export default Test;
