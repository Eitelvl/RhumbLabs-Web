# Sistema visual PaperSafe para Flutter

Guía de implementación para reutilizar el estilo de PaperSafe en otras aplicaciones Flutter. Los valores salen de `src/index.css` y de la implementación móvil en `flutter_app/lib/src/`. El objetivo es conservar la identidad visual, no copiar la lógica ni los datos de la bóveda.

## 1. Principios de diseño

PaperSafe combina una superficie color papel con elementos de alto contraste y geometría deliberadamente simple:

- Fondo marfil, tinta casi negra y superficies gris cálido en modo claro. En modo oscuro, grises azulados y texto claro.
- Bordes visibles de **2 dp**, esquinas rectas y sombras desplazadas sin desenfoque. Evitar elevaciones y radios predeterminados de Material.
- Inter para estructura, navegación y títulos; JetBrains Mono para datos, valores y texto técnico.
- Etiquetas breves en mayúsculas y con espaciado entre letras. El contenido escrito por el usuario conserva su capitalización, salvo los títulos de filas que se muestran en mayúsculas.
- Iconos lineales Lucide, casi siempre entre **16 y 20 dp**.
- Separadores punteados en listas; líneas continuas de **2 dp** en cabeceras, pestañas y grupos de ajustes.
- Estados activos de tinta sólida con texto color papel. El azul se reserva para foco, selección y acentos puntuales.

Todas las medidas Flutter de esta guía son **dp**; en el código React de referencia las medidas CSS son **px**. No se debe escalar manualmente por la densidad del teléfono.

## 2. Preparación del proyecto

### Fuentes e iconos

Copiar estas fuentes desde `flutter_app/assets/fonts/` al nuevo proyecto, junto con sus archivos `*-OFL.txt`:

| Familia Flutter | Archivo | Uso |
| --- | --- | --- |
| `Inter` | `Inter.ttf` | Títulos, etiquetas, botones y navegación |
| `JetBrainsMono` | `JetBrainsMono.ttf` | Datos, subtítulos de filas, entradas y códigos |

Añadir en `pubspec.yaml`:

```yaml
dependencies:
  flutter:
    sdk: flutter
  lucide_icons_flutter: ^3.1.22

flutter:
  uses-material-design: true
  fonts:
    - family: Inter
      fonts:
        - asset: assets/fonts/Inter.ttf
    - family: JetBrainsMono
      fonts:
        - asset: assets/fonts/JetBrainsMono.ttf
```

Ejecutar `flutter pub get`. Si se reutiliza la imagen de marca, copiar `flutter_app/assets/papersafe.png` y declararla en `flutter.assets`. En aplicaciones con otra marca, conservar el contenedor geométrico y sustituir solo la ilustración.

### Tema base

Usar `ThemeData(useMaterial3: false)` para evitar que botones, campos y diálogos reciban las formas redondeadas de Material 3. Definir `theme` y `darkTheme` con `fontFamily: 'Inter'`. El color visible de cada componente debe venir de los tokens de la sección siguiente, no de colores Material implícitos.

```dart
MaterialApp(
  theme: ThemeData(
    useMaterial3: false,
    brightness: Brightness.light,
    fontFamily: 'Inter',
    scaffoldBackgroundColor: const Color(0xFFFDFCF0),
  ),
  darkTheme: ThemeData(
    useMaterial3: false,
    brightness: Brightness.dark,
    fontFamily: 'Inter',
    scaffoldBackgroundColor: const Color(0xFF313338),
  ),
  themeMode: themeMode,
  home: const HomeScreen(),
)
```

La implementación actual de los tokens y componentes compartidos se encuentra en `flutter_app/lib/src/style.dart`; se puede copiar como punto de partida porque solo depende de Flutter.

## 3. Paleta semántica

| Token / uso | Claro | Oscuro |
| --- | --- | --- |
| `background` — área exterior y detrás del panel | `#D6D2C4` | `#2B2D31` |
| `paper` — panel principal y campos | `#FDFCF0` | `#313338` |
| `surface` — botones secundarios, pestañas y ajustes | `#EBE9DB` | `#383A40` |
| `tertiary` — filas alternas y hover | `#F1F0E6` | `#404249` |
| `ink` — títulos, iconos y botones principales | `#1A1A1A` | `#F2F3F5` |
| `secondary` — texto de apoyo | `#7A786E` | `#B5BAC1` |
| `muted` — placeholders y separadores | `#B1AFA3` | `#80848E` |
| `border` — contornos principales | `#1A1A1A` | `#4E5058` |
| `accent` — foco y selección | `#2563EB` | `#5865F2` |

Exponerlos como una clase inmutable `PaperPalette` obtenida desde `Theme.of(context).brightness`, o como un `ThemeExtension<PaperPalette>` si varias aplicaciones comparten un paquete de diseño. Mantener **nombres semánticos**: por ejemplo, un botón principal usa `ink` y `paper`, y un campo enfocado cambia únicamente su borde a `accent`.

Implementación portable de los tokens:

```dart
import 'package:flutter/material.dart';

class PaperPalette {
  const PaperPalette({
    required this.background,
    required this.paper,
    required this.surface,
    required this.tertiary,
    required this.ink,
    required this.secondary,
    required this.muted,
    required this.border,
    required this.accent,
  });

  final Color background, paper, surface, tertiary;
  final Color ink, secondary, muted, border, accent;

  static const light = PaperPalette(
    background: Color(0xFFD6D2C4),
    paper: Color(0xFFFDFCF0),
    surface: Color(0xFFEBE9DB),
    tertiary: Color(0xFFF1F0E6),
    ink: Color(0xFF1A1A1A),
    secondary: Color(0xFF7A786E),
    muted: Color(0xFFB1AFA3),
    border: Color(0xFF1A1A1A),
    accent: Color(0xFF2563EB),
  );

  static const dark = PaperPalette(
    background: Color(0xFF2B2D31),
    paper: Color(0xFF313338),
    surface: Color(0xFF383A40),
    tertiary: Color(0xFF404249),
    ink: Color(0xFFF2F3F5),
    secondary: Color(0xFFB5BAC1),
    muted: Color(0xFF80848E),
    border: Color(0xFF4E5058),
    accent: Color(0xFF5865F2),
  );

  static PaperPalette of(BuildContext context) =>
      Theme.of(context).brightness == Brightness.dark ? dark : light;
}
```

En Android, PaperSafe muestra las barras del sistema sobre `#2B2D31` con iconos claros incluso cuando el contenido usa el tema claro. En versiones con dibujo detrás de las barras, pintar ese color en el `Scaffold` exterior y usar `SafeArea` + una superficie interior del tema. Aplicar `AnnotatedRegion<SystemUiOverlayStyle>` con iconos claros; establecer solo `statusBarColor` puede no bastar en Android reciente. Consultar `flutter_app/lib/main.dart` y `flutter_app/lib/src/app.dart`.

## 4. Tipografía calibrada en Flutter

La versión React declara `Inter` con pesos 400, 500, 600 y 700, y `JetBrains Mono` con 400, 500 y 700. En Flutter, usar los pesos **visualmente calibrados en el teléfono**, no traducir de forma automática clases CSS como `font-black` a `FontWeight.w900`: eso produjo títulos perceptiblemente más gruesos.

| Elemento | Familia | Tamaño | Peso Flutter | Espaciado | Altura |
| --- | --- | ---: | ---: | ---: | ---: |
| Marca en acceso | Inter | 28 | 700 | −1.5 | 1.0 |
| Marca en cabecera principal | Inter | 24 | 600 | −1.2 | 1.0 |
| Subtítulo de acceso | Inter | 10 | 700 | 2.2 | normal |
| Subtítulo de cabecera | Inter | 11 | 700 | 1.1 | normal |
| Título de cuenta en lista | Inter | 12 | 700 | 0 | normal |
| Dato secundario de lista | JetBrains Mono | 10 | 400 | 0 | normal |
| Etiqueta de campo o botón | Inter | 10 | 700 | 1.0–1.1 | normal |
| Campo de texto | JetBrains Mono | 14 | 400 | 0 | normal |
| Número de teclado | Inter | 28 | 700 | 0 | 1.0 |
| Texto descriptivo | Inter | 12 | 400 | 0 | 1.5–1.6 |

Una función base evita divergencias:

```dart
TextStyle paperText(
  double size, {
  Color? color,
  FontWeight weight = FontWeight.w400,
  double spacing = 0,
  bool mono = false,
  double? height,
}) => TextStyle(
  fontFamily: mono ? 'JetBrainsMono' : 'Inter',
  fontSize: size,
  fontWeight: weight,
  color: color,
  letterSpacing: spacing,
  height: height,
);
```

Usar Inter en mayúsculas para títulos de navegación y acciones; JetBrains Mono para usuarios, enlaces, contraseñas ocultas, notas técnicas y códigos. Dar `maxLines: 1` y `TextOverflow.ellipsis` a títulos y datos en una fila. No reducir toda la escala tipográfica para resolver un título largo: permitir que cada elemento se trunque según su ancho disponible.

## 5. Geometría, espaciado y profundidad

### Escala recomendada

| Token | Valor | Uso frecuente |
| --- | ---: | --- |
| `xxs` | 4 | Separación título/subtítulo, icono interior |
| `xs` | 8 | Espacio entre pestañas, teclas o acciones |
| `sm` | 12 | Icono/texto, padding de campo |
| `md` | 16 | Padding de fila, separación entre campos |
| `lg` | 20 | Padding de tarjeta |
| `xl` | 24 | Margen lateral de pantalla y diálogos |
| `2xl` | 32 | Separación entre secciones |

### Bordes y sombras

- Borde normal: `Border.all(color: palette.border, width: 2)`.
- Contenedor de recuperación o diálogo destacado: borde de **4 dp**.
- Radio normal: **0**. Usar radio de **4 dp** únicamente donde la implementación lo emplea de forma deliberada, como el botón flotante de crear.
- Sombra dura: `BoxShadow(color: Colors.black.withValues(alpha: 0.14), offset: Offset(n, n), blurRadius: 0)`. Usar `n = 3` en teclas, `4` en el control flotante y aproximadamente `10–12` en paneles destacados.
- Divisor de sección: línea continua de **2 dp**. Divisor de lista: línea punteada de **1 dp** en `muted`; `DashedRule` de `style.dart` dibuja segmentos de 2 dp y espacios de 2 dp con trazo de 0.6 dp.

Centralizar las cajas en un helper para que ninguna pantalla invente un borde distinto:

```dart
BoxDecoration paperBox(
  PaperPalette p, {
  Color? fill,
  double width = 2,
  double radius = 0,
  double shadow = 0,
}) => BoxDecoration(
  color: fill ?? p.paper,
  border: Border.all(color: p.border, width: width),
  borderRadius: BorderRadius.circular(radius),
  boxShadow: shadow == 0 ? null : [
    BoxShadow(
      color: Colors.black.withValues(alpha: 0.14),
      offset: Offset(shadow, shadow),
      blurRadius: 0,
    ),
  ],
);
```

### Anchuras y alturas

- Panel móvil principal: ancho disponible, máximo **400 dp** en pantallas grandes.
- Padding horizontal de pantallas: **24 dp**.
- Campo de búsqueda: **44 dp** de alto.
- Campo de formulario: mínimo **40 dp**; área de notas: mínimo **100 dp**.
- Pestaña de navegación: **36 dp**; espacio entre pestañas: **8 dp**.
- Fila de ajustes: aproximadamente **50 dp**.
- Botón principal de formulario: **40–52 dp**, según contexto.
- Botón visual de icono: **32 × 32 dp** con icono de **16 dp**; ampliar la zona táctil externa si hace falta para alcanzar al menos **44 × 44 dp** sin cambiar el tamaño visual.

## 6. Componentes reutilizables

Crear primero una biblioteca pequeña, separada de la lógica de negocio:

```text
lib/design/
  paper_palette.dart      # Tokens claro y oscuro
  paper_typography.dart   # paperText y estilos nominales
  paper_box.dart          # Bordes, relleno y sombra dura
  paper_button.dart       # Acción primaria, secundaria, icono y pestaña
  paper_field.dart        # Campo y área multilínea
  dashed_rule.dart        # Separador de lista
```

### `PaperBox` y botones

El contenedor por defecto usa `paper`, borde de 2 dp y radio 0. Un botón primario invierte tinta y papel; uno secundario usa `surface` con tinta. El estado seleccionado de una pestaña usa `ink` como fondo. El estado deshabilitado de la implementación actual reduce opacidad a `0.42`; acompañarlo con `onTap: null` y semántica deshabilitada. No depender solo del color para indicar la selección.

Ejemplo mínimo de botón visual:

```dart
Widget paperAction({
  required BuildContext context,
  required String label,
  required VoidCallback? onPressed,
  bool primary = false,
}) {
  final p = PaperPalette.of(context);
  return Material(
    color: Colors.transparent,
    child: InkWell(
      onTap: onPressed,
      child: Container(
        height: 48,
        alignment: Alignment.center,
        decoration: BoxDecoration(
          color: primary ? p.ink : p.surface,
          border: Border.all(color: p.border, width: 2),
        ),
        child: Text(
          label.toUpperCase(),
          style: paperText(
            10,
            color: primary ? p.paper : p.ink,
            weight: FontWeight.w700,
            spacing: 1.1,
          ),
        ),
      ),
    ),
  );
}
```

### Campos

Fondo `paper`, borde 2 dp, esquinas rectas, texto y placeholder en JetBrains Mono a 14 dp. El placeholder usa `muted`; el cursor y borde enfocado usan `accent`. Colocar la etiqueta Inter de 10 dp en mayúsculas encima, separada entre **4 y 8 dp**. Para secretos, incluir un control de mostrar/ocultar con icono Lucide; para valores copiables, usar un botón de acción con fondo `ink` a la derecha.

### Fila de lista

Alternar `paper` y `tertiary`; aplicar padding horizontal de 4 dp y vertical de 16 dp. El título va en Inter 12/700, el dato secundario en JetBrains Mono 10/400. El menú de tres puntos mide visualmente **28 × 28 dp** con icono de **20 dp**. Evitar el tamaño mínimo predeterminado de `IconButton` dentro de la fila: aumentaba la altura total y rompía la correspondencia con React. Dibujar al final un divisor punteado. Ordenar por `updatedAt` descendente cuando la pantalla representa elementos modificables, tal como hace el dashboard React.

### Tarjetas, diálogos y toggle

- Tarjeta: `surface`, borde 2 dp, padding 20 dp; cabecera con icono 20 dp, título Inter 14/700 y divisor 2 dp.
- Diálogo destacado: ancho máximo cercano a 330 dp, padding 20–24 dp, borde 4 dp y sombra dura de 10 dp. Contenido con `SingleChildScrollView` si el texto crece.
- Toggle de ajustes: pista rectangular **32 × 16 dp**, borde 2 dp, indicador **8 × 8 dp**; `ink` en activo y `paper` en inactivo.
- Iconos: usar `lucide_icons_flutter` en lugar de mezclar Material y otras bibliotecas dentro de la misma pantalla.

## 7. Recetas de pantalla

### Acceso

Panel `paper`; padding lateral de 24 dp y superior de 82 dp. Imagen de marca dentro de un cuadro **62 × 62 dp** con borde 2 dp; la imagen PaperSafe se muestra con escala **1.25** y recorte. Debajo: marca Inter 28/700, subtítulo Inter 10/700 con espaciado 2.2. Formulario centrado con ancho máximo **302 dp**. El teclado tiene tres columnas, teclas de **56 dp** de alto, separación de **8 dp**, fondo `surface`, borde 2 dp y sombra dura de 3 dp. Los campos de PIN miden **44 dp** de alto; las acciones de mostrar usan cuadros de 48 dp.

### Dashboard

Padding lateral de 24 dp y superior cercano a 26 dp. Marca Inter 24/600; subtítulo Inter 11/700. Acciones de ajustes y salida a la derecha. Después: búsqueda de 44 dp, separación de 16 dp, cuatro pestañas de 36 dp, separación inferior cercana a 19 dp y regla de 2 dp. La lista ocupa el alto restante y deja espacio inferior para el control flotante de crear. Ese control se alinea a la derecha, a 24 dp del borde, con texto e icono `plus` dentro de un círculo `ink` de 40 dp.

### Formulario y vista de elemento

Cabecera de regreso, título Inter 12/700 en mayúsculas y acciones laterales. Selector Login/Note con dos segmentos rectangulares de 36 dp. Campos en columna con separación de 16 dp, etiquetas de 10 dp y valores monoespaciados de 14 dp. Botón de guardar de ancho completo, fondo `ink`, texto `paper` y etiqueta espaciada. La vista de detalle usa diálogo con borde fuerte, campos de lectura y botones explícitos de copiar.

### Ajustes

Padding de 24 dp. Cabecera con botón de regreso cuadrado; grupo de filas `surface` con borde 2 dp y divisiones de 2 dp, iconos de 17 dp, texto Inter 10/700 en mayúsculas y toggle rectangular. Botón de salida `ink` a ancho completo de 52 dp. Créditos centrados al pie, Inter 11/700 y JetBrains Mono 9/400 espaciado.

### Generador

Dos tarjetas `surface` con borde 2 dp y padding 20 dp. La primera presenta el resultado en un campo `paper` monoespaciado, acciones de copiar/regenerar y encabezado. La segunda contiene longitud, control deslizante y opciones con casillas rectangulares. Los controles deben mantener el borde y la tipografía del sistema; no dejar el estilo visual por defecto de `Slider` o `Checkbox` si desentona.

## 8. Estados, respuesta y accesibilidad

Definir para cada componente: normal, presionado, enfocado, seleccionado, deshabilitado y error. El foco usa `accent` sin cambiar las dimensiones del borde. Las acciones de borrado usan rojo y confirmación; los errores deben incluir texto además de color. En móvil, las interacciones pueden usar un pequeño desplazamiento de 2 dp o quitar la sombra dura mientras se presionan; evitar animaciones largas.

Mantener `SafeArea`, `Semantics` y etiquetas legibles para iconos. Preservar el escalado de texto del sistema; usar `Flexible`, truncamiento o desplazamiento vertical en vez de desactivar accesibilidad. Comprobar tema claro y oscuro, teclado abierto, textos largos, tamaño de letra aumentado y anchos cercanos a 320 y 400 dp. En pantallas grandes, centrar el panel de máximo 400 dp sobre `background`.

## 9. Orden de implementación y verificación

1. Instalar fuentes, iconos y licencias; registrar las familias en `pubspec.yaml`.
2. Definir `PaperPalette`, tipografía y geometría en un módulo de diseño independiente.
3. Crear botones, campos, tarjetas, diálogos, toggle y divisor punteado con esos tokens.
4. Aplicar el tema base claro/oscuro y el tratamiento de barras del sistema.
5. Componer pantallas con las recetas anteriores; mantener navegación y datos separados del diseño.
6. Comparar capturas **del mismo dispositivo, densidad, tema, tamaño de texto y estado**. Revisar primero bordes, márgenes y alturas; después peso y ancho de texto, iconos y sombras.
7. Ejecutar `flutter analyze`, compilar Android/iOS y revisar en un equipo real. Una captura de emulador o navegador no sustituye la calibración tipográfica en el dispositivo final.

### Lista de aceptación visual

- [ ] La paleta coincide con los nueve tokens en ambos temas.
- [ ] La marca y los títulos de lista usan los pesos Flutter de esta guía; no se ven artificialmente más gruesos.
- [ ] Los campos y datos secundarios usan JetBrains Mono, mientras que navegación y etiquetas usan Inter.
- [ ] Los bordes son rectos y de 2 dp; las sombras son desplazadas y sin desenfoque.
- [ ] El menú de cada fila no aumenta la altura de la lista y los separadores son punteados.
- [ ] Las barras del sistema, los iconos y las zonas seguras se ven como parte de la pantalla.
- [ ] El diseño sigue siendo usable con textos largos, escala de fuente del sistema y modo oscuro.

## 10. Referencia dentro de este repositorio

- Tokens y componentes Flutter: `flutter_app/lib/src/style.dart`.
- Tema, panel y barras del sistema: `flutter_app/lib/src/app.dart` y `flutter_app/lib/main.dart`.
- Pantallas Flutter: `flutter_app/lib/src/auth_view.dart`, `dashboard.dart`, `item_views.dart`, `settings_view.dart` y `generator_view.dart`.
- Referencia React original: `src/index.css` y `src/components/`.
- Fuentes y licencias: `flutter_app/assets/fonts/`.

Si se convierte esta guía en un paquete compartido, publicar únicamente los tokens, assets autorizados y widgets de presentación. Cada aplicación debe aportar sus propios modelos, datos, autenticación y navegación.
