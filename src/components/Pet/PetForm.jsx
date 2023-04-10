import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Radio, Select, Upload } from "antd";
import axios from "axios";



const PetForm = ({ pet, onSubmit }) => {
    const petFormOnSubmit = (values) => {
        onSubmit(values)
        form.resetFields();
    }

    const uploadTmpImage = async ({ file, onSuccess }) => {
        let formData = new FormData()

        formData.append('file', file)

        const { data } = await axios({
            method: "post",
            url: "http://localhost:3000/pets/upload",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })

        await onSuccess(data)
    }

    const uploadOnChange = ({ file, fileList }) => {
        if (file.status == 'done') {
            console.log(file);
            form.setFieldValue('fileName', file.response)
        }
    }
    const [form] = Form.useForm()
    return <Form
        form={form}
        name="petForm"
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
            <Select>
                <Select.Option default value="A">A</Select.Option>
                <Select.Option value="B">B</Select.Option>
                <Select.Option value="C">C</Select.Option>
            </Select>
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
        >
            <Upload name="image" customRequest={uploadTmpImage} listType="picture" onChange={uploadOnChange}>
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
        <Form.Item>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item>
    </Form>
}

export default PetForm;