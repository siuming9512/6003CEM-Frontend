import { Popover } from "antd"
import axios from "axios";
import { useState } from "react";
import PetCard from "../Pet/PetCard";
import { getPetById } from "../../apis/petApi";

const HashLabel = ({ hashId }) => {
    const [open, setOpen] = useState(false)
    const [pet, setPet] = useState(null)

    const handleOpen = async (openState) => {
        if (openState) {
            const pet = await getPetById(hashId)
            setPet(pet)
        } else {
            setPet(null)
        }
        setOpen(openState)
    }

    return <Popover title={`Pet #${hashId}`} trigger="click" content={<PetCard pet={pet} />} open={open} onOpenChange={handleOpen}>
        <span style={{ textDecoration: "underline", cursor: "pointer" }}> pet (#{hashId})</span>
    </Popover>
}

export default HashLabel