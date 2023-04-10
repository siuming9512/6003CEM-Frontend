import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import PetCard from "./PetCard";

const UserPetCard = ({ pet, isFavourite }) => {
    let likeIcon = null;
    if (isFavourite) {
        likeIcon = <HeartOutlined style={{ cursor: "pointer" }} />
    } else {
        likeIcon = <HeartFilled style={{ color: "#ff86a7", cursor: "pointer" }} />
    }

    return <>
        <PetCard pet={pet}>
            <div style={{ position: "absolute", right: 0, marginRight: "10px" }}>{likeIcon}</div>
        </PetCard>
    </>
}

export default UserPetCard