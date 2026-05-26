import { Drawer, Avatar, Typography, Divider, Tag, Button, List } from "antd";
import {
  UserOutlined,
  MailOutlined,
  SettingOutlined,
  LogoutOutlined,
  EditOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

interface UserProfileDrawerProps {
  open: boolean;
  onClose: () => void;
}
const currentUser = {
  name: "João Silva",
  email: "joao.silva@email.com",
  role: "Contratante Premium",
  avatarUrl: "https://i.pravatar.cc/150?img=11",
  memberSince: "Novembro de 2025",
  stats: {
    eventosCriados: 12,
    artistasSalvos: 45,
  },
};

export function UserProfileDrawer({ open, onClose }: UserProfileDrawerProps) {
  return (
    <Drawer
      title="Meu Perfil"
      placement="right"
      onClose={onClose}
      open={open}
      width={400}
      extra={
        <Button type="text" icon={<EditOutlined />}>
          Editar
        </Button>
      }
    >
      {/* CABEÇALHO DO PERFIL */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <Avatar
          src={currentUser.avatarUrl}
          size={100}
          icon={<UserOutlined />}
          style={{ border: "3px solid #5b5ce2", marginBottom: 12 }}
        />
        <Title level={4} style={{ margin: 0 }}>
          {currentUser.name}
        </Title>
        <Text type="secondary">
          <MailOutlined style={{ marginRight: 6 }} />
          {currentUser.email}
        </Text>
        <div style={{ marginTop: 12 }}>
          <Tag color="gold">{currentUser.role}</Tag>
        </div>
      </div>

      <Divider />

      {/* ESTATÍSTICAS / RESUMO */}
      <Title level={5} style={{ marginBottom: 16 }}>
        Resumo da Conta
      </Title>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          textAlign: "center",
          marginBottom: 24,
        }}
      >
        <div>
          <Title level={3} style={{ margin: 0, color: "#5b5ce2" }}>
            {currentUser.stats.eventosCriados}
          </Title>
          <Text type="secondary">Eventos</Text>
        </div>
        <Divider type="vertical" style={{ height: "auto" }} />
        <div>
          <Title level={3} style={{ margin: 0, color: "#5b5ce2" }}>
            {currentUser.stats.artistasSalvos}
          </Title>
          <Text type="secondary">Artistas Salvos</Text>
        </div>
      </div>

      <Divider />

      {/* MENU RÁPIDO DO USUÁRIO */}
      <List
        itemLayout="horizontal"
        dataSource={[
          { title: "Configurações da Conta", icon: <SettingOutlined /> },
          {
            title: "Sair / Logout",
            icon: <LogoutOutlined style={{ color: "#ff4d4f" }} />,
            isDanger: true,
          },
        ]}
        renderItem={(item) => (
          <List.Item style={{ cursor: "pointer", transition: "0.3s" }}>
            <List.Item.Meta
              avatar={item.icon}
              title={
                <Text type={item.isDanger ? "danger" : undefined}>
                  {item.title}
                </Text>
              }
            />
          </List.Item>
        )}
      />

      <div style={{ textAlign: "center", marginTop: 40 }}>
        <Text type="secondary" style={{ fontSize: 12 }}>
          Membro desde {currentUser.memberSince}
        </Text>
      </div>
    </Drawer>
  );
}
