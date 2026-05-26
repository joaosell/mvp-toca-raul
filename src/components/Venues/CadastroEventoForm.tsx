import { useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Divider,
  message,
  Row,
  Col,
} from "antd";

const { TextArea } = Input;

interface CadastroEventoFormProps {
  onSuccess: () => void;
}

export function CadastroEventoForm({ onSuccess }: CadastroEventoFormProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleCadastrar = async (valores: any) => {
    setLoading(true);
    try {
      // TODO: Substituir pelo seu serviço real quando o backend estiver pronto
      // Exemplo: await createVenue(valores);
      
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      console.log("Dados do Evento/Espaço prontos para a API:", valores);
      message.success("Espaço/Evento cadastrado com sucesso! 🏢");
      form.resetFields();
      onSuccess();
    } catch (error) {
      console.error(error);
      message.error("Erro ao salvar o evento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleCadastrar}
      requiredMark="optional"
      style={{ padding: "10px 0" }}
    >
      {/* SEÇÃO 1: INFORMAÇÕES BÁSICAS */}
      <Divider style={{ color: "#5b5ce2", fontSize: "14px", textAlign: "left", marginTop: 0 }}>
        1. Informações do Local
      </Divider>

      <Form.Item
        label="Nome do Espaço / Evento"
        name="name"
        rules={[{ required: true, message: "O nome é obrigatório!" }]}
      >
        <Input placeholder="Ex: The Blue Note Lounge" size="large" />
      </Form.Item>

      <Row gutter={16}>
        <Col span={16}>
          <Form.Item
            label="Localização / Endereço"
            name="location"
            rules={[{ required: true, message: "Informe a localização!" }]}
          >
            <Input placeholder="Ex: Centro • Joinville" size="large" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Capacidade"
            name="capacity"
            rules={[{ required: true, message: "Informe a capacidade!" }]}
          >
            <Input placeholder="Ex: 120" size="large" suffix="pessoas" />
          </Form.Item>
        </Col>
      </Row>

      {/* SEÇÃO 2: DETALHES MUSICAIS E CACHÊ */}
      <Divider style={{ color: "#5b5ce2", fontSize: "14px", textAlign: "left" }}>
        2. Detalhes da Proposta
      </Divider>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Estilo Musical Buscado"
            name="genre"
            rules={[{ required: true, message: "Selecione o gênero!" }]}
          >
            <Select placeholder="Selecione..." size="large">
              <Select.Option value="Jazz & Blues">Jazz & Blues</Select.Option>
              <Select.Option value="Eletrônico">Eletrônico</Select.Option>
              <Select.Option value="Acústico">Acústico</Select.Option>
              <Select.Option value="Indie / Pop">Indie / Pop</Select.Option>
              <Select.Option value="Rock">Rock</Select.Option>
              <Select.Option value="Qualquer Estilo">Qualquer Estilo</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Faixa de Cachê Oferecida"
            name="price"
            rules={[{ required: true, message: "Informe o valor!" }]}
          >
            <Input placeholder="Ex: R$ 450 - R$ 900" size="large" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Data e Horário do Evento"
        name="date"
        rules={[{ required: true, message: "Informe a data!" }]}
      >
        {/* Usando Input simples para manter o padrão mock, mas futuramente pode ser um <DatePicker showTime /> */}
        <Input placeholder="Ex: 24 Nov • 20:00" size="large" />
      </Form.Item>

      {/* SEÇÃO 3: MÍDIA */}
      <Divider style={{ color: "#5b5ce2", fontSize: "14px", textAlign: "left" }}>
        3. Mídia e Descrição
      </Divider>

      <Form.Item
        label="URL da Imagem do Local"
        name="image"
        rules={[{ required: true, message: "Insira uma URL de imagem!" }]}
      >
        <Input placeholder="https://exemplo.com/fotodobar.jpg" size="large" />
      </Form.Item>

      <Form.Item
        label="Descrição do Evento/Espaço"
        name="description"
      >
        <TextArea
          rows={3}
          placeholder="Descreva a estrutura, equipamentos disponíveis, se tem palco, etc..."
        />
      </Form.Item>

      {/* BOTÃO FINAL */}
      <Form.Item style={{ marginTop: 30, marginBottom: 0 }}>
        <Button
          type="primary"
          htmlType="submit"
          block
          size="large"
          loading={loading}
          style={{ background: "#5b5ce2", borderRadius: 8, height: "45px" }}
        >
          Publicar Oportunidade
        </Button>
      </Form.Item>
    </Form>
  );
}