import axios from 'axios';
import { FloatButton } from 'antd';
import { CustomerServiceOutlined } from '@ant-design/icons';
import { useQuery } from 'react-query';
import UserPetCard from '../components/Pet/UserPetCard';

const getPets = async () => {
    const { data } = await axios.get('http://localhost:3000/pets')

    return data.map(x => ({ key: x.id, ...x }));
}

const Home = () => {
    return "Home"
    // const { isSuccess: petIsSuccess, data: pets } = useQuery({ queryKey: ['pets'], queryFn: getPets })
    // if (!petIsSuccess) return 'Loading...'
    // const PetCardItems = pets.map(x => <UserPetCard key={x.id} pet={x} />)
    // return
    // (
    // <>
    //     <div style={{ display: "flex", flexWrap: "wrap" }}>
    //         {PetCardItems}
    //     </div>;
    //     <FloatButton type="primary" icon={<CustomerServiceOutlined />} />
    // </>
    // )
}
export default Home;