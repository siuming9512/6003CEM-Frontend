import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Card, Tooltip } from "antd";

const PetCard = ({ pet, children, actions }) => {
    if (pet == null) return ""
    return <Card
        style={{ margin: "10px" }}
        size="small"
        bodyStyle={{
            width: "150px",
        }}
        actions={actions}
    >
        <img width="100%" style={{ userSelect: "none", height: "100px", objectFit: "cover", borderRadius: "5px" }} src={pet.imageUrl} />
        <Tooltip placement="top" title={pet.variety}>
            <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Variety: {pet.variety}</div>
        </Tooltip>
        <div>Age: {pet.age}</div>
        <div>Gender: {pet.gender}</div>
    </Card>
}

export default PetCard;