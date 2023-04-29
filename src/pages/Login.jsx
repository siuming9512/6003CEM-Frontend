import { Button, Checkbox, Form, Input, Layout, Menu, Radio, Space, message } from 'antd';
import axios from 'axios';
import { useEffect, useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Content, Header } from 'antd/es/layout/layout';
import { setToken, setUser } from '../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectActionLabel, selectActionRadio, selectHaveAc, selectRequireLogin, setActionRadioValue, setRequireLogin } from '../store/loginSlice';
import { getProfile, login, register } from '../apis/userApi';

const Login = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const promptRequireLogin = useSelector(selectRequireLogin)
    const haveAc = useSelector(selectHaveAc)
    const pageLabel = useSelector(selectActionLabel)
    const actionRadio = useSelector(selectActionRadio)


    const formActionOnChange = (e) => {
        dispatch(setActionRadioValue(e.target.value))
    }

    const onFinish = async (values) => {
        if (haveAc) {
            const data = await login(values.username, values.password)

            dispatch(setToken(data.access_token))

            const profile = await getProfile()

            dispatch(setUser({
                userId: profile.userId,
                username: profile.username,
                staffNo: profile.staffNo,
                chatroomId: profile.chatroomId
            }))

            navigate('/pets')
        } else {
            if (values["password-register-1"] != values["password-register-2"]) {
                messageApi.open({
                    type: 'error',
                    content: 'Password and Confirm Password is not equal.',
                });
                return;
            }

            try {
                await register(values.username, values["password-register-1"], values['staff-register-code'])

                messageApi.open({
                    type: 'success',
                    content: "register success, please login."
                });

                dispatch(setActionRadioValue(actionRadio.data[0]))
            } catch (error) {
                messageApi.open({
                    type: 'error',
                    content: error.response.data.message
                });
            }
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        console.log(promptRequireLogin);
        if (promptRequireLogin) {
            messageApi.open({
                type: 'error',
                content: "Please Login."
            });

            dispatch(setRequireLogin(false))
        }
    }, [])
    return (
        <Layout className="layout">
            {contextHolder}
            <Header>
                <div style={{ color: "white", fontSize: "24px" }}>{pageLabel}</div>
            </Header>
            <Content
                style={{
                    padding: '0 50px',
                    height: '100%'
                }}
            >
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                        height: "calc(100vh - 64px)",
                        paddingTop: "50px"
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input value={"string"} />
                    </Form.Item>

                    <Form.Item
                        hidden={!haveAc}
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: haveAc,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password value={"string"} />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}>
                        <Radio.Group onChange={formActionOnChange} value={actionRadio.value}>
                            <Space direction="vertical">
                                <Radio value={actionRadio.data[0]}>Already a member</Radio>
                                <Radio value={actionRadio.data[1]}>Register Here</Radio>
                            </Space>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        hidden={haveAc}
                        label="Password"
                        name="password-register-1"
                        rules={[
                            {
                                required: !haveAc,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        hidden={haveAc}
                        label="Confirm Password"
                        name="password-register-2"
                        rules={[
                            {
                                required: !haveAc,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        hidden={haveAc}
                        label="Staff Register Code"
                        name="staff-register-code"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            {pageLabel}
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
        </Layout>
    );
}

export default Login;
