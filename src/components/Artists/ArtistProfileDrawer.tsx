import { Drawer, Typography, Tag, Divider, Button, Space } from "antd";
import {
  PlayCircleOutlined,
  DollarOutlined,
  ThunderboltOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import type { Artist } from "../../interfaces/Artist";

const { Title, Text, Paragraph } = Typography;

interface ArtistProfileDrawerProps {
  open: boolean;
  onClose: () => void;
  artist: Artist | null;
  onContratar?: () => void;
}

const DEFAULT_ARTIST_IMAGE =
  "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=600&auto=format&fit=crop";

export function ArtistProfileDrawer({
  open,
  onClose,
  artist,
  onContratar,
}: ArtistProfileDrawerProps) {
  const handleAcaoContratar = () => {
    onClose();
    if (onContratar) onContratar();
  };

  return (
    <Drawer
      title="Perfil do Artista"
      placement="right"
      onClose={onClose}
      open={open}
      width={450}
    >
      {/* FOTO DE CAPA */}
      <div style={{ margin: "-24px -24px 20px -24px", overflow: "hidden" }}>
        <img
          src={artist?.photoUrl || DEFAULT_ARTIST_IMAGE}
          alt={artist?.name || "Foto do Artista"}
          style={{ width: "100%", height: "250px", objectFit: "cover" }}
        />
      </div>

      {/* INFO BÁSICA */}
      <Title level={3} style={{ marginBottom: 4 }}>
        {artist?.name || "Carregando..."}
      </Title>

      {artist?.genres && (
        <Tag color="purple" style={{ marginBottom: 16 }}>
          {artist.genres}
        </Tag>
      )}

      <Space direction="vertical" style={{ width: "100%", marginTop: 10 }}>
        <Text type="secondary">
          <DollarOutlined /> Cachê estimado:
          <Text strong style={{ color: "#000", marginLeft: 8 }}>
            A partir de R$ {artist?.startPrice || "0"}
          </Text>
        </Text>
      </Space>

      <Divider />

      {/* RELEASE / SOBRE */}
      <Title level={5}>
        <InfoCircleOutlined /> Release
      </Title>
      <Paragraph style={{ textAlign: "justify", lineHeight: "1.6" }}>
        {artist?.about || "O artista ainda não adicionou um release detalhado."}
      </Paragraph>

      <Divider />

      {/* LINKS E MÍDIA */}
      <Title level={5}>
        <PlayCircleOutlined /> Demonstração
      </Title>
      <div
        style={{
          background: "#f0f2f5",
          padding: "15px",
          borderRadius: "12px",
          textAlign: "center",
        }}
      >
        <Text style={{ display: "block", marginBottom: 10 }}>
          Assista à performance ao vivo no YouTube ou Spotify:
        </Text>
        <Button
          type="primary"
          danger
          icon={<PlayCircleOutlined />}
          href={artist?.samplesUrl || "#"}
          disabled={!artist?.samplesUrl}
          target="_blank"
          block
        >
          Abrir Link de Demonstração
        </Button>
      </div>

      <Button
        type="primary"
        size="large"
        block
        icon={<ThunderboltOutlined />}
        onClick={handleAcaoContratar}
        style={{
          marginTop: 40,
          height: "50px",
          borderRadius: "10px",
          background: "linear-gradient(135deg, #5b5ce2, #111827)",
          border: "none",
        }}
      >
        Enviar Proposta de Show
      </Button>
    </Drawer>
  );
}
