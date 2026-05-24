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
} from "antd";

import { SearchOutlined, HeartOutlined } from "@ant-design/icons";

import logo from "../assets/logotocaraul.png";
import { useEffect, useState } from "react";
import { listArtists } from "../services/artistService";
import type { Artist } from "../interfaces/Artist";
const { Header, Content, Footer, Sider } = Layout;
const { Title, Text } = Typography;

function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    const fetchArtists = async () => {
      let artists = await listArtists();
      setArtists(artists);
    }
    fetchArtists();
  }, [])

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
        <img
          src={logo}
          alt="TocaRaul Logo"
          style={{ height: 60, margin: 0 }}
        />

        <Menu
          mode="horizontal"
          defaultSelectedKeys={["artistas"]}
          style={{ flex: 1, marginLeft: 40, border: "none" }}
          items={[
            { key: "artistas", label: "Artistas" },
            { key: "eventos", label: "Eventos" },
          ]}
        />

        <Space size="large">
          <Input
            placeholder="Buscar artistas..."
            prefix={<SearchOutlined />}
            style={{ width: 220, borderRadius: 10 }}
          />

          <Button
            type="primary"
            style={{
              borderRadius: 10,
              background: "#5b5ce2",
            }}
          >
            Cadastre seu Espaço
          </Button>
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

                <Space direction="vertical" style={{ marginTop: 10 }}>
                  <Checkbox>Jazz & Blues</Checkbox>
                  <Checkbox defaultChecked>Eletrônico / DJ</Checkbox>
                  <Checkbox>Acústico Solo</Checkbox>
                  <Checkbox>Rock & Indie</Checkbox>
                </Space>
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
                  Descubra mais de 1.200 artistas prontos para animar seu evento.
                </Text>

                <br />

                <Button
                  type="primary"
                  size="large"
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

              <Text type="secondary">Exibindo 24 de 1.248 artistas</Text>
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
                    <Button type="primary">View Profile</Button>,
                  ]}
                  style={{
                    borderRadius: 18,
                    overflow: "hidden",
                  }}
                >
                  <Tag>{artist.genres}</Tag>

                  <Title level={4}>{artist.name}</Title>

                  <Text type="secondary">
                    Shows ao vivo para eventos.
                  </Text>

                  <div style={{ marginTop: 16 }}>
                    <Text strong>A partir de {artist.startPrice}</Text>
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
              Conectando os melhores talentos com espaços incríveis para experiências inesquecíveis ao vivo.
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

            <Input placeholder="Seu e-mail" />

            <Button
              type="primary"
              block
              style={{
                marginTop: 10,
                background: "#f59e0b",
                border: "none",
              }}
            >
              Inscrever
            </Button>
          </Col>
        </Row>
      </Footer>
    </Layout>
  );
}

export default ArtistsPage;
