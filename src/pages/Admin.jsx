import axios from 'axios';
import { Button, FloatButton, Modal } from 'antd';
import { CustomerServiceOutlined, PlusOutlined } from '@ant-design/icons';
import { useQuery } from 'react-query';
import EditPetCard from '../components/Pet/EditPetCard';
import PetForm from '../components/Pet/PetForm';
import { useState } from 'react';

const Admin = () => {
    const [action, setAction] = useState(null)

    const petFormOnSubmitted = async (values) => {
        switch (action) {
            case 'create':
                await createPet(values)
                break;
            case 'edit':
                await editPet(values)
                break;
        }
        setIsModalOpen(false)
        petRefetch()
        setAction(null)
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

    };

    const editPet = async (values) => {
        const data = {
            variety: values.variety,
            gender: values.gender,
            age: values.age,
        }

        if (!!values.fileName) {
            data.imageFileName = values.fileName
        }

        await axios.patch(`http://localhost:3000/pets/${values.petId}`, data)
    }

    const deletePet = async (petId) => {
        await axios.delete(`http://localhost:3000/pets/${petId}`)
        petRefetch()
    };

    const { isSuccess: petIsSuccess, data: pets, refetch: petRefetch } = useQuery({ queryKey: ['pets'], queryFn: getPets })
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editPetSource, setEditPetSource] = useState(null)
    const [modalTitle, setModalTitle] = useState('')

    const createClicked = () => {
        setAction('create')
        setModalTitle('Create Pet')
        setEditPetSource(null)
        setIsModalOpen(true)
    }

    const onEdit = (pet) => {
        setAction('edit')
        setModalTitle('Edit Pet')
        setEditPetSource(pet)
        setIsModalOpen(true)
    }

    if (!petIsSuccess) return 'Loading...'
    const petCardItems = pets.map(x => <EditPetCard key={x.id} pet={x} isFavourite={true} onDelete={deletePet} onEdit={onEdit} />)

    return <>
        <Modal open={isModalOpen} title={modalTitle} footer={null} onCancel={() => setIsModalOpen(false)}>
            <PetForm pet={editPetSource} onSubmit={petFormOnSubmitted} />
        </Modal>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
            {petCardItems}
        </div>
        <FloatButton type="primary" icon={<PlusOutlined />} onClick={createClicked} />
    </>
}
export default Admin;