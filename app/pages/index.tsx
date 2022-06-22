import { BlitzPage } from 'blitz';
import Layout from 'app/core/layouts/Layout';
import NavBar from 'app/core/components/NavBar';

const Home: BlitzPage = () => {
    return (
        <div className="container">
            <NavBar />
        </div>
    );
};

Home.suppressFirstRenderFlicker = true;
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>;

export default Home;
