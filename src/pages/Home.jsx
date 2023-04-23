import axios from 'axios';
import { FloatButton, Popover } from 'antd';
import { CustomerServiceFilled, CustomerServiceOutlined, MessageOutlined, PlusOutlined } from '@ant-design/icons';
import { useQuery } from 'react-query';
import UserPetCard from '../components/Pet/UserPetCard';
import { useNavigate } from 'react-router-dom';
import UserChatroom from '../components/Chat/Theme/UserChatroom';
import { useSelector } from 'react-redux';
import { selectIsStaff } from '../store/userSlice';



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
    const isStaff = useSelector(selectIsStaff)
    const navigate = useNavigate()

    const goToChat = () => {
        navigate("/chat")
    }
    const { isSuccess: petIsSuccess, data: pets, refetch: petRefetch } = useQuery({ queryKey: ['pets'], queryFn: getPets })

    if (!petIsSuccess) return 'Loading...'
    const petCardItems = pets.map(x => <UserPetCard key={x.id} pet={x} onFavourite={onFavourite} />)


    const chatFloatBtn = !isStaff ? (
        <Popover placement="topRight" title="Chatroom" trigger="click" content={<div style={{ width: "500px", height: "400px", borderTop: "1px solid #efefef", padding: "0 10px" }} ><UserChatroom /></div>}>
            <FloatButton type="primary" icon={<MessageOutlined />} />
        </Popover>) : ""
    return <>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
            {petCardItems}
        </div>
        {chatFloatBtn}
    </>
}
export default Home;