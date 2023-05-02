import axios from 'axios';
import { FloatButton, Popover } from 'antd';
import { CustomerServiceFilled, CustomerServiceOutlined, MessageOutlined, PlusOutlined } from '@ant-design/icons';
import { useQuery } from 'react-query';
import UserPetCard from '../components/Pet/UserPetCard';
import { useNavigate } from 'react-router-dom';
import UserChatroom from '../components/Chat/Theme/UserChatroom';
import { useSelector } from 'react-redux';
import { selectIsStaff, selectUser } from '../store/userSlice';
import { useState } from 'react';
import moment from 'moment';
import { favourite, getPets, unfavourite } from '../apis/petApi';
import { chat } from '../apis/chatApi';
import SearchBar from '../components/SearchBar';
import { selectSearchCurrentValue } from '../store/searchBarSlice';


const onFavourite = async (petId, favouriteState) => {
    if (favouriteState) {
        await favourite(petId)
    } else {
        await unfavourite(petId)
    }
}




const Home = () => {
    const navigate = useNavigate()
    const isStaff = useSelector(selectIsStaff)

    if (isStaff) {
        navigate("/admin")
    }

    const user = useSelector(selectUser)
    const [open, setOpen] = useState(false);
    const searchBarCurrent = useSelector(selectSearchCurrentValue)
    const { isSuccess: petIsSuccess, data: pets, refetch: petRefetch } = useQuery({ queryKey: ['pets', searchBarCurrent.variety, searchBarCurrent.gender, searchBarCurrent.age.min, searchBarCurrent.age.max, searchBarCurrent.favourite], queryFn: () => getPets(searchBarCurrent.variety, searchBarCurrent.gender, searchBarCurrent.age.min, searchBarCurrent.age.max, searchBarCurrent.favourite) })

    const enquiry = async (chatroomId, userId, message) => {
        await chat(chatroomId, userId, message)

        setOpen(true)
    }

    const petCardItems = petIsSuccess? pets.map(x => <UserPetCard key={x.id} pet={x} onFavourite={onFavourite} onEnquiry={async (msg) => { await enquiry(user.chatroomId, user.userId, msg) }} />) : "Loading..."
    
    const popover = open ? (
        <div style={{
            width: "500px",
            height: "400px",
            borderTop: "1px solid #efefef",
            padding: "0 10px"
        }} >
            <UserChatroom />
        </div>) : ""
    return <>
        <SearchBar isAdmin={false} />
        <div style={{ display: "flex", flexWrap: "wrap" }}>
            {petCardItems}
        </div>
        <Popover placement="topRight" title="Chatroom" trigger="click" open={open} onOpenChange={(e) => setOpen(e)} content={popover}>
            <FloatButton type="primary" icon={<MessageOutlined />} />
        </Popover>
    </>
}
export default Home;