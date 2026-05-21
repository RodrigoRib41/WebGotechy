# Guía del administrador — BlogTechy

Esta guía es para vos, el editor del blog. No necesitás saber programar para usarla.

> 💡 Si todavía no configuraste Supabase + Cloudinary, primero seguí [SETUP.md](./SETUP.md).

---

## Acceder al panel

1. Andá a **https://gotechy.com/admin** (o `http://localhost:5173/admin` en local).
2. Ingresá con el email y password que creaste en Supabase.
3. Si todo está bien, te redirige al **Dashboard**.

Si te aparece "Supabase no está configurado", avisale al equipo técnico — falta cargar las variables de entorno.

---

## El Dashboard

Vas a ver:

- **4 tarjetas arriba** con estadísticas: total de artículos, publicados, borradores, vistas totales.
- **Filtros**: Todos / Publicados / Borradores.
- **Búsqueda** por título o slug.
- **Tabla** con todos los artículos, miniatura, estado, fecha y acciones.

### Acciones por artículo

- **🔗 Ojo** → ver el artículo en el blog público (solo si está publicado).
- **✏️ Lápiz** → editar.
- **🗑️ Tacho** → eliminar (con confirmación).

---

## Crear un artículo nuevo

1. Hacé clic en **Nuevo artículo** (arriba a la derecha, o en la sidebar).
2. Completá los campos:

### Columna principal

| Campo | Notas |
|---|---|
| **Título** | Obligatorio, 5–200 caracteres. Aparece como `<h1>` en el post. |
| **Slug** | Se genera automático desde el título. Editalo si querés. Solo minúsculas, números, guiones. Es la URL: `/blogtechy/mi-slug`. |
| **Extracto** | Opcional, máx 300 caracteres. Es el resumen que aparece en el listado del blog. |
| **Contenido** | Mínimo 100 caracteres. Editor visual (ver siguiente sección). |

### Columna lateral (metadata)

| Campo | Notas |
|---|---|
| **Imagen destacada** | Sube a Cloudinary. JPG/PNG/WEBP/GIF, máx 5MB. |
| **Autor** | Tu nombre. Se pre-llena con tu email. |
| **Email del autor** | Opcional, no se muestra públicamente. |
| **Tags** | Hasta 10. Escribí y apretá Enter (o coma) para agregar. Backspace borra el último. |
| **Estado** | Borrador (no se muestra al público) o Publicado. |

3. **Guardá:**
   - **Guardar borrador** → queda guardado pero no se publica.
   - **Publicar** → queda visible en `/blogtechy` y `/blogtechy/<slug>`.

> ⚠️ Si publicás un artículo nuevo, el campo `published_at` se setea automáticamente a "ahora". Si lo despublicás y volvés a publicar, mantiene la fecha original.

---

## Usar el editor (TipTap)

La barra superior tiene todos los formatos. De izquierda a derecha:

| Grupo | Botones | Atajo |
|---|---|---|
| **Texto** | Negrita, Cursiva, Subrayado, Tachado, Código inline | `Ctrl+B`, `Ctrl+I`, `Ctrl+U` |
| **Headings** | H1, H2, H3 | `Ctrl+Alt+1/2/3` |
| **Listas** | Bullets, numerada, cita, separador | — |
| **Alineación** | Izq, Centro, Der, Justificado | — |
| **Insertar** | Enlace, Imagen, Bloque de código | — |
| **Historial** | Deshacer, Rehacer | `Ctrl+Z`, `Ctrl+Shift+Z` |

### Insertar imagen

1. Hacé clic en el botón 🖼️ de la toolbar.
2. Elegí un archivo del disco.
3. Se sube a Cloudinary y se inserta en el cursor.

> Las imágenes se sirven optimizadas (formato auto, compresión inteligente) por Cloudinary.

### Insertar link

1. Seleccioná el texto.
2. Hacé clic en el botón 🔗.
3. Pegá la URL y aceptá. Para sacar el link, abrí el modal y dejá el campo vacío.

### Bloques de código

El editor soporta resaltado de sintaxis para `javascript`, `typescript`, `python`, `sql` y los lenguajes que vengan en lowlight por defecto. Usá el botón ✦ de la toolbar.

---

## Editar un artículo

1. En el dashboard, hacé clic en el título (o ✏️).
2. Modificá lo que quieras.
3. **Guardar borrador** o **Publicar**.

Abajo a la derecha vas a ver fechas de creación, actualización, publicación y vistas.

---

## Eliminar un artículo

1. En el dashboard, ✏️ → o ✏️ y bajá hasta el botón rojo **Eliminar artículo**.
2. Aparece un modal de confirmación.
3. Una vez confirmado, se borra **permanentemente** de Supabase. No hay papelera.

---

## Buenas prácticas

- **Slug:** una vez que un post está publicado, evitá cambiarle el slug. Si cambia, los links rotos quedan 404.
- **Imagen destacada:** usá relación 16:9 (ej: 1600×900) para que se vea bien en el listado.
- **Excerpt:** escribilo a mano, no copies el primer párrafo. Es lo que Google muestra en resultados.
- **Tags:** consistencia importa más que cantidad. Usá pocos tags repetidos en muchos posts.
- **Publicar:** si todavía estás escribiendo, mantenelo en **Borrador**. Una vez publicado es público al instante.

---

## Troubleshooting rápido

- **"Revisá los campos con error"** al guardar → mirá los campos en rojo, suelen ser slug inválido o contenido muy corto (<100 chars).
- **Imagen no sube** → puede ser tamaño (>5MB), formato no soportado, o Cloudinary mal configurado.
- **No veo el post en el blog público** → confirmá que el estado sea **Publicado**, no Borrador.
- **Login falla** → contraseña incorrecta o el usuario no fue creado con "Auto Confirm" en Supabase.

Para detalles técnicos ver [SETUP.md](./SETUP.md).
