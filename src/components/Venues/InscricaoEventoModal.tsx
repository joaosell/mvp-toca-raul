import React from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Button,
  Typography,
  Space,
  message,
} from "antd";
import { DollarOutlined, LinkOutlined, SoundOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { TextArea } = Input;

interface InscricaoEventoModalProps {
  open: boolean;
  onClose: () => void;
  venue: any;
}

export const InscricaoEventoModal: React.FC<InscricaoEventoModalProps> = ({
  open,
  onClose,
  venue,
}) => {
  const [form] = Form.useForm();

  if (!venue) return null;

  const handleSubmit = async (values: any) => {
    try {
      const payload = {
        venueName: venue.name,
        requestedPrice: values.requestedPrice,
        portfolioUrl: values.portfolioUrl,
        pitch: values.pitch,
      };

      console.log("Enviando inscrição de artista para o backend:", payload);

      message.success(
        `Inscrição enviada com sucesso para a vaga no ${venue.name}!`,
      );
      form.resetFields();
      onClose();
    } catch (error) {
      message.error("Erro ao enviar sua inscrição. Tente novamente.");
    }
  };

  return (
    <Modal
      title={
        <Title level={4} style={{ margin: 0 }}>
          <SoundOutlined style={{ color: "#5b5ce2", marginRight: 8 }} />
          Inscrever-se para tocar no {venue.name}
        </Title>
      }
      open={open}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      footer={null}
      destroyOnClose
      width={550}
    >
      <div style={{ marginBottom: 20, marginTop: 10 }}>
        <Text type="secondary">
          Vaga voltada para o gênero <Text strong>{venue.genre}</Text>. Preencha
          suas condições para que o contratante avalie o perfil da sua banda.
        </Text>
      </div>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Sua proposta de Cachê para este show (R$)"
          name="requestedPrice"
          rules={[
            {
              required: true,
              message: "Por favor, defina o valor do seu cachê!",
            },
          ]}
        >
          <InputNumber
            prefix={<DollarOutlined />}
            placeholder="Ex: 1500"
            formatter={(value) =>
              `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value!.replace(/\R\$\s?|(,*)/g, "")}
            style={{ width: "100%", borderRadius: 10 }}
          />
        </Form.Item>

        <Form.Item
          label="Link de um material recente (Vídeo/Áudio)"
          name="portfolioUrl"
          rules={[
            {
              required: true,
              message: "Insira um link para o contratante avaliar seu som!",
            },
            { type: "url", message: "Insira uma URL válida!" },
          ]}
        >
          <Input
            prefix={<LinkOutlined />}
            placeholder="Ex: https://youtube.com/watch?v=suabanda"
            style={{ borderRadius: 10 }}
          />
        </Form.Item>

        <Form.Item
          label="Por que sua banda é a escolha perfeita para essa noite?"
          name="pitch"
          rules={[
            {
              required: true,
              message: "Escreva uma breve mensagem de apresentação!",
            },
          ]}
        >
          <TextArea
            rows={4}
            placeholder="Conte um pouco sobre o repertório que pretende tocar, tempo de show e se precisa de alguma estrutura específica do local."
            style={{ borderRadius: 10 }}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
          <Space>
            <Button onClick={onClose} style={{ borderRadius: 10 }}>
              Cancelar
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                borderRadius: 10,
                background: "#5b5ce2",
                border: "none",
              }}
            >
              Confirmar Inscrição
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};
