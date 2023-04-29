import axios from 'axios';
import { Button, FloatButton, Modal } from 'antd';
import { CustomerServiceOutlined, PlusOutlined } from '@ant-design/icons';
import { useQuery } from 'react-query';
import EditPetCard from '../components/Pet/EditPetCard';
import PetForm from '../components/Pet/PetForm';
import { useState } from 'react';
import { createPet, deletePet, editPet, getPets } from '../apis/petApi';

const Admin = () => {
    const [action, setAction] = useState(null)

    const petFormOnSubmitted = async (values) => {
        switch (action) {
            case 'create':
                await createPet(values.variety, values.gender, values.age, values.fileName)
                break;
            case 'edit':
                await editPet(values.petId, values.variety, values.gender, values.age, values.fileName)
                break;
        }
        setIsModalOpen(false)
        petRefetch()
        setAction(null)
    }



    const { isSuccess: petIsSuccess, data: pets, refetch: petRefetch } = useQuery({ queryKey: ['pets', null, null, null, null], queryFn: () => getPets(null, null, null, null, null) })
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

    const onDelete = async (petId) => {
        await deletePet(petId)
        petRefetch()
    }

    if (!petIsSuccess) return 'Loading...'
    const petCardItems = pets.map(x => <EditPetCard key={x.id} pet={x} isFavourite={true} onDelete={onDelete} onEdit={onEdit} />)

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