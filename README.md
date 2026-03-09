# Principios Básicos de la Naturaleza

## Descripción del Proyecto

Este proyecto es un sitio web educativo estático sobre los principios fundamentales que rigen la naturaleza y los ecosistemas de nuestro planeta. El objetivo es concientizar a los usuarios sobre la importancia de cuidar el medio ambiente y promover prácticas sostenibles.

## Estructura del Proyecto

```
WebAmbiente/
├── index.html              # Página principal con video de fondo
├── README.md              # Documentación del proyecto
├── EQ3_PRINCIPIOS-BASICOS-DE-LA-NATURALEZA.pptx  # Presentación descargable
├── images/                # Imágenes del sitio
├── videos/                # Videos (naturaleza.mp4)
├── pages/                 # Páginas secundarias
│   ├── blog.html          # Menú del blog con 5 entradas
│   ├── entrada1.html      # La Tierra como Ecosistema
│   ├── entrada2.html      # Flujo de Energía y Ciclos Biogeoquímicos
│   ├── entrada3.html      # El Rol de los Seres Vivos
│   ├── entrada4.html      # El Equilibrio Ecológico
│   ├── entrada5.html      # Futuro Sostenible
│   ├── foro.html          # Foro comunitario
│   └── equipo.html        # Información del equipo
├── styles/
│   └── main.css           # Estilos personalizados
└── JS/
    └── main.js            # Funcionalidad JavaScript
```

## Características

### Página Principal (index.html)
- Video de fondo en loop (naturaleza.mp4) que se reproduce automáticamente
- Botón de descarga para la presentación del proyecto
- Sección destacada con enlaces a las 5 entradas del blog
- Sección "Acerca de" con información sobre la importancia de la naturaleza
- Estadísticas del proyecto
- Llamada a la acción para visitar el foro

### Blog (pages/blog.html)
- Menú con 5 entradas educativas
- Cada entrada cuenta con su propia página HTML
- Navegación entre entradas anterior/siguiente

### Entradas del Blog
1. **La Tierra como Ecosistema** - Componentes bióticos y abióticos, las cuatro esferas terrestres
2. **Flujo de Energía y Ciclos Biogeoquímicos** - Cómo la energía fluye a través de los ecosistemas
3. **El Rol de los Seres Vivos** - Productores, consumidores y descomponedores
4. **El Equilibrio Ecológico** - Alteraciones humanas y conservación
5. **Futuro Sostenible** - Acciones para proteger el medio ambiente

### Foro (pages/foro.html)
- Sistema de publicaciones estático con localStorage
- Formulario para crear nuevas publicaciones con imagen
- Sistema de "me gusta" para cada publicación
- Sistema de comentarios en cada publicación
- Etiquetas flotantes (floating labels) al estilo de Google Forms

### Equipo (pages/equipo.html)
- Tabla con información de los miembros del equipo
- Columns: Matrícula, Nombre, Carrera

## Tecnologías Utilizadas

- **HTML5** - Estructura semántica del sitio
- **Tailwind CSS** - Framework de estilos (vía CDN)
- **CSS Personalizado** - Animaciones y estilos adicionales
- **JavaScript** - Funcionalidad del foro (localStorage)
- **Bootstrap Icons** - Iconos del sitio
- **Video HTML5** - Video de fondo en la página principal

## Instalación y Uso

1. Clonar o descargar el repositorio
2. Abrir `index.html` en un navegador web
3. No requiere servidor backend - funciona completamente en el cliente

## Navegación

El sitio cuenta con un menú de navegación fijo con las siguientes secciones:
- **Inicio** - Página principal
- **Blog** - Lista de entradas educativas
- **Foro** - Espacio de discusión comunitaria
- **Equipo** - Información del equipo de trabajo

## Equipo de Desarrollo

Universidad Autónoma de Nuevo León
Facultad de Ingeniería Mecánica y Eléctrica
Equipo 3 - Ambiente y Sustentabilidad

## Imágenes

El proyecto utiliza 11 imágenes ubicada en la carpeta `images/`, incluyendo:
- ecosistema-minimalista.jpg
- flujo-de-energia.jpg
- niveles-troficos.jpg
- deforestacion.jpg
- plantando-una-planta.png
- Y muchas más...

## Funcionalidades JavaScript

- **Foro**: Creación de publicaciones con imagen (localStorage)
- **Me gusta**: Sistema de likes en publicaciones
- **Comentarios**: Sistema de comentarios en publicaciones
- **Menú móvil**: Navegación responsiva en dispositivos móviles
- **Animaciones**: Efectos de scroll y transiciones

## Licencia

© 2026 Equipo 3 - Universidad Autónoma de Nuevo León
