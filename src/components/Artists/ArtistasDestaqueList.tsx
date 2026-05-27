import { List, Avatar, Typography, Space, Tag, Button, Row, Col } from "antd";

const { Text } = Typography;

interface ArtistasDestaqueListProps {
  destaques: any[];
  onVerPerfil: (artist: any) => void;
}

const DEFAULT_ARTIST_IMAGE =
  "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=600&auto=format&fit=crop";

export function ArtistasDestaqueList({
  destaques,
  onVerPerfil,
}: ArtistasDestaqueListProps) {
  return (
    <div style={{ marginTop: 20 }}>
      <List
        itemLayout="horizontal"
        dataSource={destaques}
        renderItem={(artist) => (
          <List.Item
            actions={[
              <Button
                type="link"
                style={{ color: "#5b5ce2", fontWeight: "bold" }}
                onClick={() => onVerPerfil(artist)}
              >
                Ver Perfil
              </Button>,
            ]}
          >
            <Row align="middle" gutter={16} style={{ width: "100%" }}>
              <Col>
                <Avatar
                  src={artist?.photoUrl || DEFAULT_ARTIST_IMAGE}
                  size={64}
                  style={{ border: "2px solid #f59e0b" }}
                  onError={() => {
                    return true;
                  }}
                />
              </Col>

              <Col flex="1">
                <Space
                  direction="vertical"
                  size={2}
                  style={{ display: "flex" }}
                >
                  <Text strong style={{ fontSize: 16, display: "block" }}>
                    {artist?.name || "Artista sem nome"}
                  </Text>
                  <Space size={8}>
                    <Tag color="gold">{artist?.genres || "Gênero Geral"}</Tag>
                    <Text type="secondary">
                      Cachê inicial: R$ {artist?.startPrice || "0"}
                    </Text>
                  </Space>
                </Space>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </div>
  );
}
