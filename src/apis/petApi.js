import axios from "axios";
import { host } from ".";

export const getPetById = async (petId) => {
    const { data } = await axios.get(`${host}/pets/${petId}`)

    return data;
}

export const uploadFile = async (file) => {
    let formData = new FormData()

    formData.append('file', file)

    const { data } = await axios({
        method: "post",
        url: `${host}/pets/upload`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
    })

    return data
}

export const getPetFilter = async () => {
    const { data } = await axios.get(`${host}/pets/filter`)

    return data
}

export const getPets = async (
    variety,
    gender,
    minAge,
    maxAge,
    isFavourite
) => {
    const { data } = await axios.get(`${host}/pets`, {
        params: {
            variety,
            gender,
            minAge,
            maxAge,
            isFavourite
        }
    })

    return data
}

export const createPet = async (variety, gender, age, fileName) => {
    const body = {
        variety: variety,
        gender: gender,
        age: age,
        imageFileName: fileName,
    }

    await axios.post(`${host}/pets`, body)
};

export const editPet = async (petId, variety, gender, age, fileName) => {
    const body = {
        variety: variety,
        gender: gender,
        age: age,
        imageFileName: fileName,
    }

    await axios.patch(`${host}/pets/${petId}`, body)
}

export const deletePet = async (petId) => {
    await axios.delete(`${host}/pets/${petId}`)
};

export const favourite = async (petId) => {
    return await axios.post(`${host}/pets/favourite`, {
        petId
    })
}

export const unfavourite = async (petId) => {
    return await axios.post(`${host}/pets/unfavourite`, {
        petId
    })
}