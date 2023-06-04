"use client"

import { animated, useSpring } from "react-spring";

interface ILetterReveal {
    children: string;
}

const LetterReveal: React.FC<ILetterReveal> = ({ children, ...rest }) => {
    const Reveal = (i: number) =>
        useSpring({
            from: { opacity: 0 },
            to: { opacity: 1 },
            delay: Math.random() * 1000
        });

    return (
        <>
            {children.split("").map((letter, idx) => (
                <animated.span key={Math.random() * idx} style={Reveal(idx)} {...rest}>
                    {letter}
                </animated.span>
            ))}
        </>
    );
};

export default LetterReveal;
