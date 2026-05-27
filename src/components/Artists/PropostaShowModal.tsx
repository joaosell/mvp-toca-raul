import React from "react";
import {
  Modal,
  Form,
  Input,
  DatePicker,
  InputNumber,
  Button,
  Typography,
  message,
  Space,
} from "antd";
import {
  CalendarOutlined,
  DollarOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import type { Artist } from "../../interfaces/Artist";

const { Title, Text } = Typography;
const { TextArea } = Input;

interface PropostaShowModalProps {
  open: boolean;
  onClose: () => void;
  artist: Artist | null;
}

export const PropostaShowModal: React.FC<PropostaShowModalProps> = ({
  open,
  onClose,
  artist,
}) => {
  const [form] = Form.useForm();

  if (!artist) return null;

  const handleSubmit = async (values: any) => {
    try {
      const payload = {
        artistId: artist.id,
        eventDate: values.eventDate.format("YYYY-MM-DD HH:mm:ss"),
        local: values.local,
        city: values.city,
        offeredPrice: values.offeredPrice,
        description: values.description,
      };

      console.log("Enviando proposta para o Spring Boot:", payload);

      message.success(`Proposta enviada com sucesso para ${artist.name}!`);
      form.resetFields();
      onClose();
    } catch (error) {
      message.error("Erro ao processar o envio da proposta.");
    }
  };

  return (
    <Modal
      title={
        <Title level={4} style={{ margin: 0 }}>
          <CalendarOutlined style={{ color: "#5b5ce2", marginRight: 8 }} />
          Enviar Proposta de Show para {artist.name}
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
          Preencha os detalhes do seu evento abaixo. O artista receberá os dados
          e o valor proposto para análise.
        </Text>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          offeredPrice: Number(artist.startPrice) || 0,
        }}
      >
        <Form.Item
          label="Data e Hora do Evento"
          name="eventDate"
          rules={[
            { required: true, message: "Por favor, selecione a data do show!" },
          ]}
        >
          <DatePicker
            showTime
            format="DD/MM/YYYY HH:mm"
            style={{ width: "100%", borderRadius: 10 }}
            placeholder="Selecione o dia e horário"
          />
        </Form.Item>

        <Form.Item
          label="Nome do Local"
          name="local"
          rules={[
            {
              required: true,
              message: "Insira o nome do local (Ex: Rooftop, Salão, Teatro)!",
            },
          ]}
        >
          <Input
            prefix={<EnvironmentOutlined />}
            placeholder="Ex: Blue Note Lounge ou Evento Privado"
            style={{ borderRadius: 10 }}
          />
        </Form.Item>

        <Form.Item
          label="Cidade"
          name="city"
          rules={[
            {
              required: true,
              message: "Por favor, insira a cidade do evento!",
            },
          ]}
        >
          <Input placeholder="Ex: Joinville" style={{ borderRadius: 10 }} />
        </Form.Item>

        <Form.Item
          label="Valor Oferecido (R$)"
          name="offeredPrice"
          rules={[
            {
              required: true,
              message: "Por favor, defina um valor para a proposta!",
            },
          ]}
        >
          <InputNumber
            prefix={<DollarOutlined />}
            formatter={(value) =>
              `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value!.replace(/\R\$\s?|(,*)/g, "")}
            style={{ width: "100%", borderRadius: 10 }}
          />
        </Form.Item>

        <Form.Item
          label="Detalhes Adicionais (Briefing)"
          name="description"
          rules={[
            {
              required: true,
              message: "Conte um pouco sobre o formato do evento!",
            },
          ]}
        >
          <TextArea
            rows={4}
            placeholder="Conte detalhes do evento (Tempo de show estimado, tipo de público, estrutura de som disponível, etc.)"
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
              Enviar Proposta
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};
