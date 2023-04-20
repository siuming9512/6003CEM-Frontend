import axios from 'axios';
import { FloatButton } from 'antd';
import { CustomerServiceFilled, CustomerServiceOutlined, PlusOutlined } from '@ant-design/icons';
import { useQuery } from 'react-query';
import UserPetCard from '../components/Pet/UserPetCard';

const getPets = async () => {
    const { data } = await axios.get('http://localhost:3000/pets')

    return data.map(x => ({ key: x.id, ...x }));
}

const onFavourite = async (petId, favouriteState) => {
    console.log('state', favouriteState);
    if (favouriteState) {
        await axios.post('http://localhost:3000/pets/favourite', {
            petId
        })
    } else {
        await axios.post('http://localhost:3000/pets/unfavourite', {
            petId
        })
    }
}


const Home = () => {

    const { isSuccess: petIsSuccess, data: pets, refetch: petRefetch } = useQuery({ queryKey: ['pets'], queryFn: getPets })

    if (!petIsSuccess) return 'Loading...'
    const petCardItems = pets.map(x => <UserPetCard key={x.id} pet={x} onFavourite={onFavourite} />)


    return <>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
            {petCardItems}
        </div>
        <FloatButton type="primary" icon={<CustomerServiceFilled />} />
    </>
}
export default Home;