import React from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  Typography,
  Space,
  message,
} from "antd";
import { CustomerServiceOutlined, MailOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { TextArea } = Input;

interface SuporteModalProps {
  open: boolean;
  onClose: () => void;
}

export const SuporteModal: React.FC<SuporteModalProps> = ({
  open,
  onClose,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    try {
      const payload = {
        subject: values.subject,
        message: values.message,
        emailContato: values.emailContato,
      };

      console.log("Enviando solicitação de suporte para a equipe:", payload);

      message.success(
        "Mensagem enviada com sucesso! Nossa equipe entrará em contato em breve.",
      );
      form.resetFields();
      onClose();
    } catch (error) {
      message.error("Erro ao enviar a mensagem. Tente novamente mais tarde.");
    }
  };

  return (
    <Modal
      title={
        <Title level={4} style={{ margin: 0 }}>
          <CustomerServiceOutlined
            style={{ color: "#5b5ce2", marginRight: 8 }}
          />
          Central de Ajuda - TocaRaul
        </Title>
      }
      open={open}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      footer={null}
      destroyOnClose
      width={500}
    >
      <div style={{ marginBottom: 20, marginTop: 10 }}>
        <Text type="secondary">
          Teve algum problema ou ficou com dúvidas sobre o funcionamento dos
          contratos, cachês ou painel? Mande sua mensagem abaixo.
        </Text>
      </div>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="E-mail para retorno"
          name="emailContato"
          rules={[
            {
              required: true,
              message: "Por favor, insira seu e-mail de contato!",
            },
            { type: "email", message: "Insira um e-mail válido!" },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="Ex: seuemail@dominio.com"
            style={{ borderRadius: 10 }}
          />
        </Form.Item>

        <Form.Item
          label="Qual o assunto da sua dúvida?"
          name="subject"
          rules={[
            { required: true, message: "Selecione o assunto do seu chamado!" },
          ]}
        >
          <Select
            placeholder="Selecione uma categoria"
            style={{ borderRadius: 10 }}
          >
            <Select.Option value="contratacao">
              Dúvidas sobre Contratação
            </Select.Option>
            <Select.Option value="perfil">
              Problemas com o Meu Perfil
            </Select.Option>
            <Select.Option value="financeiro">
              Pagamentos e Cachês
            </Select.Option>
            <Select.Option value="outros">Outros Assuntos</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Descreva o que aconteceu ou sua dúvida"
          name="message"
          rules={[
            { required: true, message: "Por favor, detalhe sua mensagem!" },
          ]}
        >
          <TextArea
            rows={5}
            placeholder="Escreva aqui detalhadamente como nossa equipe de Joinville pode te ajudar..."
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
              Enviar Chamado
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};
