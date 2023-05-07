import axios from 'axios';
import { FloatButton, Popover } from 'antd';
import { CustomerServiceFilled, CustomerServiceOutlined, MessageOutlined, PlusOutlined } from '@ant-design/icons';
import { useQuery } from 'react-query';
import UserPetCard from '../components/Pet/UserPetCard';
import { useNavigate } from 'react-router-dom';
import UserChatroom from '../components/Chat/Theme/UserChatroom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, selectIsStaff, selectUser } from '../store/userSlice';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { favourite, getFavourites, getPets, unfavourite } from '../apis/petApi';
import { chat } from '../apis/chatApi';
import SearchBar from '../components/SearchBar';
import { selectSearchCurrentValue } from '../store/searchBarSlice';
import PetCard from '../components/Pet/PetCard';
import { selectFavouritedPets, setFavourites, setPets } from '../store/petSlice';


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
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const dispatch = useDispatch()
    if (isStaff) {
        navigate("/admin")
    }

    useEffect(() => {
        console.log(isLoggedIn);
    }, [isLoggedIn])

    const pets = useSelector(selectFavouritedPets)
    const user = useSelector(selectUser)
    const [open, setOpen] = useState(false);
    const searchBarCurrent = useSelector(selectSearchCurrentValue)
    const { isSuccess: petIsSuccess, refetch: petRefetch } = useQuery({ queryKey: ['pets', searchBarCurrent.variety, searchBarCurrent.gender, searchBarCurrent.age.min, searchBarCurrent.age.max], queryFn: async () => {
        const pets = await getPets(searchBarCurrent.variety, searchBarCurrent.gender, searchBarCurrent.age.min, searchBarCurrent.age.max) 
        console.log(pets);
        dispatch(setPets(pets))
    }})
    const { isSuccess: favouriteIsSuccess, data: favourites, refetch: favouriteRefetch } = useQuery({ queryKey: ['favourites', petIsSuccess], queryFn: async () => {
        const favourites = await getFavourites()
        dispatch(setFavourites(favourites))
    }})

    const enquiry = async (chatroomId, userId, message) => {
        await chat(chatroomId, userId, message)

        setOpen(true)
    }

    let petCardItems = []

    if (petIsSuccess) {
        if (isLoggedIn) {
            petCardItems = pets.map(x => <UserPetCard key={x.id} pet={x} onFavourite={onFavourite} onEnquiry={async (msg) => { await enquiry(user.chatroomId, user.userId, msg) }} />)
        } else {
            petCardItems = pets.map(x => <PetCard key={x.id} pet={x} />)
        }
    } else {
        petCardItems = "Loading..."
    }

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
        <SearchBar hasFavourite={isLoggedIn} />
        <div style={{ display: "flex", flexWrap: "wrap" }}>
            {petCardItems}
        </div>
        <Popover placement="topRight" title="Chatroom" trigger="click" open={open} onOpenChange={(e) => setOpen(e)} content={popover}>
            <FloatButton type="primary" icon={<MessageOutlined />} />
        </Popover>
    </>
}
export default Home;