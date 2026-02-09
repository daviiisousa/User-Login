# 🔐 User Login - Sistema de Gerenciamento de Usuários

> Um projeto Full Stack focado em **boas práticas de desenvolvimento**, **arquitetura limpa** e **experiência do usuário**, construído com React, TypeScript e validação robusta de dados.

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias e Ferramentas](#-tecnologias-e-ferramentas)
- [Arquitetura e Padrões](#-arquitetura-e-padrões)
- [Destaques Técnicos](#-destaques-técnicos)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Como Executar](#-como-executar)
- [Aprendizados](#-aprendizados)

---

## 🎯 Sobre o Projeto

Sistema completo de autenticação e gerenciamento de usuários que demonstra **competências avançadas em desenvolvimento frontend**, focando em:

- ✅ **Arquitetura escalável** e manutenível
- ✅ **Validação de dados** em múltiplas camadas
- ✅ **Experiência do usuário** com feedback claro
- ✅ **Type-safety** end-to-end com TypeScript
- ✅ **Separação de responsabilidades** (SOLID principles)
- ✅ **Reutilização de código** com Custom Hooks

---

## 🚀 Funcionalidades

### Autenticação
- 🔐 **Login seguro** com validação de credenciais
- 📝 **Cadastro de novos usuários** com validação em tempo real
- 🔑 **Gerenciamento de tokens JWT** via localStorage
- 🚪 **Proteção de rotas** autenticadas

### Gerenciamento de Usuários
- 📊 **Listagem completa** de usuários cadastrados
- 🔍 **Busca em tempo real** por nome (Custom Hook)
- ✏️ **Edição de dados** do usuário via modal
- 🗑️ **Exclusão de usuários** com confirmação
- ⚡ **Atualização dinâmica** da lista sem reload

### UX/UI
- 🎨 **Interface moderna** com Tailwind CSS
- 📱 **Design responsivo** (mobile-first)
- ⏳ **Loading states** durante requisições
- 💬 **Feedback imediato** com toast notifications
- ✨ **Animações suaves** com Framer Motion
- 🎭 **Skeleton loading** para melhor percepção de performance

---

## 🛠 Tecnologias e Ferramentas

### Core
- **React 18** - Biblioteca UI com hooks modernos
- **TypeScript** - Type-safety e melhor DX
- **Vite** - Build tool ultrarrápido

### Validação e Formulários
- **React Hook Form** - Gerenciamento de formulários performático
- **Zod** - Schema validation com inferência de tipos
- **@hookform/resolvers** - Integração RHF + Zod

### Requisições HTTP
- **Axios** - Cliente HTTP com interceptors
- **Axios Interceptors** - Tratamento centralizado de erros

### Estilização
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animações declarativas

### UI/UX
- **React Toastify** - Notificações elegantes
- **Lucide React** - Ícones modernos e otimizados

### Roteamento
- **React Router DOM** - Navegação SPA

---

## 🏗 Arquitetura e Padrões

### Princípios SOLID Aplicados

#### 1. **Single Responsibility Principle (SRP)**
Cada módulo tem uma única responsabilidade:

```typescript
// ✅ Service - Apenas comunicação com API
export const userService = {
  getAll: () => instance.get("/users"),
  create: (data) => instance.post("/user", data),
  // ...
};

// ✅ Context - Apenas gerenciamento de estado
export const UserContext = createContext<UserContextInterface>();

// ✅ Components - Apenas UI
export const InputForm = forwardRef<HTMLInputElement>(...);
```

#### 2. **Open/Closed Principle (OCP)**
Componentes abertos para extensão, fechados para modificação:

```typescript
// Generic hook reutilizável para qualquer tipo de busca
export function useSearch<T>(items: T[], searchKey: keyof T) {
  // Funciona com Usuario, Produto, etc.
}
```

#### 3. **Dependency Inversion Principle (DIP)**
Dependência de abstrações, não de implementações:

```typescript
// ✅ Helpers retornam booleanos (abstrações)
export function verifyPasswordLength(password: string): boolean;

// ❌ Não: funções acopladas diretamente ao toast
```

### Separação de Camadas

```
┌─────────────────────────────────────────────┐
│           PRESENTATION LAYER                │
│  (Components, Pages, UI)                    │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│           BUSINESS LOGIC LAYER              │
│  (Context, Custom Hooks, Helpers)           │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│           DATA ACCESS LAYER                 │
│  (Services, API, Axios Interceptors)        │
└─────────────────────────────────────────────┘
```

---

## 💎 Destaques Técnicos

### 1. **React Hook Form + Zod Integration**

Validação type-safe e performática:

```typescript
// Schema centralizado com inferência de tipos
export const loginSchema = z.object({
  email: z.string().min(1, "Email obrigatório").email({ message: "Email inválido" }),
  senha: z.string().min(6, "Mínimo 6 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Uso no componente
const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
  resolver: zodResolver(loginSchema)
});
```

**Benefícios:**
- ✅ Validação automática antes do submit
- ✅ Type-safety completo (schema → types)
- ✅ Mensagens de erro customizadas
- ✅ Performance (validação otimizada)

### 2. **Custom Hook para Busca Genérica**

Hook reutilizável com TypeScript Generics:

```typescript
export function useSearch<T>(items: T[], searchKey: keyof T) {
  const [searchText, setSearchText] = useState("");
  const [filteredItems, setFilteredItems] = useState<T[]>([]);

  const handleSearch = useCallback((value: string) => {
    const filtered = items.filter((item) => {
      const itemValue = String(item[searchKey]);
      return itemValue.toLowerCase().includes(value.toLowerCase());
    });
    setFilteredItems(filtered);
  }, [items, searchKey]);

  return { searchText, filteredItems, handleSearch };
}
```

**Benefícios:**
- ✅ Reutilizável para qualquer tipo de dado
- ✅ Type-safe (TypeScript valida as chaves)
- ✅ Performance otimizada com `useCallback`
- ✅ Autocompletar no IDE

**Uso:**
```typescript
const { filteredItems, handleSearch } = useSearch<Usuario>(usuarios, "nome");
```

### 3. **Axios Interceptors para Tratamento de Erros**

Centralização do tratamento de erros e autenticação:

```typescript
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirecionar para login
    }
    toast.error(error.response?.data?.message || "Erro na requisição");
    return Promise.reject(error);
  }
);
```

**Benefícios:**
- ✅ Token JWT automático em todas requisições
- ✅ Tratamento global de erros
- ✅ Feedback automático ao usuário
- ✅ Código limpo nos components

### 4. **Service Layer Pattern**

Abstração da camada de dados:

```typescript
// userService.ts
export const userService = {
  async getAll() {
    const response = await instance.get<Usuario[]>("/users");
    return response.data;
  },

  async create(payload: CreateUserPayload) {
    const response = await instance.post<Usuario>("/user", payload);
    return response.data;
  },
  // ... outros métodos
};
```

**Benefícios:**
- ✅ API calls centralizadas
- ✅ Fácil de testar (mock)
- ✅ Tipagem completa
- ✅ Reutilização em diferentes contextos

### 5. **ForwardRef Pattern para Componentes Controlados**

Componentes compatíveis com React Hook Form:

```typescript
export const InputForm = forwardRef<HTMLInputElement, InputFormInterface>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`...`}
        {...props}
      />
    );
  }
);

InputForm.displayName = "InputForm";
```

**Benefícios:**
- ✅ Compatível com `react-hook-form`
- ✅ Acesso direto ao DOM quando necessário
- ✅ Melhor debug no React DevTools

### 6. **Helper Functions para Validações**

Funções utilitárias reutilizáveis:

```typescript
export function verifyToken(token: string | null): boolean {
  if (!token) {
    toast.error("Permissão negada");
    return false;
  }
  return true;
}

export function verifyPasswordLength(password: string): boolean {
  if (password.length < 6) {
    toast.error("A senha deve ter pelo menos 6 caracteres");
    return false;
  }
  return true;
}
```

**Benefícios:**
- ✅ DRY (Don't Repeat Yourself)
- ✅ Mensagens consistentes
- ✅ Fácil manutenção
- ✅ Testável isoladamente

---

## 📁 Estrutura do Projeto

```
src/
├── api/
│   └── api.ts                  # Configuração do Axios + Interceptors
├── components/
│   ├── butoes/
│   │   └── button.tsx          # Botão reutilizável
│   ├── forms/
│   │   ├── input.tsx           # Input com forwardRef
│   │   └── label.tsx           # Label estilizado
│   ├── layout/
│   │   ├── container.tsx       # Layout wrapper
│   │   ├── footer.tsx
│   │   └── header.tsx
│   ├── modals/
│   │   ├── modal/              # Modal genérico
│   │   ├── modalDelete/        # Modal de confirmação
│   │   └── modalEdit/          # Modal de edição
│   ├── skeletons/
│   │   └── tableSkeletons/     # Loading skeleton
│   └── tableUsuarios/
│       └── index.tsx           # Tabela de usuários
├── context/
│   └── userContext.tsx         # Estado global + lógica
├── helpers/
│   └── verifications.ts        # Funções de validação
├── hooks/
│   └── useSearch.tsx           # Custom hook de busca
├── pages/
│   ├── Home.tsx                # Página de cadastro
│   ├── Login.tsx               # Página de login
│   ├── PostUser.tsx            # Criar usuário (autenticado)
│   └── Users.tsx               # Lista de usuários
├── schema/
│   ├── login.schema.ts         # Schema Zod para login
│   ├── register.schema.ts      # Schema Zod para registro
│   └── user.schema.ts          # Schema Zod para usuário
├── service/
│   └── userService.ts          # Service layer (API calls)
├── types/
│   └── types.ts                # Tipos TypeScript
├── App.tsx
└── main.tsx
```

### Organização por Responsabilidade

| Pasta | Responsabilidade |
|-------|------------------|
| `api/` | Configuração HTTP e interceptors |
| `components/` | Componentes reutilizáveis de UI |
| `context/` | Estado global e lógica de negócio |
| `helpers/` | Funções utilitárias puras |
| `hooks/` | Custom hooks reutilizáveis |
| `pages/` | Páginas da aplicação |
| `schema/` | Schemas de validação Zod |
| `service/` | Camada de acesso a dados |
| `types/` | Definições de tipos TypeScript |

---

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/davisousadev/User-Login.git

# Entre na pasta
cd User-Login

# Instale as dependências
npm install

# Execute o projeto
npm run dev
```

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz:

```env
VITE_API_URL=http://localhost:3000
```

---

## 📚 Aprendizados

### Boas Práticas Implementadas

1. **Validação em Camadas**
   - Frontend: React Hook Form + Zod
   - Backend: Validação adicional na API
   - Feedback claro ao usuário em cada etapa

2. **Type-Safety End-to-End**
   - TypeScript em 100% do código
   - Inferência de tipos do Zod
   - Generics em custom hooks

3. **Separação de Responsabilidades**
   - Components: Apenas UI
   - Context: Gerenciamento de estado
   - Services: Comunicação com API
   - Helpers: Lógica reutilizável

4. **Performance**
   - `useCallback` para otimizar re-renders
   - React.memo em componentes pesados
   - Lazy loading de componentes
   - Skeleton loading para melhor UX

5. **Developer Experience**
   - ESLint + Prettier configurados
   - Tipos inferidos automaticamente
   - Autocompletar em todo código
   - Mensagens de erro descritivas

### Conceitos Avançados Aplicados

- ✅ **TypeScript Generics** - Custom hooks tipados
- ✅ **React Context API** - Estado global
- ✅ **Custom Hooks** - Lógica reutilizável
- ✅ **Schema Validation** - Zod + RHF
- ✅ **Service Layer** - Abstração de API
- ✅ **Axios Interceptors** - Middleware HTTP
- ✅ **forwardRef** - Componentes controlados
- ✅ **SOLID Principles** - Arquitetura limpa

---

## 👨‍💻 Autor

**Davi Sousa**

- GitHub: [@davisousadev](https://github.com/davisousadev)
- LinkedIn: [davi sousa alves](https://linkedin.com/in/davi-sousa-alves)

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

<div align="center">

**Desenvolvido com ❤️ focando em boas práticas e arquitetura limpa**

</div>
