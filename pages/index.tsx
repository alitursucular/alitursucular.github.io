import Layout from "@/components/layout";
import Landing from "@/components/Landing";
import Repos from "@/components/Repos";
import About from "@/components/About";

const App = () => {
    return (
        <Layout home>
            <Landing />
            <Repos />
            <About />
        </Layout>
    );
};

export default App;
