import axios from 'axios';
import { Button, FloatButton, Modal } from 'antd';
import { CustomerServiceOutlined, PlusOutlined } from '@ant-design/icons';
import { useQuery } from 'react-query';
import EditPetCard from '../components/Pet/EditPetCard';
import PetForm from '../components/Pet/PetForm';
import { useState } from 'react';
import { createPet, deletePet, editPet, getPets } from '../apis/petApi';
import SearchBar from '../components/SearchBar';
import { useSelector } from 'react-redux';
import { selectSearchCurrentValue } from '../store/searchBarSlice';

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

    const searchBarCurrent = useSelector(selectSearchCurrentValue)

    const { isSuccess: petIsSuccess, data: pets, refetch: petRefetch } = useQuery({ queryKey: ['pets', searchBarCurrent.variety, searchBarCurrent.gender, searchBarCurrent.age.min, searchBarCurrent.age.max, searchBarCurrent.favourite], queryFn: () => getPets(searchBarCurrent.variety, searchBarCurrent.gender, searchBarCurrent.age.min, searchBarCurrent.age.max, searchBarCurrent.favourite) })

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

    const petCardItems = !petIsSuccess ? "" : pets.map(x => <EditPetCard key={x.id} pet={x} isFavourite={true} onDelete={onDelete} onEdit={onEdit} />)

    return <>
        <SearchBar isAdmin={true} />
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