import Navbar from '../components/Navbar';
import LorenzAttractor from '../components/LorenzSimulation';

const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <LorenzAttractor />
        </div>
    );
};

export default Dashboard;
