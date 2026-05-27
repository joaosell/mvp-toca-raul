import { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Input,
  Button,
  Card,
  Row,
  Col,
  Typography,
  Space,
  Tag,
  Pagination,
  Avatar,
  Modal,
  Dropdown,
} from "antd";

import {
  SearchOutlined,
  HeartOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  StarOutlined,
  TeamOutlined,
  RocketOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import logo from "../assets/logotocaraul.png";
import { Link, useNavigate } from "react-router-dom";
import { CadastroEventoForm } from "../components/Venues/CadastroEventoForm";
import { UserProfileDrawer } from "../components/UserProfileDrawer";
import { InscricaoEventoModal } from "../components/Venues/InscricaoEventoModal";

const { Header, Content, Footer, Sider } = Layout;
const { Title, Text } = Typography;

const venues = [
  {
    name: "Blue Note Lounge",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop",
    location: "Centro • Joinville",
    genre: "Jazz & Blues",
    date: "24 Nov • 20:00",
    price: "R$ 450 - R$ 900",
    capacity: "120 pessoas",
    rating: "4.9",
    description: "Estamos procurando bandas e artistas para apresentações ao vivo em um ambiente sofisticado e intimista. O espaço oferece estrutura premium, iluminação profissional e ótima acústica para experiências inesquecíveis.",
  },
  {
    name: "Underground Club",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop",
    location: "Zona Norte",
    genre: "Indie / Pop",
    date: "27 Nov • 22:00",
    price: "R$ 300 - R$ 700",
    capacity: "200 pessoas",
    rating: "4.7",
    description: "Espaço alternativo buscando bandas autorais ou covers de Indie/Pop para animar as noites de sexta. Palco no nível do público, criando uma vibe muito próxima com a galera.",
  },
  {
    name: "Warehouse Stage",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1200&auto=format&fit=crop",
    location: "Distrito Industrial",
    genre: "Eletrônico",
    date: "02 Dez • 23:00",
    price: "R$ 1.200 - R$ 3.000",
    capacity: "800 pessoas",
    rating: "5.0",
    description: "Galpão industrial revitalizado para mega eventos. Buscamos DJs com sets energéticos. A casa possui sistema de som Line Array e painéis de LED cobrindo todo o palco principal.",
  },
  {
    name: "Sunset Rooftop",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop",
    location: "Beira Mar",
    genre: "Acústico",
    date: "05 Dez • 19:30",
    price: "R$ 600 - R$ 1.400",
    capacity: "150 pessoas",
    rating: "4.8",
    description: "Rooftop com vista para o pôr do sol. Ideal para um som acústico, voz e violão, surf music ou MPB. Clima relaxante e público selecionado.",
  },
];

function VenuesPage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(venues[0]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isInscricaoOpen, setIsInscricaoOpen] = useState(false);
  useEffect(() => {
    document.title = "TocaRaul - Eventos";
  }, []);

  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f7fb" }}>
      {/* HEADER */}
      <Header
        style={{
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          borderBottom: "1px solid #eee",
        }}
      >
        <Link to="/">
          <img
            src={logo}
            alt="TocaRaul Logo"
            style={{ height: 60, margin: 0, marginTop: 30, cursor: "pointer" }}
          />
        </Link>

        <Menu
          mode="horizontal"
          defaultSelectedKeys={["venues"]}
          style={{ flex: 1, marginLeft: 40, border: "none" }}
          items={[
            { key: "artists", label: "Artistas" },
            { key: "venues", label: "Eventos" },
          ]}
          onClick={({ key }) => {
            if (key === "artists") navigate("/artists");
            if (key === "venues") navigate("/venues");
          }}
        />

        <Space size="large">
          <Input
            placeholder="Buscar eventos..."
            prefix={<SearchOutlined />}
            style={{ width: 220, borderRadius: 10 }}
          />

          <Button
            type="primary"
            onClick={() => setIsModalOpen(true)}
            style={{
              borderRadius: 10,
              background: "#5b5ce2",
            }}
          >
            Cadastre seu Espaço
          </Button>

          {/* MENU DO USUÁRIO */}
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  icon: <UserOutlined />,
                  label: "Meu Perfil",
                  onClick: () => setIsProfileOpen(true),
                },
                {
                  key: "2",
                  icon: <SettingOutlined />,
                  label: "Configurações",
                },
                {
                  type: "divider",
                },
                {
                  key: "3",
                  icon: <LogoutOutlined />,
                  danger: true,
                  label: "Sair",
                },
              ],
            }}
            placement="bottomRight"
            trigger={["click"]}
          >
            <Avatar 
              src="https://i.pravatar.cc/150?img=11" 
              style={{ cursor: "pointer", border: "2px solid transparent" }} 
              size="large"
            />
          </Dropdown>
        </Space>
      </Header>

      {/* MAIN */}
      <Layout style={{ padding: "24px 40px" }}>
        {/* SIDEBAR - LISTA DE EVENTOS */}
        <Sider
          width={300}
          theme="light"
          style={{
            background: "transparent",
            marginRight: 24,
          }}
        >
          <div style={{ marginBottom: 20 }}>
            <Title level={2} style={{ marginBottom: 0 }}>
              Descubra Eventos
            </Title>
            <Text type="secondary">42 oportunidades disponíveis</Text>
          </div>

          <Space
            direction="vertical"
            size={18}
            style={{ width: "100%" }}
          >
            {venues.map((venue, index) => {
              const isSelected = selectedVenue.name === venue.name;

              return (
                <Card
                  key={index}
                  hoverable
                  onClick={() => setSelectedVenue(venue)}
                  style={{
                    borderRadius: 18,
                    border: isSelected ? "2px solid #5b5ce2" : "1px solid #ececec",
                    background: isSelected ? "#f8f9ff" : "#fff",
                    transition: "all 0.3s ease"
                  }}
                  styles={{ body: { padding: 16 } }}
                >
                  <div style={{ display: "flex", gap: 14 }}>
                    <img
                      src={venue.image}
                      alt={venue.name}
                      style={{
                        width: 75,
                        height: 75,
                        borderRadius: 12,
                        objectFit: "cover",
                      }}
                    />

                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "start",
                        }}
                      >
                        <Title level={5} style={{ margin: 0 }}>
                          {venue.name}
                        </Title>
                      </div>

                      <Text type="secondary" style={{ fontSize: 12 }}>
                        <EnvironmentOutlined /> {venue.location}
                      </Text>

                      <div style={{ marginTop: 10 }}>
                        <Text>{venue.genre}</Text>
                      </div>

                      <div style={{ marginTop: 6 }}>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          <CalendarOutlined /> {venue.date}
                        </Text>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </Space>
        </Sider>

        {/* CONTENT - PAINEL DINÂMICO DO EVENTO SELECIONADO */}
        <Content>
          <Card
            style={{
              borderRadius: 24,
              overflow: "hidden",
              border: "none",
              padding: 0,
            }}
            styles={{ body: { padding: 0 } }}
          >
            {/* HERO IMAGE DINÂMICA */}
            <div
              style={{
                height: 320,
                backgroundImage: `url('${selectedVenue.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                transition: "background-image 0.4s ease-in-out"
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.1))",
                  display: "flex",
                  alignItems: "end",
                  padding: 32,
                }}
              >
                <div>
                  <Tag color="gold">OPORTUNIDADE EM ABERTO</Tag>

                  <Title
                    style={{
                      color: "#fff",
                      marginTop: 12,
                      marginBottom: 8,
                      fontSize: 42,
                    }}
                  >
                    {selectedVenue.name}
                  </Title>

                  <Text style={{ color: "#d1d5db", fontSize: 16 }}>
                    📍 {selectedVenue.location}
                  </Text>
                </div>
              </div>
            </div>

            {/* INFO CARDS DINÂMICOS */}
            <div style={{ padding: 28 }}>
              <Row gutter={[20, 20]}>
                <Col xs={24} md={8}>
                  <Card
                    style={{
                      borderRadius: 18,
                      background: "#f5f7ff",
                      border: "none",
                    }}
                  >
                    <Space direction="vertical">
                      <Text type="secondary">Faixa de Cachê</Text>
                      <Title level={4} style={{ margin: 0 }}>
                        {selectedVenue.price}
                      </Title>
                    </Space>
                  </Card>
                </Col>

                <Col xs={24} md={8}>
                  <Card
                    style={{
                      borderRadius: 18,
                      background: "#f5f7ff",
                      border: "none",
                    }}
                  >
                    <Space direction="vertical">
                      <Text type="secondary">
                        <StarOutlined /> Avaliação do Espaço
                      </Text>
                      <Title level={4} style={{ margin: 0 }}>
                        {selectedVenue.rating} / 5.0
                      </Title>
                    </Space>
                  </Card>
                </Col>

                <Col xs={24} md={8}>
                  <Card
                    style={{
                      borderRadius: 18,
                      background: "#f5f7ff",
                      border: "none",
                    }}
                  >
                    <Space direction="vertical">
                      <Text type="secondary">
                        <TeamOutlined /> Capacidade
                      </Text>
                      <Title level={4} style={{ margin: 0 }}>
                        {selectedVenue.capacity}
                      </Title>
                    </Space>
                  </Card>
                </Col>
              </Row>

              {/* DESCRIÇÃO DINÂMICA */}
              <div style={{ marginTop: 35 }}>
                <Title level={3}>Sobre a Oportunidade</Title>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#555",
                    lineHeight: 1.8,
                  }}
                >
                  {selectedVenue.description}
                </Text>
              </div>

              {/* REQUISITOS */}
              <div style={{ marginTop: 25 }}>
                <Title level={5}>Estilos procurados:</Title>
                <Space wrap>
                  {selectedVenue.genre.split(/[&/]/).map((g, i) => (
                     <Tag key={i} color="purple">{g.trim()}</Tag>
                  ))}
                </Space>
              </div>

              {/* ACTIONS */}
              <Space style={{ marginTop: 32 }}>
                <Button
                  type="primary"
                  size="large"
                  onClick={() => setIsInscricaoOpen(true)}
                  style={{
                    background: "#5b5ce2",
                    border: "none",
                    borderRadius: 12,
                    padding: "0 30px",
                  }}
                >
                  Inscrever-se
                </Button>

                <Button
                  size="large"
                  icon={<HeartOutlined />}
                  style={{
                    borderRadius: 12,
                    padding: "0 24px",
                  }}
                >
                  Salvar
                </Button>
              </Space>
            </div>
          </Card>
        </Content>
      </Layout>

      {/* FOOTER */}
      <Footer
        style={{
          background: "#dbe4ff",
          padding: "50px 40px",
        }}
      >
        <Row gutter={40}>
          <Col span={8}>
            <Title level={3}>Toca Raul</Title>
            <Text>
              Conectando artistas e espaços para criar experiências musicais
              inesquecíveis ao vivo.
            </Text>
          </Col>

          <Col span={5}>
            <Title level={5}>Marketplace</Title>
            <Space direction="vertical">
              <a>Guia do Artista</a>
              <a>Perguntas Frequentes</a>
              <a>Planos e Preços</a>
            </Space>
          </Col>

          <Col span={5}>
            <Title level={5}>Empresa</Title>
            <Space direction="vertical">
              <a>Sobre Nós</a>
              <a>Carreiras</a>
              <a>Política de Privacidade</a>
            </Space>
          </Col>

          <Col span={6}>
            <Title level={5}>Newsletter</Title>
            <Input placeholder="Seu e-mail" style={{ marginBottom: 10 }} />
            <Button
              type="primary"
              block
              style={{ background: "#f59e0b", border: "none" }}
            >
              Inscrever
            </Button>
          </Col>
        </Row>
      </Footer>

      {/* MODAL DE CADASTRO DO EVENTO/ESPAÇO */}
      <Modal
        title={
          <Title level={4} style={{ margin: 0 }}>
            <RocketOutlined style={{ color: "#5b5ce2", marginRight: 8 }} />
            Cadastrar Novo Espaço / Evento
          </Title>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnClose
        width={650}
      >
        <CadastroEventoForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>

      <InscricaoEventoModal
        open={isInscricaoOpen}
        onClose={() => setIsInscricaoOpen(false)}
        venue={selectedVenue}
      />

      {/* DRAWER DO PERFIL DO USUÁRIO */}
      <UserProfileDrawer 
        open={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
      />
    </Layout>
  );
}

export default VenuesPage;