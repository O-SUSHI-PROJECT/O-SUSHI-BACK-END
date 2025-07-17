# Documentação da Arquitetura – NestJS Modular (MVC)

## Visão Geral da Arquitetura

Nossa aplicação é organizada em módulos, onde cada módulo representa um domínio funcional específico do sistema. Essa abordagem modular promove a separação de responsabilidades, facilitando o desenvolvimento, a manutenção e a escalabilidade.

Cada módulo encapsula os seguintes componentes principais:

- **Controller:** Lida com as requisições HTTP, roteia chamadas e formata respostas. Atua como interface entre cliente e lógica de negócio.
- **Service:** Contém a lógica de negócio principal do domínio, incluindo validações e interações com banco de dados.
- **Entity/Model:** Representa a estrutura dos dados, mapeando para tabelas ou coleções no banco.
- **(Opcional) DTOs (Data Transfer Objects):** Objetos usados para transferência de dados entre camadas, essenciais para validação e formatação.
- **(Opcional) Validadores:** Implementam regras de validação para os DTOs.
- **(Opcional) Guards:** Lógica de autorização para controle de acesso às rotas.
- **(Opcional) Pipes:** Transformam ou validam dados antes de chegarem ao Controller.

---

## Estrutura de Pastas

```plaintext
src/
├── app.module.ts           # Módulo raiz da aplicação
├── <domínio>/              # Pasta para cada domínio funcional (ex: user, payment)
│   ├── <domínio>.controller.ts
│   ├── <domínio>.service.ts
│   ├── <domínio>.module.ts
│   ├── dto/                # DTOs
│   │   └── create-<domínio>.dto.ts
│   ├── entities/           # Entidades / Modelos
│   │   └── <domínio>.entity.ts
│   ├── interfaces/         # Interfaces (tipagem)
│   └── ...                 # Outros arquivos opcionais (guards, pipes, etc.)
Exemplo:

plaintext
Copiar
Editar
src/
├── user/
│   ├── user.controller.ts
│   ├── user.service.ts
│   ├── user.module.ts
│   ├── dto/
│   │   ├── create-user.dto.ts
│   │   └── update-user.dto.ts
│   └── entities/
│       └── user.entity.ts
├── payment/
│   ├── payment.controller.ts
│   ├── payment.service.ts
│   ├── payment.module.ts
│   └── ...
Como Criar uma Nova Funcionalidade?
1. Funcionalidade em domínio existente
Adicione ou atualize métodos no Controller e Service do módulo correspondente.

Exemplo: criar rota GET /users/:id/details

Método no UserController para a rota

Lógica no UserService

2. Funcionalidade em novo domínio
Crie novo módulo com CLI do NestJS:

bash
Copiar
Editar
nest g module <nome-do-modulo>
nest g controller <nome-do-modulo>
nest g service <nome-do-modulo>
Organize DTOs, entidades e demais arquivos dentro da pasta do módulo.

Quando Criar um Novo Módulo?
Situação	Criar novo módulo?	Racional
Domínio funcional novo (ex: notificações, pagamentos)	✅ Sim	Conceito independente e autônomo
Funcionalidade depende de vários serviços e cresce	✅ Sim	Alta complexidade e responsabilidade própria
Pequeno endpoint novo dentro de domínio existente	❌ Não	Pertence às responsabilidades do módulo atual

Comunicação entre Módulos
Passo 1: Exportar Service no módulo de origem
ts
Copiar
Editar
// src/user/user.module.ts
@Module({
  providers: [UserService],
  exports: [UserService],  // Torna disponível para outros módulos
  controllers: [UserController],
})
export class UserModule {}
Passo 2: Importar módulo no módulo destino
ts
Copiar
Editar
// src/payment/payment.module.ts
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
Passo 3: Injetar Service no módulo destino
ts
Copiar
Editar
// src/payment/payment.service.ts
@Injectable()
export class PaymentService {
  constructor(private readonly userService: UserService) {}

  async processPayment(userId: string, amount: number) {
    const user = await this.userService.getUserById(userId);
    // lógica de pagamento
  }
}
Boas Práticas para Desenvolvimento
Use DTOs para entrada/saída de dados e validação com class-validator.

Mantenha a lógica de negócio nos Services, deixando Controllers magros.

Nomeie métodos de forma descritiva para clareza.

Use interfaces/types para contratos internos e tipagem.

Valide dados com ValidationPipe no Controller:

ts
Copiar
Editar
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
Isolar lógica reutilizável em src/utils ou src/core.

Testes
Testes unitários para Controllers e Services com Jest.

Estrutura típica de testes:

plaintext
Copiar
Editar
user/
├── user.service.ts
├── user.controller.ts
├── user.service.spec.ts
└── user.controller.spec.ts
Cuidados Comuns
Sempre importe o módulo correto para usar serviços.

Evite dependências circulares; use forwardRef() se necessário.

Não coloque lógica de negócio no Controller.

Crie DTOs específicos para cada caso (ex: CreateUserDto, UpdateUserDto).

Checklist para Nova Funcionalidade
 A funcionalidade pertence a módulo existente ou novo?

 Se novo domínio, foi criado novo módulo?

 A lógica está no service correto?

 DTOs criados e organizados em dto/?

 Dados validados com class-validator?

 Usado ValidationPipe no controller?

 Controller apenas delega para service?

 Testes criados para service e controller?

 Cobertura de testes suficiente?

 Interfaces/types usados para contratos internos?

 Documentação da API atualizada (Swagger/Postman)?

 Endpoints e modelos documentados para outros devs?