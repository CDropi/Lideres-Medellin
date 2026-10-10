/* ==========================================================================
   CONFIGURACIÓN DEL HUB — este es el único archivo que hay que editar
   --------------------------------------------------------------------------
   - nombre:      nombre del líder (obligatorio)
   - clase:       título de la clase (obligatorio)
   - luma:        enlace completo del evento en Luma (https://lu.ma/...)
   - hora / sala: opcionales, se muestran como etiquetas
   - descripcion: opcional, una o dos líneas sobre la clase
   - foto:        opcional, ruta a la foto (ej: "assets/fotos/nombre.jpg").
                  Si no hay foto se muestran las iniciales.
   - id:          opcional. Se usa en el enlace directo (#id). Si lo dejas
                  vacío se genera a partir del nombre.

   El orden en que pongas a los líderes NO importa: la página los reparte
   al azar alrededor de la rueda en cada visita.
   ========================================================================== */

window.HUB_CONFIG = {
  titulo: "Clases con líderes de comunidad",
  evento: "Inauguración de la regional Dropi Medellín",
  fecha: "",                 // ej: "Sábado 24 de octubre"
  ciudad: "Medellín",
  rol: "Líder de comunidad", // texto bajo el nombre en la tarjeta
  logo: "assets/logo-dropi.svg", // si el archivo no existe, se muestra el texto "dropi"

  lideres: [
    { nombre: "Líder 1",  clase: "Título de la clase 1",  hora: "", sala: "", descripcion: "", foto: "", luma: "" },
    { nombre: "Líder 2",  clase: "Título de la clase 2",  hora: "", sala: "", descripcion: "", foto: "", luma: "" },
    { nombre: "Líder 3",  clase: "Título de la clase 3",  hora: "", sala: "", descripcion: "", foto: "", luma: "" },
    { nombre: "Líder 4",  clase: "Título de la clase 4",  hora: "", sala: "", descripcion: "", foto: "", luma: "" },
    { nombre: "Líder 5",  clase: "Título de la clase 5",  hora: "", sala: "", descripcion: "", foto: "", luma: "" },
    { nombre: "Líder 6",  clase: "Título de la clase 6",  hora: "", sala: "", descripcion: "", foto: "", luma: "" },
    { nombre: "Líder 7",  clase: "Título de la clase 7",  hora: "", sala: "", descripcion: "", foto: "", luma: "" },
    { nombre: "Líder 8",  clase: "Título de la clase 8",  hora: "", sala: "", descripcion: "", foto: "", luma: "" },
    { nombre: "Líder 9",  clase: "Título de la clase 9",  hora: "", sala: "", descripcion: "", foto: "", luma: "" },
    { nombre: "Líder 10", clase: "Título de la clase 10", hora: "", sala: "", descripcion: "", foto: "", luma: "" },
    { nombre: "Líder 11", clase: "Título de la clase 11", hora: "", sala: "", descripcion: "", foto: "", luma: "" }
  ]
};
