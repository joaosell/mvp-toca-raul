import React from "react";
import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  Layout,
  message,
  Space,
  Typography,
} from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logotocaraul.png";
import {
  getAuthenticatedHomePath,
  isAuthenticated,
  login,
  saveAuthSession,
} from "../services/authService";

const { Content } = Layout;
const { Text, Title } = Typography;

type LoginFormValues = {
  email: string;
  password: string;
  remember?: boolean;
};

function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    document.title = "TocaRaul - Login";

    if (isAuthenticated()) {
      navigate(getAuthenticatedHomePath(), { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (values: LoginFormValues) => {
    try {
      setIsLoading(true);
      const authSession = await login({
        email: values.email,
        password: values.password,
      });
      saveAuthSession(authSession.token, authSession.user);
      message.success("Login realizado com sucesso.");
      navigate(getAuthenticatedHomePath(), { replace: true });
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      message.error("Não foi possível fazer login. Verifique seus dados.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f7fb" }}>
      <Content
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <Card
          style={{
            width: "100%",
            maxWidth: 420,
            borderRadius: 8,
            boxShadow: "0 12px 32px rgba(15, 23, 42, 0.08)",
          }}
          styles={{ body: { padding: 32 } }}
        >
          <Space
            direction="vertical"
            size={24}
            style={{ width: "100%", alignItems: "center" }}
          >
            <Link to="/">
              <img
                src={logo}
                alt="TocaRaul Logo"
                style={{ height: 96, objectFit: "contain" }}
              />
            </Link>

            <div style={{ textAlign: "center" }}>
              <Title level={2} style={{ marginBottom: 8 }}>
                Entrar
              </Title>
              <Text type="secondary">
                Acesse sua conta para continuar no TocaRaul.
              </Text>
            </div>

            <Form
              name="login"
              layout="vertical"
              requiredMark={false}
              onFinish={handleLogin}
              style={{ width: "100%" }}
            >
              <Form.Item
                label="E-mail"
                name="email"
                rules={[
                  { required: true, message: "Informe seu e-mail." },
                  { type: "email", message: "Informe um e-mail válido." },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="voce@email.com"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                label="Senha"
                name="password"
                rules={[{ required: true, message: "Informe sua senha." }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Sua senha"
                  size="large"
                />
              </Form.Item>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  marginBottom: 24,
                }}
              >
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Lembrar-me</Checkbox>
                </Form.Item>

                <Link to="/login">Esqueci a senha</Link>
              </div>

              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={isLoading}
                style={{ background: "#5b5ce2" }}
              >
                Entrar
              </Button>
            </Form>

            <Text type="secondary">
              Ainda não tem conta? <Link to="/register">Cadastre-se</Link>
            </Text>
          </Space>
        </Card>
      </Content>
    </Layout>
  );
}

export default LoginPage;
