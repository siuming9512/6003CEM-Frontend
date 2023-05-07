import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Radio, Select, Upload } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { uploadFile } from "../../apis/petApi";



const getBreeds = async () => {
    const { data } = await axios.get('https://api.thecatapi.com/v1/breeds?limit=1000&page=0')

    return data.map(x => ({label: x.name, value: x.name}))
}

const PetForm = ({ pet, onSubmit }) => {
    const { isSuccess: breedIsSuccess, data: breeds } = useQuery({ queryKey: ['breeds'], queryFn: getBreeds, }, {staleTime: Infinity})

    const petFormOnSubmit = (values) => {
        onSubmit(values)
        form.resetFields();
        setFileList([])
    }

    const [fileList, setFileList] = useState([])

    const uploadTmpImage = async ({ file, onSuccess }) => {
        const data = await uploadFile(file)

        await onSuccess(data)
    }

    const uploadOnChange = ({ file, fileList }) => {
        if (file.status == 'done') {
            form.setFieldValue('fileName', file.response)
        }

        setFileList(fileList)
    }

    let formInitValues = null

    useEffect(() => {
        console.log(pet);
        if (!!pet) {
            form.setFieldsValue({
                petId: pet.id,
                variety: pet.variety,
                gender: pet.gender,
                age: pet.age,
                upload: {
                    file: {
                        status: 'done',
                        url: pet.imageUrl
                    }
                }
            })

            setFileList([{
                uid: -1,
                name: 'orignal.png',
                status: 'done',
                url: pet.imageUrl
            }])
        } else {
            setFileList([])
        }
    }, [pet])

    const [form] = Form.useForm()
    return <Form
        form={form}
        name="petForm"
        initialValues={formInitValues}
        labelCol={{
            span: 4,
        }}
        onFinish={petFormOnSubmit}>
        <Form.Item
            label="Variety"
            name="variety"
            rules={[
                {
                    required: true,
                    message: 'Please input the variety!',
                },
            ]}
        >
            <Select showSearch options={breeds}></Select>
        </Form.Item>

        <Form.Item
            label="Gender"
            name="gender"
            rules={[
                {
                    required: true,
                    message: 'Please input the gender!',
                },
            ]}
        >
            <Radio.Group>
                <Radio value="Male"> Male </Radio>
                <Radio value="Female"> Female </Radio>
            </Radio.Group>
        </Form.Item>
        <Form.Item
            label="Age"
            name="age"
            rules={[
                {
                    required: true,
                    message: 'Please input age!',
                },
            ]}

        >
            <InputNumber />
        </Form.Item>
        <Form.Item
            name="upload"
            label="Upload"
            rules={[
                {
                    required: true
                }
            ]}
        >
            <Upload
                name="image"
                maxCount={1} fileList={fileList} customRequest={uploadTmpImage} listType="picture" onChange={uploadOnChange}>
                {/* <Upload name="image" listType="picture" onChange={uploadOnChange}> */}
                <Button icon={<UploadOutlined />}> Click to Upload</Button>
            </Upload>
        </Form.Item>
        <Form.Item
            name="fileName"
            rules={[
                {
                    required: true,
                },
            ]}
            noStyle
        >
            <Input type="hidden" />
        </Form.Item>
        <Form.Item
            name="petId"
            noStyle
        >
            <Input type="hidden" />
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item>
    </Form>
}

export default PetForm;