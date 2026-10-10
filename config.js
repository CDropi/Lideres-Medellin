/* ==========================================================================
   CONFIGURACIÓN DEL HUB — este es el único archivo que hay que editar
   --------------------------------------------------------------------------
   - nombre:      nombre del líder (obligatorio)
   - clase:       título de la clase (obligatorio)
   - luma:        enlace completo del evento en Luma (https://lu.ma/...)
   - fecha:       día en que se presenta el líder (ej: "Martes 21 de octubre")
   - hora:        horario de la clase (ej: "9:00am - 10:00am")
                  Fecha y hora son opcionales y se muestran como etiquetas
   - descripcion: opcional, una o dos líneas sobre la clase
   - foto:        opcional, ruta a la foto. Usa un recorte cuadrado centrado
                  en la cara (ej: "assets/fotos/avatares/nombre.webp", 400×400).
                  Si no hay foto se muestran las iniciales.
   - corto:       opcional, nombre corto para la etiqueta en celular
                  (ej: "Jaime y Jhonatan"). Si no se pone, se usa el primer nombre.
   - id:          opcional. Se usa en el enlace directo (#id). Si lo dejas
                  vacío se genera a partir del nombre.

   El orden en que pongas a los líderes NO importa: la página los reparte
   al azar alrededor de la rueda en cada visita.
   ========================================================================== */

window.HUB_CONFIG = {
  tituloLinea1: "Dropi se toma",
  tituloLinea2: "Medellín",
  subtitulo: "Elige tu clase y aprende a\nescalar tu operación en Medellín", // \n = salto de línea en escritorio
  fechaGeneral: "",          // opcional, va bajo el título (ej: "Del 21 al 31 de octubre")
  rol: "Líder de comunidad", // texto bajo el nombre en la tarjeta

  lideres: [
    { nombre: "Juan Madrid",  clase: "¿Y si el algoritmo ya no es el problema?",  fecha: "Jueves, 15 de octubre", hora: "9:00am - 10:00am", descripcion: "Descubre cómo aprovechar la inteligencia artificial para potenciar la creatividad, desarrollar nuevas ideas y optimizar el proceso de testeo. Juan Madrid compartirá estrategias prácticas para experimentar, validar propuestas y encontrar oportunidades que impulsen tus resultados en Ecommerce", foto: "assets/fotos/avatares/juan-madrid.webp", luma: "https://luma.com/0vrphc8g" },
    { nombre: "Andrey Rojas",  clase: "La IA definitiva para el servicio al cliente de tu negocio",  fecha: "Jueves, 15 de octubre", hora: "11:00am - 12:00m", descripcion: "​La inteligencia artificial está transformando la forma en que gestionamos y optimizamos nuestras operaciones", foto: "assets/fotos/avatares/andrey.webp", luma: "https://luma.com/t98elscn" },
    { nombre: "Leonardo Franco",  clase: "El pedido no es la venta",  fecha: "Jueves, 15 de octubre", hora: "3:00pm - 4:00pm", descripcion: "​En esta charla, Leonardo Franco nos compartirá las claves para entender la diferencia entre generar ventas y construir una marca con identidad, propósito y una conexión real con sus clientes", foto: "assets/fotos/avatares/leonardo.webp", luma: "https://luma.com/4j037ars" },
    { nombre: "David Moreno",  clase: "Cómo generar 10K con una tienda online en 30 días usando IA, sin experiencia y sin inventario",  fecha: "Viernes, 16 de octubre", hora: "11:00am - 12:00m", descripcion: "​Descubre cómo aprovechar la inteligencia artificial para crear, optimizar y llevar tu tienda online al siguiente nivel en solo 30 días.", foto: "assets/fotos/avatares/david-moreno.webp", luma: "https://luma.com/bjgqn9ol" },
    { nombre: "Jaime Escobar y Jhonatan Escobar",  clase: "De cero a un mercado en expansión Guatemala",  fecha: "Viernes, 16 de octubre", hora: "1:00pm - 2:00pm", descripcion: "Acompáñanos junto a Jaime Escobar y Jhonatan Escobar en una charla donde exploraremos los productos que están destacando en el mercado guatemalteco, las tendencias que están marcando el rumbo del Ecommerce y las nuevas oportunidades que están surgiendo para los emprendedores", foto: "assets/fotos/avatares/jhonatan.webp", luma: "https://luma.com/sb0x7nrc" },
    { nombre: "Iván Caicedo",  clase: "Conversatorio",  fecha: "Viernes, 16 de octubre", hora: "3:00pm - 4:00pm", descripcion: "​Un espacio para conversar, compartir experiencias y conocer diferentes perspectivas sobre el mundo del Ecommerce, sus retos y las oportunidades que están surgiendo para los emprendedores", foto: "assets/fotos/avatares/ivan-caicedo.webp", luma: "https://luma.com/biz8yk59" },
    { nombre: "Jose Naicipa y Sebastian Naicipa",  clase: "Tu competencia ya está usando IA",  fecha: "Viernes, 16 de octubre", hora: "6:00pm - 7:00pm", descripcion: "​Acompáñanos junto a Jose Naicipa y Sebastian Naicipa para conocer cómo la inteligencia artificial y los agentes están transformando la forma de trabajar, automatizar procesos y tomar decisiones en el mundo digital", foto: "assets/fotos/avatares/jose.webp", luma: "https://luma.com/taet1p9s" },
    { nombre: "Laura Mira",  clase: "Como tener una empresa de dropshiping rentable, sostenible y delegable",  fecha: "Sábado, 17 de octubre", hora: "9:00am - 10:00am", descripcion: "Conoce las claves para mejorar la rentabilidad de un negocio, tomar mejores decisiones y construir una operación sostenible en el tiempo. ​Una sesión para entender qué factores impactan realmente tus resultados y cómo enfocarte en lo que genera crecimiento", foto: "assets/fotos/avatares/laura-mira.webp", luma: "https://luma.com/mo10bpsc" },
    { nombre: "Esteban Hype",  clase: "La nueva era de los agentes de IA en el Ecommerce",  fecha: "Sábado, 17 de octubre", hora: "11:00am - 12:00m", descripcion: "​Acompáñanos junto a Esteban Hype para conocer herramientas de inteligencia artificial que realmente pueden aportar a tu operación de Ecommerce", foto: "assets/fotos/avatares/esteban.webp", luma: "https://luma.com/w9io73tz" },
    { nombre: "Antonia Villa", clase: "Convierte tus métricas en resultados", fecha: "Sábado, 17 de octubre", hora: "1:00pm - 2:00pm", descripcion: "​Acompáñanos junto a Antonia Villa para aprender a interpretar las métricas que realmente importan y entender qué dicen los números sobre el rendimiento de tu negocio", foto: "assets/fotos/avatares/antonia.webp", luma: "https://luma.com/sxv3ocns" },
    { nombre: "Juan Camilo Villada", clase: "Portafolios dinámicos para crecer en Ecommerce", fecha: "Sábado, 17 de octubre", hora: "3:00pm - 4:00pm", descripcion: "Acompáñanos junto a Juan Camilo Villada para conocer estrategias enfocadas en construir portafolios dinámicos, identificar oportunidades y crear marcas de forma ágil para el Ecommerce", foto: "assets/fotos/avatares/juancamilovillada.webp", luma: "https://luma.com/jnbx321n" }
  ]
};
