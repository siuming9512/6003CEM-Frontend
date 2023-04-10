import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import PetCard from "./PetCard";
import { Popconfirm } from "antd";

const EditPetCard = ({ pet, onEdit, onDelete }) => {
    const actions = [
        <EditOutlined style={{ cursor: "pointer", fontSize: "18px" }} onClick={() => onEdit(pet)} />,
        <Popconfirm
            title="Delete the pet"
            description="Are you sure to delete this pet?"
            onConfirm={() => {onDelete(pet.id); return true}}
            >
            <DeleteOutlined style={{ cursor: "pointer", color: "#f5222d", fontSize: "18px" }} />
        </Popconfirm>
    ]
    return <>
        <PetCard pet={pet} actions={actions} />
    </>
}

export default EditPetCard;