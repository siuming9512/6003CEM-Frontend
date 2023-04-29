import { HeartFilled, HeartOutlined, MessageOutlined } from "@ant-design/icons";
import PetCard from "./PetCard";
import { useState } from "react";
import { Popconfirm } from "antd";

const UserPetCard = ({ pet, onFavourite, onEnquiry }) => {
    const onClickFavourite = () => {
        setFavouriteState(!favouriteState)
        onFavourite(pet.id, !favouriteState)
    }
    
    const [favouriteState, setFavouriteState] = useState(pet?.isFavourite ?? false)

    let likeIcon = null;

    if (favouriteState) {
        likeIcon = <HeartFilled onClick={onClickFavourite} style={{ fontSize: "24px", color: "#ff86a7", cursor: "pointer" }} />
    } else {
        likeIcon = <HeartOutlined onClick={onClickFavourite} style={{ fontSize: "24px", color: "#ff86a7", cursor: "pointer" }} />
    }

    const actions = [
        likeIcon,
        <Popconfirm
            title="Enquiry"
            description="want to enquiry the pet status?"
            okText="OK"
            onConfirm={() => { onEnquiry(`What status of #${pet.id}?`) }}
        >
            <MessageOutlined style={{ cursor: "pointer", fontSize: "18px" }} />
        </Popconfirm>
    ]

    return <>
        <PetCard pet={pet} actions={actions} />
    </>
}

export default UserPetCard