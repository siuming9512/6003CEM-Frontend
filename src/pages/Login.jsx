import { Button, Checkbox, Form, Input, Layout, Menu, Radio, Space, message } from 'antd';
import axios from 'axios';
import { useContext, useReducer } from 'react';
import UserContext from '../contexts/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { Content, Header } from 'antd/es/layout/layout';

const Login = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const initState = {
        haveAc: true
    }
    const loginReducer = (state, action) => {
        switch (action.type) {
            case "NOAC":
                return {
                    ...state, haveAc: false
                }
            case "HAVEAC":
                return {
                    ...state, haveAc: true
                }
        }
    }


    const [loginPage, dispatch] = useReducer(loginReducer, initState)

    const { setUser } = useContext(UserContext)
    const navigate = useNavigate()

    const formActionOnChange = (e) => {
        dispatch({ type: e.target.value })
    }

    const onFinish = async (values) => {
        if (loginPage.haveAc) {
            const { data } = await axios.post("http://localhost:3000/auth/login", {
                username: values.username,
                password: values.password
            })

            axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`

            const { data: profile } = await axios.get("http://localhost:3000/auth/profile")

            const userProfile = { ...profile, expiresIn: data.expiresIn }
            console.log(userProfile);

            setUser(userProfile)

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
                const { data } = await axios.post("http://localhost:3000/users", {
                    username: values.username,
                    password: values["password-register-1"],
                    staffRegisterCode: values['staff-register-code']
                })


                messageApi.open({
                    type: 'success',
                    content: "register success, please login."
                });

                dispatch({ type: "HAVEAC" })
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

    const pageLabel = loginPage.haveAc ? "Login" : "Register"

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
                        hidden={!loginPage.haveAc}
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: loginPage.haveAc,
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
                        <Radio.Group onChange={formActionOnChange} value={loginPage.haveAc? "HAVEAC": "NOAC"}>
                            <Space direction="vertical">
                                <Radio value="HAVEAC">Already a member</Radio>
                                <Radio value="NOAC">Register Here</Radio>
                            </Space>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        hidden={loginPage.haveAc}
                        label="Password"
                        name="password-register-1"
                        rules={[
                            {
                                required: !loginPage.haveAc,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        hidden={loginPage.haveAc}
                        label="Confirm Password"
                        name="password-register-2"
                        rules={[
                            {
                                required: !loginPage.haveAc,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        hidden={loginPage.haveAc}
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
