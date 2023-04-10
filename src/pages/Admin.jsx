import axios from 'axios';
import { FloatButton, Modal } from 'antd';
import { CustomerServiceOutlined, PlusOutlined } from '@ant-design/icons';
import { useQuery } from 'react-query';
import EditPetCard from '../components/Pet/EditPetCard';
import PetForm from '../components/Pet/PetForm';
import { useState } from 'react';

const Admin = () => {
    const petFormOnSubmitted = async (values) => {
        await createPet(values)
        setIsModalOpen(false)
    }

    const getPets = async () => {
        const { data } = await axios.get('http://localhost:3000/pets')

        return data.map(x => ({ key: x.id, ...x }));
    }

    const createPet = async (values) => {
        const data = {
            variety: values.variety,
            gender: values.gender,
            age: values.age,
            imageFileName: values.fileName,
        }

        await axios.post("http://localhost:3000/pets", data)
        petRefetch()
    };

    const editPet = async (pet) => {
        await axios.patch(`http://localhost:3000/pets/${pet.id}`)
        // await axios.delete(`http://localhost:3000/pets/${petId}`)
        // petRefetch()
    }

    const deletePet = async (petId) => {
        await axios.delete(`http://localhost:3000/pets/${petId}`)
        petRefetch()
    };

    const { isSuccess: petIsSuccess, data: pets, refetch: petRefetch } = useQuery({ queryKey: ['pets'], queryFn: getPets })
    const [isModalOpen, setIsModalOpen] = useState(false)

    const triggerModal = (state) => {
        setIsModalOpen(state ?? !isModalOpen)
    }


    if (!petIsSuccess) return 'Loading...'
    const petCardItems = pets.map(x => <EditPetCard key={x.id} pet={x} isFavourite={true} onDelete={deletePet} onEdit={editPet} />)

    return <>
        <Modal open={isModalOpen} title="Create Pet" footer={null} onCancel={() => setIsModalOpen(false)}>
            <PetForm onSubmit={petFormOnSubmitted} />
        </Modal>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
            {petCardItems}
        </div>
        <FloatButton type="primary" icon={<PlusOutlined />} onClick={() => triggerModal()} />
    </>
}
export default Admin;