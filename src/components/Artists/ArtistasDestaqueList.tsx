import { List, Avatar, Typography, Space, Tag, Button } from "antd";

const { Text } = Typography;

interface ArtistasDestaqueListProps {
  destaques: any[];
  onVerPerfil: (artist: any) => void;
}

export function ArtistasDestaqueList({ destaques, onVerPerfil }: ArtistasDestaqueListProps) {
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
                style={{ color: "#5b5ce2" }}
                onClick={() => onVerPerfil(artist)}
              >
                Ver Perfil
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  src={artist.photoUrl}
                  size={64}
                  style={{ border: "2px solid #f59e0b" }}
                />
              }
              title={
                <Text strong style={{ fontSize: 16 }}>
                  {artist.name}
                </Text>
              }
              description={
                <Space direction="vertical" size={2}>
                  <Tag color="gold">{artist.genres}</Tag>
                  <Text type="secondary">Cachê inicial: R$ {artist.startPrice}</Text>
                </Space>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
}