import { DeleteOutlined, HeartFilled, HeartOutlined, MessageOutlined } from "@ant-design/icons";
import PetCard from "./PetCard";
import { useEffect, useState } from "react";
import { Popconfirm } from "antd";

const UserPetCard = ({ pet, onFavourite }) => {
    const [favouriteState, setFavouriteState] = useState(pet?.isFavourite ?? false)

    let likeIcon = null;
    
    if (favouriteState) {
        likeIcon = <HeartFilled style={{ fontSize: "24px", color: "#ff86a7", cursor: "pointer" }} />
    } else {
        likeIcon = <HeartOutlined style={{ fontSize: "24px", color: "#ff86a7", cursor: "pointer" }} />
    }

    const actions = [
        // <EditOutlined style={{ cursor: "pointer", fontSize: "18px" }} onClick={() => onEdit(pet)} />,
        likeIcon,
        <Popconfirm
            title="Enquiry"
            description="want to enquiry the pet status?"
            okText="OK"
            onConfirm={() => {}}
            >
            <MessageOutlined  style={{ cursor: "pointer", fontSize: "18px" }} />
        </Popconfirm>
    ]


    

    const onClickFavourite = () => {
        setFavouriteState(!favouriteState)
        onFavourite(pet.id, !favouriteState)
    }

    return <>
        {/* <PetCard pet={pet}>
            <div style={{height: "30px"}}>
                <div onClick={onClickFavourite} style={{ position: "absolute", right: 0, marginRight: "10px" }}>{likeIcon}</div>
            </div>
        </PetCard> */}
        <PetCard pet={pet} actions={actions} />
    </>
}

export default UserPetCard