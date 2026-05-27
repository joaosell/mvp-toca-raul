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
  Dropdown,
  Select,
} from "antd";
import {
  SearchOutlined,
  HeartOutlined,
  RocketOutlined,
  StarOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

import { listArtists } from "../services/artistService";
import type { Artist } from "../interfaces/Artist";
import { sanitizeArtistObject } from "../utils/artistHandlers";
import { useArtistFilters } from "../hooks/useArtistFilters";

import logo from "../assets/logotocaraul.png";

import { CadastroArtistaForm } from "../components/Artists/CadastroArtistaForm";
import { ArtistasDestaqueList } from "../components/Artists/ArtistasDestaqueList";
import { ArtistProfileDrawer } from "../components/Artists/ArtistProfileDrawer";
import { UserProfileDrawer } from "../components/UserProfileDrawer";
import { PropostaShowModal } from "../components/Artists/PropostaShowModal";
import { SuporteModal } from "../components/SuporteModal";

const { Header, Content, Footer, Sider } = Layout;
const { Title, Text } = Typography;

const DEFAULT_ARTIST_IMAGE =
  "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=600&auto=format&fit=crop";

const artistasDestaquesMock: any[] = [
  {
    id: 101,
    name: "Neon Lights Band",
    genres: "Rock & Indie",
    startPrice: "2.500",
    photoUrl:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 102,
    name: "DJ Synapse",
    genres: "Eletrônico / DJ",
    startPrice: "1.800",
    photoUrl:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=500&auto=format&fit=crop",
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
  const [availableGenres, setAvailableGenres] = useState<string[]>([]);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  // Modais e Drawers controles de visibilidade
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDestaquesModalOpen, setIsDestaquesModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPropostaOpen, setIsPropostaOpen] = useState(false);
  const [isSuporteOpen, setIsSuporteOpen] = useState(false);

  const navigate = useNavigate();

  // CONSUMO DO CUSTOM HOOK DE FILTRAGEM
  const {
    filterName,
    setFilterName,
    filterGenres,
    setFilterGenres,
    filterPrice,
    setFilterPrice,
    sortBy,
    setSortBy,
    handleApplyFilters,
    handleClearFilters,
    processedArtists,
  } = useArtistFilters(artists);

  const fetchArtists = async () => {
    try {
      const data = await listArtists();
      const sanitizedData = (data || []).map((item: any) =>
        sanitizeArtistObject(item),
      );
      setArtists(sanitizedData);

      if (sanitizedData.length > 0) {
        const generosUnicos = Array.from(
          new Set(
            sanitizedData
              .map((a: any) => a.genres)
              .filter((g: string) => g && g.trim() !== ""),
          ),
        ) as string[];
        setAvailableGenres(generosUnicos);
      }
    } catch (error) {
      console.error("Erro ao carregar artistas:", error);
    }
  };

  useEffect(() => {
    document.title = "TocaRaul - Artistas";
    fetchArtists();
  }, []);

  const handleCadastroSucesso = () => {
    setIsModalOpen(false);
    fetchArtists();
  };

  const handleOpenProfile = (artist: Artist) => {
    setIsDestaquesModalOpen(false);
    setSelectedArtist(sanitizeArtistObject(artist));
    setIsDrawerOpen(true);
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f7fb" }}>
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
            style={{ height: 60, marginTop: 30, cursor: "pointer" }}
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
          onClick={({ key }) =>
            navigate(key === "artistas" ? "/artists" : "/venues")
          }
        />
        <Space size="large">
          <Input
            placeholder="Buscar artistas..."
            prefix={<SearchOutlined />}
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            style={{ width: 220, borderRadius: 10 }}
            allowClear
          />
          <Button
            type="primary"
            onClick={() => setIsModalOpen(true)}
            style={{ borderRadius: 10, background: "#5b5ce2" }}
          >
            Cadastre seu perfil
          </Button>
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  icon: <UserOutlined />,
                  label: "Meu Perfil",
                  onClick: () => setIsProfileOpen(true),
                },
                { key: "2", icon: <SettingOutlined />, label: "Configurações" },
                { type: "divider" },
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

      <Layout style={{ padding: "24px 40px" }}>
        <Sider
          width={260}
          theme="light"
          style={{ background: "transparent", marginRight: 24 }}
        >
          <Card title="Filtrar Resultados" style={{ borderRadius: 16 }}>
            <Space direction="vertical" style={{ width: "100%" }} size={16}>
              <div>
                <Text strong>Nome do Artista</Text>
                <Input
                  placeholder="ex: The Midnight"
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                  style={{ marginTop: 6 }}
                  allowClear
                />
              </div>
              <div>
                <Text strong>Gênero</Text>
                {availableGenres.length > 0 ? (
                  <Checkbox.Group
                    value={filterGenres}
                    onChange={(vals) => setFilterGenres(vals as string[])}
                    style={{ width: "100%" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                        marginTop: 12,
                      }}
                    >
                      {availableGenres.map((g) => (
                        <Checkbox key={g} value={g} style={{ marginLeft: 0 }}>
                          {g}
                        </Checkbox>
                      ))}
                    </div>
                  </Checkbox.Group>
                ) : (
                  <div style={{ marginTop: 8 }}>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      Carregando gêneros...
                    </Text>
                  </div>
                )}
              </div>
              <div>
                <Text strong>Faixa de Preço</Text>
                <Slider
                  range
                  min={0}
                  max={5000}
                  value={filterPrice}
                  onChange={(val) => setFilterPrice(val as [number, number])}
                  style={{ marginTop: 6 }}
                />
              </div>
              <Row gutter={10} style={{ marginTop: 10 }}>
                <Col span={12}>
                  <Button
                    block
                    onClick={() => handleClearFilters(fetchArtists)}
                    style={{ borderRadius: 8 }}
                  >
                    Limpar
                  </Button>
                </Col>
                <Col span={12}>
                  <Button
                    type="primary"
                    block
                    icon={<FilterOutlined />}
                    onClick={handleApplyFilters}
                    style={{
                      background: "#5b5ce2",
                      border: "none",
                      borderRadius: 8,
                    }}
                  >
                    Filtrar
                  </Button>
                </Col>
              </Row>
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
              onClick={() => setIsSuporteOpen(true)}
              style={{ marginTop: 16, borderRadius: 10 }}
            >
              Fale Conosco
            </Button>
          </Card>
        </Sider>

        <Content>
          <Card
            style={{
              borderRadius: 20,
              overflow: "hidden",
              marginBottom: 30,
              background: "linear-gradient(135deg,#111827,#5b21b6)",
              border: "none",
            }}
            styles={{ body: { padding: 40 } }}
          >
            <Row align="middle">
              <Col span={14}>
                <Tag color="gold">DESTAQUES DO MÊS</Tag>
                <Title style={{ color: "#fff", marginTop: 16, fontSize: 42 }}>
                  Encontre o Som que Define Seu Evento
                </Title>
                <Text style={{ color: "#d1d5db", fontSize: 16 }}>
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
                Exibindo {processedArtists.length} de {artists.length} artistas
              </Text>
            </div>
            <div>
              <Text type="secondary" style={{ marginRight: 8 }}>
                Ordenar por:
              </Text>
              <Select
                variant="borderless"
                value={sortBy}
                onChange={(val) => setSortBy(val)}
                dropdownStyle={{ borderRadius: 10 }}
                options={[
                  {
                    value: "populares",
                    label: <Text strong>Mais Populares</Text>,
                  },
                  {
                    value: "preco_menor",
                    label: <Text strong>Menor Cachê</Text>,
                  },
                  {
                    value: "preco_maior",
                    label: <Text strong>Maior Cachê</Text>,
                  },
                ]}
              />
            </div>
          </div>

          <Row gutter={[24, 24]}>
            {processedArtists.map((artist, idx) => (
              <Col xs={24} sm={12} md={8} lg={6} key={idx}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={artist.name}
                      src={artist.photoUrl}
                      style={{ height: 240, objectFit: "cover" }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          DEFAULT_ARTIST_IMAGE;
                      }}
                    />
                  }
                  actions={[
                    <HeartOutlined key="heart" />,
                    <Button
                      type="primary"
                      onClick={() => handleOpenProfile(artist)}
                    >
                      Ver perfil
                    </Button>,
                  ]}
                  style={{ borderRadius: 18, overflow: "hidden" }}
                >
                  <Tag color="purple">{artist.genres || "Gênero Geral"}</Tag>
                  <Title level={4} style={{ marginTop: 8, marginBottom: 8 }}>
                    {artist.name}
                  </Title>
                  <Text type="secondary">Shows ao vivo para eventos.</Text>
                  <div style={{ marginTop: 16 }}>
                    <Text strong>
                      A partir de R$ {artist.startPrice || "0"}
                    </Text>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 40 }}
          >
            <Pagination
              defaultCurrent={1}
              total={processedArtists.length}
              pageSize={10}
            />
          </div>
        </Content>
      </Layout>

      <Footer style={{ background: "#dbe4ff", padding: "50px 40px" }}>
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
              style={{ background: "#f59e0b", border: "none" }}
            >
              Inscrever
            </Button>
          </Col>
        </Row>
      </Footer>

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
          destaques={artistasDestaquesMock.map((item) =>
            sanitizeArtistObject(item),
          )}
          onVerPerfil={handleOpenProfile}
        />
      </Modal>

      <Modal
        title={
          <Title level={4} style={{ margin: 0 }}>
            <RocketOutlined style={{ color: "#5b5ce2", marginRight: 8 }} />
            Cadastrar Novo Perfil de Artista
          </Title>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnClose
        width={600}
      >
        <CadastroArtistaForm onSuccess={handleCadastroSucesso} />
      </Modal>

      <ArtistProfileDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        artist={selectedArtist}
        onContratar={() => setIsPropostaOpen(true)}
      />
      <PropostaShowModal
        open={isPropostaOpen}
        onClose={() => setIsPropostaOpen(false)}
        artist={selectedArtist}
      />
      <SuporteModal
        open={isSuporteOpen}
        onClose={() => setIsSuporteOpen(false)}
      />
      <UserProfileDrawer
        open={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </Layout>
  );
}

export default ArtistsPage;
