import React from "react";
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Layout,
  Row,
  Segmented,
  Select,
  Space,
  Typography,
  message,
} from "antd";
import {
  HomeOutlined,
  LockOutlined,
  MailOutlined,
  SoundOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import logo from "../assets/logotocaraul.png";
import {
  getAuthenticatedHomePath,
  isAuthenticated,
  registerUser,
  type RegisterUserData,
  type UserAccountType,
} from "../services/authService";

const { Content } = Layout;
const { Text, Title } = Typography;
const { TextArea } = Input;

type RegisterFormValues = Omit<RegisterUserData, "type"> & {
  type: UserAccountType;
};

function RegisterPage() {
  const [form] = Form.useForm<RegisterFormValues>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = React.useState(false);

  const initialType = searchParams.get("type") === "venue" ? "venue_owner" : "artist";
  const accountType = Form.useWatch("type", form) ?? initialType;

  React.useEffect(() => {
    document.title = "TocaRaul - Cadastro";

    if (isAuthenticated()) {
      navigate(getAuthenticatedHomePath(), { replace: true });
    }
  }, [navigate]);

  const handleRegister = async (values: RegisterFormValues) => {
    const payload: RegisterUserData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      type: values.type,
      ...(values.type === "artist"
        ? { artist: values.artist }
        : { venue: values.venue }),
    };

    try {
      setIsLoading(true);
      await registerUser(payload);
      message.success("Cadastro realizado com sucesso.");
      navigate("/login");
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      message.error("Não foi possível concluir o cadastro.");
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
          justifyContent: "center",
          padding: "32px 24px",
        }}
      >
        <Card
          style={{
            width: "100%",
            maxWidth: 760,
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
                style={{ height: 90, objectFit: "contain" }}
              />
            </Link>

            <div style={{ textAlign: "center" }}>
              <Title level={2} style={{ marginBottom: 8 }}>
                Criar conta
              </Title>
              <Text type="secondary">
                Cadastre seu usuário e complete o perfil que combina com você.
              </Text>
            </div>

            <Form
              form={form}
              layout="vertical"
              requiredMark={false}
              initialValues={{ type: initialType }}
              onFinish={handleRegister}
              style={{ width: "100%" }}
            >
              <Form.Item name="type" style={{ marginBottom: 24 }}>
                <Segmented
                  block
                  size="large"
                  options={[
                    {
                      label: "Artista",
                      value: "artist",
                      icon: <SoundOutlined />,
                    },
                    {
                      label: "Dono de estabelecimento",
                      value: "venue_owner",
                      icon: <HomeOutlined />,
                    },
                  ]}
                />
              </Form.Item>

              <Divider style={{ color: "#5b5ce2", fontSize: 14 }}>
                Dados do usuário
              </Divider>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Nome"
                    name="firstName"
                    rules={[{ required: true, message: "Informe seu nome." }]}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="Seu nome"
                      size="large"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Sobrenome" name="lastName">
                    <Input placeholder="Seu sobrenome" size="large" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
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
                </Col>
                <Col xs={24} md={12}>
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
                </Col>
              </Row>

              {accountType === "artist" ? (
                <>
                  <Divider style={{ color: "#5b5ce2", fontSize: 14 }}>
                    Perfil de artista
                  </Divider>

                  <Form.Item
                    label="Nome Artístico / Banda"
                    name={["artist", "name"]}
                    rules={[
                      {
                        required: true,
                        message: "O nome artístico é obrigatório.",
                      },
                    ]}
                  >
                    <Input placeholder="Ex: Raul Seixas Cover" size="large" />
                  </Form.Item>

                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Gênero Musical Principal"
                        name={["artist", "genres"]}
                        rules={[
                          {
                            required: true,
                            message: "Selecione um gênero.",
                          },
                        ]}
                      >
                        <Select placeholder="Selecione..." size="large">
                          <Select.Option value="Rock & Indie">
                            Rock & Indie
                          </Select.Option>
                          <Select.Option value="Eletrônico / DJ">
                            Eletrônico / DJ
                          </Select.Option>
                          <Select.Option value="Jazz & Blues">
                            Jazz & Blues
                          </Select.Option>
                          <Select.Option value="Acústico Solo">
                            Acústico Solo
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Preço Inicial do Show"
                        name={["artist", "start_price"]}
                        rules={[
                          {
                            required: true,
                            message: "Informe o valor inicial.",
                          },
                        ]}
                      >
                        <Input placeholder="Ex: R$ 1.500" size="large" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    label="Sobre o Artista / Release"
                    name={["artist", "about"]}
                    rules={[
                      {
                        required: true,
                        message: "Conte um pouco sobre seu trabalho.",
                      },
                    ]}
                  >
                    <TextArea
                      rows={4}
                      placeholder="Conte sobre sua experiência, estrutura de show e repertório..."
                    />
                  </Form.Item>

                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="URL da Foto de Perfil"
                        name={["artist", "photo_url"]}
                        rules={[
                          {
                            required: true,
                            message: "Informe uma URL de foto.",
                          },
                        ]}
                      >
                        <Input
                          placeholder="https://exemplo.com/suafoto.jpg"
                          size="large"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Link de Demonstração"
                        name={["artist", "samples_url"]}
                        rules={[
                          {
                            required: true,
                            message: "Informe um link de demonstração.",
                          },
                        ]}
                      >
                        <Input
                          placeholder="YouTube, Spotify ou SoundCloud"
                          size="large"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              ) : (
                <>
                  <Divider style={{ color: "#5b5ce2", fontSize: 14 }}>
                    Perfil do estabelecimento
                  </Divider>

                  <Form.Item
                    label="Nome do Espaço / Evento"
                    name={["venue", "name"]}
                    rules={[{ required: true, message: "O nome é obrigatório." }]}
                  >
                    <Input placeholder="Ex: The Blue Note Lounge" size="large" />
                  </Form.Item>

                  <Row gutter={16}>
                    <Col xs={24} md={16}>
                      <Form.Item
                        label="Localização / Endereço"
                        name={["venue", "location"]}
                        rules={[
                          {
                            required: true,
                            message: "Informe a localização.",
                          },
                        ]}
                      >
                        <Input placeholder="Ex: Centro - Joinville" size="large" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                      <Form.Item
                        label="Capacidade"
                        name={["venue", "capacity"]}
                        rules={[
                          {
                            required: true,
                            message: "Informe a capacidade.",
                          },
                        ]}
                      >
                        <Input placeholder="Ex: 120" size="large" suffix="pessoas" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Estilo Musical Buscado"
                        name={["venue", "genre"]}
                        rules={[
                          {
                            required: true,
                            message: "Selecione um gênero.",
                          },
                        ]}
                      >
                        <Select placeholder="Selecione..." size="large">
                          <Select.Option value="Jazz & Blues">
                            Jazz & Blues
                          </Select.Option>
                          <Select.Option value="Eletrônico">Eletrônico</Select.Option>
                          <Select.Option value="Acústico">Acústico</Select.Option>
                          <Select.Option value="Indie / Pop">Indie / Pop</Select.Option>
                          <Select.Option value="Rock">Rock</Select.Option>
                          <Select.Option value="Qualquer Estilo">
                            Qualquer Estilo
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Faixa de Cachê Oferecida"
                        name={["venue", "price"]}
                        rules={[
                          {
                            required: true,
                            message: "Informe o valor.",
                          },
                        ]}
                      >
                        <Input placeholder="Ex: R$ 450 - R$ 900" size="large" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Data e Horário do Evento"
                        name={["venue", "date"]}
                        rules={[{ required: true, message: "Informe a data." }]}
                      >
                        <Input placeholder="Ex: 24 Nov - 20:00" size="large" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="URL da Imagem do Local"
                        name={["venue", "image"]}
                        rules={[
                          {
                            required: true,
                            message: "Informe uma URL de imagem.",
                          },
                        ]}
                      >
                        <Input
                          placeholder="https://exemplo.com/fotodobar.jpg"
                          size="large"
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    label="Descrição do Evento/Espaço"
                    name={["venue", "description"]}
                  >
                    <TextArea
                      rows={3}
                      placeholder="Descreva estrutura, equipamentos, palco e detalhes importantes..."
                    />
                  </Form.Item>
                </>
              )}

              <Form.Item style={{ marginTop: 30, marginBottom: 0 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  loading={isLoading}
                  style={{ background: "#5b5ce2", borderRadius: 8, height: 45 }}
                >
                  Criar conta
                </Button>
              </Form.Item>
            </Form>

            <Text type="secondary">
              Já tem conta? <Link to="/login">Entrar</Link>
            </Text>
          </Space>
        </Card>
      </Content>
    </Layout>
  );
}

export default RegisterPage;
