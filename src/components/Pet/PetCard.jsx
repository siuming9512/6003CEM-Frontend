import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Card } from "antd";

const PetCard = ({ pet, children, actions }) => {
    return <Card
        style={{ margin: "10px" }}
        size="small"
        bodyStyle={{
            width: "150px",
        }}
        actions={actions}
        >
        {children}
        <img width="100%" style={{ userSelect: "none", height: "100px", objectFit: "cover", borderRadius: "5px"}} src={pet.imageUrl} />
        <div>Variety: {pet.variety}</div>
        <div>Age: {pet.age}</div>
        <div>Gender: {pet.gender}</div>
    </Card>
}

export default PetCard;