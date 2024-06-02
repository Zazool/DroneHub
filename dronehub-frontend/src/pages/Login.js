// src/pages/Login.js
// src/pages/Login.js
import { useNavigate } from 'react-router-dom';
import { Input, Button, Form } from 'antd';
import '../styles/global/Global.css';
import '../styles/Home.css';

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    console.log('Received values of form: ', values);
    // Handle login logic here
    navigate('/dashboard'); // Redirect to dashboard or another page after login
  };

  return (
    <div className="home-container">
      <div className="content">
        <h2>Login</h2>
        <Form
          form={form}
          name="login_form"
          onFinish={handleSubmit}
          className="custom-form"
          layout="vertical" // Set the layout to vertical
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input type="email" className="form-input" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input type="password" className="form-input" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="search-button">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
