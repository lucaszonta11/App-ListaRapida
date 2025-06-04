# Lista Rápida 📱

Um aplicativo móvel moderno e eficiente para gerenciamento de tarefas, desenvolvido com React Native e Expo.

## 🚀 Funcionalidades

- ✨ Interface moderna e intuitiva
- 📱 Suporte a iOS e Android
- 🔄 Sincronização em tempo real com Firebase
- 🏷️ Categorização de tarefas
- 📊 Filtros por categoria
- ⚡ Animações suaves
- 🌙 Tema claro
- 🔍 Busca e filtros
- 📅 Timestamp em cada tarefa
- 🔐 Autenticação de usuários

## 🛠️ Tecnologias Utilizadas

- React Native
- Expo
- TypeScript
- Firebase (Firestore)
- Expo Router
- React Native Reanimated
- Expo Vector Icons

## 📋 Pré-requisitos

- Node.js 16+
- npm ou yarn
- Expo CLI
- Conta no Firebase
- Conta no Expo

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/your-username/lista-rapida.git
cd lista-rapida
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id
```

4. Inicie o projeto:
```bash
npx expo start
```

## 📱 Testes Manuais

### Cenário 1: Criação de Tarefa
1. Abra o aplicativo
2. Toque no botão "Nova Tarefa"
3. Preencha o título da tarefa
4. Selecione uma categoria
5. Toque em "Salvar"
6. Verifique se a tarefa aparece na lista principal

### Cenário 2: Conclusão de Tarefa
1. Na lista principal, localize uma tarefa pendente
2. Toque no círculo ao lado da tarefa
3. Verifique se o ícone muda para um checkmark
4. Verifique se o texto fica riscado
5. Toque novamente para desfazer a conclusão

### Cenário 3: Exclusão de Tarefa
1. Na lista principal, localize uma tarefa
2. Toque no ícone de lixeira
3. Confirme a exclusão no diálogo
4. Verifique se a tarefa é removida da lista

## 📦 Publicação

### Expo Go
1. Faça login na sua conta Expo:
```bash
npx expo login
```

2. Publique o projeto:
```bash
npx expo publish
```

### APK Android
1. Configure o EAS Build:
```bash
npx eas build:configure
```

2. Crie o build:
```bash
npx eas build -p android --profile preview
```

## 📝 Documentação Adicional

### Estrutura de Arquivos
```
lista-rapida/
├── app/                    # Diretório principal do app
│   ├── _layout.tsx        # Layout principal
│   ├── index.tsx          # Tela inicial
│   ├── nova-tarefa.tsx    # Tela de nova tarefa
│   └── theme.ts           # Configurações de tema
├── assets/                # Recursos estáticos
├── components/            # Componentes reutilizáveis
├── hooks/                 # Custom hooks
├── types/                 # Definições de tipos
└── utils/                 # Funções utilitárias
```

### Convenções de Código
- Usar TypeScript para tipagem estática
- Seguir o padrão de componentes funcionais
- Utilizar hooks personalizados para lógica de negócio
- Manter componentes pequenos e focados
- Documentar funções e componentes complexos

## 🤝 Contribuindo

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Faça o Commit das suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Faça o Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ✨ Agradecimentos

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [Firebase](https://firebase.google.com/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)

## 📞 Suporte

Para suporte, envie um email para seu-email@exemplo.com ou abra uma issue no GitHub. 