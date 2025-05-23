# ResponsiveMeals

## Introducción
ResponsiveMeals es una aplicación diseñada para la planificación y envío de comidas a domicilio. Permite a los usuarios organizar su menú semanal y recibir los platos correspondientes al inicio de cada semana. Además, ofrece un sistema de suscripción con métodos de pago mensuales y cobertura de gastos de envío, especialmente enfocado en la población canaria.

## Modelo de Datos

### Diagrama E/R
![Diagrama1](https://github.com/user-attachments/assets/3386c359-4086-49fd-94a3-09e8f8fc6c1b)

### Diagrama UML
![image](https://github.com/user-attachments/assets/90325a67-36a4-4980-b7b2-52ebbbe5e0e8)

### Diagrama de Casos de Uso
![image](https://github.com/user-attachments/assets/a5c753f8-553b-4381-8426-bfb26c3ac34c)

### Explicación de Relaciones y Campos

#### Usuario
- **IdUsuario (int):** Identificador único del usuario.
- **Nombre (string):** Nombre con el que se registra el usuario.
- **Contraseña (string):** Almacena la contraseña del usuario.
- **FechaRegistro (timestamp):** Fecha y hora de registro del usuario.
- **Teléfono (string):** Número de contacto del usuario.
- **Email (string):** Correo electrónico del usuario.
- **Token (string):** Token de autenticación del usuario.

#### Suscripción
- **IdSuscripcón (int):** Identificador único de la suscripción.
- **Nombre (string):** Nombre del tipo de suscripción.
- **Precio (double):** Precio mensual de la suscripción.
- **CantidadPlatos (double):** Cantidad de platos que incluye la suscripción.
- **Descripción (string):** Descripción de la suscripción donde se explica lo que incluye dentro de la aplicación.

#### Pedido
- **IdPedido (int):** Identificador único del pedido.
- **Dirección (string):** Dirección de entrega del pedido.
- **CosteTotal (double):** Suma total del pedido.
- **MétodoPago (string):** Forma de pago utilizada.

#### Detalle Pedido
- **IdDetalle (int):** Identificador único del detalle.
- **Cantidad (int):** Número de platos del mismo tipo en el pedido.
- **Subtotal (double):** Precio total del detalle.

#### Comida
- **IdComida (int):** Identificador único de la comida.
- **Nombre (string):** Nombre del plato.
- **Precio (double):** Precio del plato.
- **Rotación (boolean):** Indica si la comida está en la rotación mensual de suscripción estándar.
- **Descripción (string):** Información sobre ingredientes y preparación.
- **Información nutricional:** Proteínas, ración, grasas, hidratos, fibra.

## Modelo Relacional
- **Usuario:** IdUsuario, Nombre, Contraseña, FechaRegistro, Suscripción, Teléfono, Email, Token, IdSuscripcion.
- **Suscripción:** IdSuscripcion, Nombre, Descripcion, Precio, CantidadPlatos.
- **Pedido:** IdPedido, Dirección, CosteTotal, MétodoPago, IdUsuario.
- **DetallePedido:** IdDetalle, Cantidad, Subtotal, IdComida, IdPedido.
- **Comida:** IdComida, Imagen, Nombre, Precio, Rotación, Descripción, Proteínas, Ración, Grasas, Hidratos, Fibra.

## Arquitectura
- **Backend:** Java con Spring Boot.
- **Frontend:** React con TypeScript.
- **IDE:** Visual Studio Code.
- **Herramientas:** Postman para pruebas API.

## Manual de Instalación

### Para Desarrolladores
1. Instalar [Visual Studio Code](https://code.visualstudio.com/download).
2. Clonar el repositorio:
   ```sh
   git clone --branch back --single-branch https://github.com/CrisDeboi/ResponsiveMeals.git back
   git clone --branch front --single-branch https://github.com/CrisDeboi/ResponsiveMeals.git front
   ```
3. En la carpeta `back`, instalar dependencias y ejecutar:
   ```sh
   cd back
   mvn install
   mvn spring-boot:run
   ```
4. En la carpeta `front`, instalar dependencias y ejecutar:
   ```sh
   cd front
   npm install
   npm run dev
   ```
5. Acceder a la aplicación en [http://localhost:5173/](http://localhost:5173/).

## Documentación de la API

### Endpoints
- **Clientes:** `/responsivemeals/clientes`
- **Suscripcion:** `/responsivemeals/suscripciones`
- **Pedidos:** `/responsivemeals/pedidos`
- **Detalles de Pedido:** `/responsivemeals/detallepedido`
- **Comidas:** `/responsivemeals/comida`

Cada endpoint admite los métodos `GET`, `POST`, `PUT`, y `DELETE` según corresponda.

## Metodología y Control de Versiones
- Uso de **GitHub** con un repositorio colaborativo.
- Ramas separadas para `front` y `back`.
- Uso de **GitHub Projects** para gestión de tareas.

