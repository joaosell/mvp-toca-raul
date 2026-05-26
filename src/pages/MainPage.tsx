import {
  Layout,
  Input,
  Button,
  Card,
  Row,
  Col,
  Typography,
  Space,
} from "antd";
import logo from "../assets/logotocaraul.png";
import { useNavigate } from "react-router-dom";
import React from "react";

const { Content, Footer } = Layout;
const { Title, Text } = Typography;

function MainPage() {
  const navigate = useNavigate();
  React.useEffect(() => {
    document.title = "TocaRaul - Página principal";
  }, []);
  return (
    <Layout style={{ height: "100vh", overflow: "hidden", background: "#f5f7fb", display: "flex", flexDirection: "column" }}>
      
      <div style={{ 
        width: "100%", 
        display: "flex", 
        justifyContent: "center", 
        paddingTop: 40, 
        paddingBottom: 16,
        flexShrink: 0 
      }}>
        <img 
          src={logo} 
          alt="TocaRaul Logo" 
          style={{ 
            height: 180, 
            objectFit: "contain",
            maxWidth: "90%", 
          }} 
        />
      </div>

      <Content
        style={{
          padding: "20px 0 40px 0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: "1 0 auto",
        }}
      >
        <Row
          gutter={[40, 24]}
          style={{ width: "100%", maxWidth: 900, justifyContent: "center", padding: "0 20px" }}
        >
          <Col xs={24} md={12}>
            <Card
              style={{
                borderRadius: 20,
                minHeight: 340,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
              }}
            >
              <div style={{ textAlign: "center", width: "100%", padding: "0 20px" }}>
                <Title level={2} style={{ color: "#4f46e5", marginBottom: 8 }}>
                  Buscar Artistas
                </Title>
                <Text style={{ display: "block", minHeight: 44 }}>
                  Encontre músicos e bandas para seu evento.
                </Text>
                <Button
                  type="primary"
                  size="large"
                  style={{
                    marginTop: 32,
                    borderRadius: 12,
                    background: "#5b5ce2",
                    width: "100%",
                    cursor: "pointer",
                    transition: "box-shadow 0.2s, transform 0.2s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(91,92,226,0.18)";
                    e.currentTarget.style.transform = "scale(1.04)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                  onClick={() => navigate("/artists")}
                >
                  Explorar Artistas
                </Button>
              </div>
            </Card>
          </Col>
          
          <Col xs={24} md={12}>
            <Card
              style={{
                borderRadius: 20,
                minHeight: 340,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
              }}
            >
              <div style={{ textAlign: "center", width: "100%", padding: "0 20px" }}>
                <Title level={2} style={{ color: "#4f46e5", marginBottom: 8 }}>
                  Buscar Eventos
                </Title>
                <Text style={{ display: "block", minHeight: 44 }}>
                  Procure espaços ou eventos para artistas se apresentarem.
                </Text>
                <Button
                  type="primary"
                  size="large"
                  style={{
                    marginTop: 32,
                    borderRadius: 12,
                    background: "#5b5ce2",
                    width: "100%",
                    cursor: "pointer",
                    transition: "box-shadow 0.2s, transform 0.2s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(91,92,226,0.18)";
                    e.currentTarget.style.transform = "scale(1.04)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                  onClick={() => navigate("/venues")}
                >
                  Explorar Eventos
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Content>

      <Footer
        style={{
          background: "#dbe4ff",
          padding: "50px 40px",
          flexShrink: 0,
        }}
      >
        <Row gutter={[40, 32]}>
          <Col xs={24} sm={12} md={8}>
            <Title level={3}>Toca Raul</Title>
            <Text>
              Conectando os melhores talentos com espaços incríveis para
              experiências inesquecíveis ao vivo.
            </Text>
          </Col>
          <Col xs={12} sm={6} md={5}>
            <Title level={5}>Marketplace</Title>
            <Space direction="vertical">
              <a href="#guide">Guia do Artista</a>
              <a href="#faq">Perguntas Frequentes</a>
              <a href="#pricing">Planos e Preços</a>
            </Space>
          </Col>
          <Col xs={12} sm={6} md={5}>
            <Title level={5}>Empresa</Title>
            <Space direction="vertical">
              <a href="#about">Sobre Nós</a>
              <a href="#careers">Carreiras</a>
              <a href="#privacy">Política de Privacidade</a>
            </Space>
          </Col>
          <Col xs={24} md={6}>
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

export default MainPage;