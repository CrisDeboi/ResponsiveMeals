Proyecto - ResponsiveMeals




































David Tejera González
Cristian Marrero Marrero

Índice

Introducción	3
Modelo de Datos	4
Diagrama E/R	4
Explicación Relaciones y Campos	5
- Usuario	5
- Pedido	5
- Detalle Pedido	5
- Comida	6
Modelo Relacional	7
Metodología y Control de versiones	8
Control de versiones	8
Metodología	9
Pendiente	11
Enlaces	12





















Introducción
La aplicación de ResponsiveMeals está diseñada para realizar pedidos de envíos de comida a domicilio de forma planificada, de tal manera que desde nuestra aplicación puedas planificar el menú de cada semana y se te enviarán los platos correspondientes a esa semana al principio de cada semana.

La idea nace de la necesidad de tener un servicio de comidas fiable para cuando el tiempo escasea y los usuarios no disponen de tiempo suficiente para preparar sus comidas, además que cuente con un servicio de suscripción que facilita métodos de pago mensuales y cubre gastos de envíos para cubrir las necesidades de la población canaria dado el aislamiento y los elevados costes de envío de otros territorios a las islas.

En la aplicación aparte de la propia funcionalidad se encontrarán manuales de ayuda, informes con datos relevantes de la aplicación, información de contacto y gestión de dudas; además de contar con una interfaz amigable y el uso de tonos naranjas que incitan a pensar en la comida.


Modelo de Datos
Diagrama E/R



Explicación Relaciones y Campos
- Usuario
Un usuario posee una relación de uno a muchos con la entidad Pedido porque un cliente puede realizar varios pedidos pero un único pedido solo ha podido ser realizado por un usuario en concreto.

IdUsuario (int): Cada Usuario tiene un Id único que le identifica en la base de datos.
Nombre(string): Nombre con el que se registra cada usuario.
Contraseña(string): Cadena de caracteres que guarda la contraseña de cada usuario.
FechaRegistro(timestamp): Fecha y hora con la que se registra cada usuario.
Suscripción(string): Tipo de suscripción que cada usuario tiene en la aplicación. Puede ser estándar, premium, o no tener ninguna.
Teléfono(string): Campo que almacena el teléfono con el que se registra cada usuario.
Email(string): Campo que almacena el email con el que se registra cada usuario. 
Token(string): Campo que almacena el token generado al loguearse cada usuario que sirve para identificación dentro de la aplicación.

- Pedido
Un pedido está en la parte de muchos a uno de la relación con Usuarios, y a su vez tiene una relación de uno a muchos con Detalle Pedido ya que diversos Detalles de pedido componen un pedido.

IdPedido(int): Id único a cada pedido que lo identificará en la base de datos.
Dirección(string): Dirección a la que se envía un pedido.
Coste total(double): Coste total del pedido sumando sus detalles.
Método de pago(string): Método de pago elegido por el usuario para pagar el pedido.

- Detalle Pedido
Los detalles de pedido están en el lado de muchos a uno tanto con pedidos como con comidas ya que un detalle está presente varias veces en un pedido, y una comida puede estar presente en diversos detalles de pedido.
IdDetalle(int): Id único a cada detalle que lo identifica en la base de datos.
Cantidad(int): Cantidad de platos de una comida en concreto que componen el detalle.
Subtotal(double): Precio total del detalle de pedido calculado con la cantidad y el precio de cada comida.

- Comida
Cada comida tiene relación de uno a muchos con detalle pedido ya que una comida puede estar presente en muchos detalles distintos.

IdComida(int): Id con el que se identificará a cada comida en la base de datos.
Nombre(string): Nombre identificativo de cada comida.
Precio(double): Precio asignado a cada comida.
Rotación(boolean): Campo booleano que indica si una comida está presente en la rotación mensual de platos incluidos en la suscripción estándar.
Descripción(string): Descripción de cada comida indicando sus ingredientes principales, método de preparación, etc.
Campos de información nutricional(Proteínas,Ración,Grasas,HIdratos, Fibra)(double): Todo son campos relacionados con la información nutricional de cada plato de comida.


Modelo Relacional
- Usuario: IdUsuario, Nombre, Contraseña, FechaRegistro, Suscripción, Teléfono, Email, Token.
- Pedido: IdPedido, Dirección, CosteTotal, MétodoPago, IdUsuario*.
- Detalle Pedido: IdDetalle, Cantidad, Subtotal, IdComida*, IdPedido*.
- Comida: IdComida, Imagen, Nombre, Precio, Rotación, Descripción, Proteínas, Ración, Grasas, Hidratos, Fibra.





Metodología y Control de versiones
Control de versiones
Para el control de versiones, en este proyecto hemos hecho uso de GitHub, creando un repositorio en común en el que ambos figuramos como colaboradores. Para gestionar bien el avance que ha hecho cada uno, hemos creado una rama dentro del repositorio para cada uno de los aspectos a trabajar en el proyecto, dejando la rama master para el producto final.



De las ramas que hemos creado, una de ellas es la rama de Front, donde volcamos todos los cambios relativos al Frontend de nuestra aplicación, que incluye todo lo trabajado en React con TypeScript:




Por otro lado, hemos creado la rama de Back, que recoge todos los cambios en el apartado de backend que incluyen los trabajos en la API y usando Java con SpringBoot:

Metodología
En cuanto a la metodología de trabajo, para organizar nuestras tareas en equipo hemos optado por usar el gestor de tareas de proyectos de Git, en el cual hemos ido añadiendo las tareas y mejoras a realizar donde cada uno elige una con la que ponerse a trabajar y las va clasificando en hechas, pendientes o en progreso según se dé la situación.

- Para el comienzo del proyecto, en la semana del 27 al 31 de enero,  nuestro tablón de tareas estaba así al día 31:












- Al término de la semana del 3 al 7 de febrero, el tablón tenía este estado, con nuevas tareas en el backlog y otras terminadas:


Pendiente
-casos de uso????¿¿¿¿
-documentar la api
-incluir reportes y manual de ayuda (hecho en DAD)
-manual de instalación
-manual de usuario 
-documentar tests del front y back
-ideas originales en figma/pencil


Enlaces
- Enlace al repositorio de GitHub:
https://github.com/CrisDeboi/ResponsiveMeals/tree/back

- Enlace al proyecto con las tareas de GitHub:
https://github.com/users/CrisDeboi/projects/3
