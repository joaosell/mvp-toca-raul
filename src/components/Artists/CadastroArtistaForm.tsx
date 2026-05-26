import { useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Divider,
  message,
} from "antd";
import { createArtist } from "../../services/artistService";

const { TextArea } = Input;

interface CadastroArtistaFormProps {
  onSuccess: () => void;
}

export function CadastroArtistaForm({ onSuccess }: CadastroArtistaFormProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false); 

  const handleCadastrar = async (valores: any) => {
    setLoading(true);
    try {
      await createArtist(valores);
      
      message.success("Artista publicado com sucesso! 🎸");
      form.resetFields();
      onSuccess();       
    } catch (error) {
      console.error(error);
      message.error("Erro ao salvar o perfil. Verifique se o backend está ligado.");
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
      {/* SEÇÃO 1 */}
      <Divider style={{ color: "#5b5ce2", fontSize: "14px", textAlign: "left" }}>
        1. Identificação
      </Divider>

      <Form.Item
        label="Nome Artístico / Banda"
        name="name"
        rules={[
          { required: true, message: "O nome artístico é obrigatório!" },
        ]}
      >
        <Input placeholder="Ex: Raul Seixas Cover" size="large" />
      </Form.Item>

      <Form.Item
        label="Gênero Musical Principal"
        name="genres"
        rules={[
          { required: true, message: "Selecione pelo menos um gênero!" },
        ]}
      >
        <Select placeholder="Selecione o estilo musical" size="large">
          <Select.Option value="Rock & Indie">Rock & Indie</Select.Option>
          <Select.Option value="Eletrônico / DJ">Eletrônico / DJ</Select.Option>
          <Select.Option value="Jazz & Blues">Jazz & Blues</Select.Option>
          <Select.Option value="Acústico Solo">Acústico Solo</Select.Option>
        </Select>
      </Form.Item>

      {/* SEÇÃO 2 */}
      <Divider style={{ color: "#5b5ce2", fontSize: "14px", textAlign: "left" }}>
        2. Proposta Comercial
      </Divider>

      <Form.Item
        label="Preço Inicial do Show (Cachê)"
        name="start_price"
        rules={[
          { required: true, message: "Insira o valor inicial do cachê!" },
        ]}
      >
        <Input placeholder="Ex: R$ 1.500" size="large" />
      </Form.Item>

      <Form.Item
        label="Sobre o Artista / Release"
        name="about"
        rules={[
          { required: true, message: "Conte um pouco sobre o seu trabalho!" },
        ]}
      >
        <TextArea
          rows={4}
          placeholder="Conte sobre sua experiência, estrutura de show e repertório..."
        />
      </Form.Item>

      {/* SEÇÃO 3 */}
      <Divider style={{ color: "#5b5ce2", fontSize: "14px", textAlign: "left" }}>
        3. Mídia e Links
      </Divider>

      <Form.Item
        label="URL da Foto de Perfil"
        name="photo_url"
        rules={[
          { required: true, message: "Insira a URL de uma foto de boa qualidade!" },
        ]}
      >
        <Input placeholder="https://exemplo.com/suafoto.jpg" size="large" />
      </Form.Item>

      <Form.Item
        label="Link de Demonstração (Vídeo ou Áudio)"
        name="samples_url"
        rules={[
          { required: true, message: "Insira um link do YouTube, Spotify ou Soundcloud!" },
        ]}
      >
        <Input
          placeholder="Ex: https://www.youtube.com/watch?v=..."
          size="large"
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
          Publicar Perfil da Banda
        </Button>
      </Form.Item>
    </Form>
  );
}