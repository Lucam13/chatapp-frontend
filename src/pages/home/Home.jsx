import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
	return (
		<div className='flex sm:h-[450px] md:h-[750px] rounded-lg overflow-hidden bg-orange-100 '>
			<Sidebar />
			<MessageContainer />
		</div>
	);
};
export default Home;