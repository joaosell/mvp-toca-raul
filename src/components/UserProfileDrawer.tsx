import { useEffect, useState } from "react";
import {
  Drawer,
  Avatar,
  Typography,
  Divider,
  Tag,
  Button,
  List,
  Spin,
  message,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  SettingOutlined,
  LogoutOutlined,
  EditOutlined,
} from "@ant-design/icons";
import axiosClient from "../services/axiosClient";

const { Title, Text } = Typography;

interface UserProfileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function UserProfileDrawer({ open, onClose }: UserProfileDrawerProps) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setLoading(true);

      const userId = localStorage.getItem("userId") || "1";

      axiosClient
        .get(`/user/${userId}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Erro ao carregar dados do usuário:", error);
          message.error("Não foi possível carregar as informações do perfil.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [open]);

  return (
    <Drawer
      title="Meu Perfil"
      placement="right"
      onClose={onClose}
      open={open}
      width={400}
      extra={
        <Button type="text" icon={<EditOutlined />} disabled={loading}>
          Editar
        </Button>
      }
    >
      {/* COMPONENTE DE CARREGAMENTO DO ANT DESIGN */}
      <Spin spinning={loading}>
        {user ? (
          <>
            {/* CABEÇALHO DO PERFIL DINÂMICO */}
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <Avatar
                src={`https://i.pravatar.cc/150?img=${user.id + 10}`}
                size={100}
                icon={<UserOutlined />}
                style={{ border: "3px solid #5b5ce2", marginBottom: 12 }}
              />
              <Title level={4} style={{ margin: 0 }}>
                {user.firstName} {user.lastName}
              </Title>
              <Text type="secondary">
                <MailOutlined style={{ marginRight: 6 }} />
                {user.email}
              </Text>
              <div style={{ marginTop: 12 }}>
                <Tag color={user.type === "ADMIN" ? "red" : "gold"}>
                  {user.type}
                </Tag>
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
                  12
                </Title>
                <Text type="secondary">Eventos</Text>
              </div>
              <Divider type="vertical" style={{ height: "auto" }} />
              <div>
                <Title level={3} style={{ margin: 0, color: "#5b5ce2" }}>
                  45
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
          </>
        ) : (
          !loading && (
            <div style={{ textAlign: "center", marginTop: 20 }}>
              <Text type="secondary">Nenhum dado de perfil disponível.</Text>
            </div>
          )
        )}
      </Spin>
    </Drawer>
  );
}
