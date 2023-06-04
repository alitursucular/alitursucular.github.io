import Footer from "../Footer";
import Navigation from "../Navigation";

interface ILayout {
    children: React.ReactNode;
    home: boolean;
    hasHeader?: boolean;
    hasFooter?: boolean;
}

const Layout: React.FC<ILayout> = ({ children, home, hasHeader = true, hasFooter = true }) => {
    return (
        <>
            {hasHeader && <Navigation home={home} />}
            {children}
            {hasFooter && <Footer home={home} />}
        </>
    );
};

export default Layout;
