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
  Slider,
  Checkbox,
  Space,
  Tag,
  Pagination,
  Avatar,
  Modal,
  Dropdown, // Import adicionado
} from "antd";

import {
  SearchOutlined,
  HeartOutlined,
  StarOutlined,
  UserOutlined, // Import adicionado
  SettingOutlined, // Import adicionado
  LogoutOutlined, // Import adicionado
} from "@ant-design/icons";

import logo from "../assets/logotocaraul.png";
import { Link, useNavigate } from "react-router-dom";
import { listArtists } from "../services/artistService";
import { clearAuthSession } from "../services/authService";
import type { Artist } from "../interfaces/Artist";
import { ArtistasDestaqueList } from "../components/Artists/ArtistasDestaqueList";
import { ArtistProfileDrawer } from "../components/Artists/ArtistProfileDrawer";
import { UserProfileDrawer } from "../components/UserProfileDrawer"; // <-- IMPORT DO PERFIL DO USUÁRIO AQUI

const { Header, Content, Footer, Sider } = Layout;
const { Title, Text } = Typography;

const artistasDestaquesMock: any[] = [
  {
    id: 101,
    name: "Neon Lights Band",
    genres: "Rock & Indie",
    startPrice: "2.500",
    photoUrl:
      "https://images.unsplash.com/photo-1493225457124-a1a2a5f5f9af?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 102,
    name: "DJ Synapse",
    genres: "Eletrônico / DJ",
    startPrice: "1.800",
    photoUrl:
      "https://images.unsplash.com/photo-1516280440502-690022d10cf6?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 103,
    name: "Sarah Acústico",
    genres: "Acústico Solo",
    startPrice: "900",
    photoUrl:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=500&auto=format&fit=crop",
  },
];

function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isDestaquesModalOpen, setIsDestaquesModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigate = useNavigate();

  const fetchArtists = async () => {
    try {
      const data = await listArtists();
      setArtists(data);
    } catch (error) {
      console.error("Erro ao carregar artistas:", error);
    }
  };

  useEffect(() => {
    document.title = "TocaRaul - Artistas";
    fetchArtists();
  }, []);

  const handleOpenProfile = (artist: Artist) => {
    setSelectedArtist(artist);
    setIsDrawerOpen(true);
  };

  const handleLogout = () => {
    clearAuthSession();
    navigate("/login");
  };

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
            style={{ height: 60, margin: 0, marginTop: 10, cursor: "pointer" }}
          />
        </Link>

        <Menu
          mode="horizontal"
          defaultSelectedKeys={["artistas"]}
          style={{ flex: 1, marginLeft: 40, border: "none" }}
          items={[
            { key: "artistas", label: "Artistas" },
            { key: "eventos", label: "Eventos" },
          ]}
          onClick={({ key }) => {
            if (key === "artistas") navigate("/artists");
            if (key === "eventos") navigate("/venues");
          }}
        />

        <Space size="large">
          <Input
            placeholder="Buscar artistas..."
            prefix={<SearchOutlined />}
            style={{ width: 220, borderRadius: 10 }}
          />

          <Button
            type="primary"
            onClick={() => navigate("/register?type=artist")}
            style={{
              borderRadius: 10,
              background: "#5b5ce2",
            }}
          >
            Cadastre seu perfil
          </Button>

          {/* MENU DO USUÁRIO (NOVO AVATAR COM DROPDOWN) */}
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
                  onClick: handleLogout,
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
        {/* SIDEBAR */}
        <Sider
          width={260}
          theme="light"
          style={{
            background: "transparent",
            marginRight: 24,
          }}
        >
          <Card title="Filtrar Resultados" style={{ borderRadius: 16 }}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <div>
                <Text strong>Nome do Artista</Text>
                <Input placeholder="ex: The Midnight" />
              </div>

              <div>
                <Text strong>Gênero</Text>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    marginTop: 12,
                  }}
                >
                  <Checkbox style={{ marginLeft: 0 }}>Jazz & Blues</Checkbox>
                  <Checkbox style={{ marginLeft: 0 }} defaultChecked>
                    Eletrônico / DJ
                  </Checkbox>
                  <Checkbox style={{ marginLeft: 0 }}>Acústico Solo</Checkbox>
                  <Checkbox style={{ marginLeft: 0 }}>Rock & Indie</Checkbox>
                </div>
              </div>

              <div>
                <Text strong>Faixa de Preço</Text>
                <Slider range defaultValue={[0, 5000]} />
              </div>

              <Button block>Limpar Filtros</Button>
            </Space>
          </Card>

          <Card
            style={{
              marginTop: 20,
              borderRadius: 16,
              background: "#5b5ce2",
              color: "#fff",
            }}
          >
            <Title level={4} style={{ color: "#fff" }}>
              Precisa de Ajuda?
            </Title>
            <Text style={{ color: "#e5e7ff" }}>
              Nosso suporte pode te ajudar a encontrar o artista/evento ideal.
            </Text>
            <Button
              style={{
                marginTop: 16,
                borderRadius: 10,
              }}
            >
              Fale Conosco
            </Button>
          </Card>
        </Sider>

        {/* CONTENT */}
        <Content>
          {/* HERO */}
          <Card
            style={{
              borderRadius: 20,
              overflow: "hidden",
              marginBottom: 30,
              background: "linear-gradient(135deg,#111827,#5b21b6)",
              border: "none",
            }}
            bodyStyle={{ padding: 40 }}
          >
            <Row align="middle">
              <Col span={14}>
                <Tag color="gold">DESTAQUES DO MÊS</Tag>
                <Title
                  style={{
                    color: "#fff",
                    marginTop: 16,
                    fontSize: 42,
                  }}
                >
                  Encontre o Som que Define Seu Evento
                </Title>
                <Text
                  style={{
                    color: "#d1d5db",
                    fontSize: 16,
                  }}
                >
                  Descubra mais de 1.200 artistas prontos para animar seu
                  evento.
                </Text>
                <br />
                <Button
                  type="primary"
                  size="large"
                  onClick={() => setIsDestaquesModalOpen(true)}
                  style={{
                    marginTop: 24,
                    borderRadius: 12,
                    background: "#f59e0b",
                    border: "none",
                  }}
                >
                  Ver Destaques
                </Button>
              </Col>
            </Row>
          </Card>

          {/* TITLE */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <div>
              <Title level={2} style={{ margin: 0 }}>
                Artistas Disponíveis
              </Title>
              <Text type="secondary">
                Exibindo {artists.length} de 1.248 artistas
              </Text>
            </div>
            <Text>Ordenar por: Mais Populares</Text>
          </div>

          {/* CARDS */}
          <Row gutter={[24, 24]}>
            {artists.map((artist, index) => (
              <Col xs={24} sm={12} md={8} lg={6} key={index}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={artist.name}
                      src={artist.photoUrl}
                      style={{
                        height: 240,
                        objectFit: "cover",
                      }}
                    />
                  }
                  actions={[
                    <HeartOutlined key="heart" />,
                    <Button
                      type="primary"
                      onClick={() => handleOpenProfile(artist)}
                    >
                      View Profile
                    </Button>,
                  ]}
                  style={{
                    borderRadius: 18,
                    overflow: "hidden",
                  }}
                >
                  <Tag color="purple">{artist.genres}</Tag>
                  <Title level={4} style={{ marginTop: 8, marginBottom: 8 }}>
                    {artist.name}
                  </Title>
                  <Text type="secondary">Shows ao vivo para eventos.</Text>
                  <div style={{ marginTop: 16 }}>
                    <Text strong>A partir de R$ {artist.startPrice}</Text>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          {/* PAGINATION */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 40,
            }}
          >
            <Pagination defaultCurrent={1} total={120} />
          </div>
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
              Conectando os melhores talentos com espaços incríveis para
              experiências inesquecíveis ao vivo.
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
              style={{
                background: "#f59e0b",
                border: "none",
              }}
            >
              Inscrever
            </Button>
          </Col>
        </Row>
      </Footer>

      {/* MODAL DE DESTAQUES */}
      <Modal
        title={
          <Title level={4} style={{ margin: 0 }}>
            <StarOutlined style={{ color: "#f59e0b", marginRight: 8 }} />
            Artistas em Destaque do Mês
          </Title>
        }
        open={isDestaquesModalOpen}
        onCancel={() => setIsDestaquesModalOpen(false)}
        footer={
          <Button
            type="primary"
            onClick={() => setIsDestaquesModalOpen(false)}
            style={{ background: "#5b5ce2", borderRadius: 8 }}
          >
            Fechar
          </Button>
        }
        width={700}
      >
        <ArtistasDestaqueList
          destaques={artistasDestaquesMock}
          onVerPerfil={handleOpenProfile}
        />
      </Modal>

      {/* GAVETA (DRAWER) DE PERFIL DO ARTISTA */}
      <ArtistProfileDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        artist={selectedArtist}
      />

      {/* GAVETA (DRAWER) DE PERFIL DO USUÁRIO LOGADO */}
      <UserProfileDrawer
        open={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </Layout>
  );
}

export default ArtistsPage;
