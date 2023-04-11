import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import PetCard from "./PetCard";
import { useState } from "react";

const UserPetCard = ({ pet, onFavourite }) => {
    const [favouriteState, setFavouriteState] = useState(pet.isFavourite)
    let likeIcon = null;
    
    if (favouriteState) {
        likeIcon = <HeartFilled style={{ fontSize: "18px", color: "#ff86a7", cursor: "pointer" }} />
    } else {
        likeIcon = <HeartOutlined style={{ fontSize: "18px", color: "#ff86a7", cursor: "pointer" }} />
    }


    const onClickFavourite = () => {
        setFavouriteState(!favouriteState)
        onFavourite(favouriteState)
    }

    return <>
        <PetCard pet={pet}>
            <div style={{height: "30px"}}>
                <div onClick={onClickFavourite} style={{ position: "absolute", right: 0, marginRight: "10px" }}>{likeIcon}</div>
            </div>
        </PetCard>
    </>
}

export default UserPetCard