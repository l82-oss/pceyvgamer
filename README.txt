PCEYVGAMERS V2 — MANUAL RÁPIDO

1) DESCOMPRIMIR
Extrae todo el ZIP manteniendo esta estructura:
PCEYVGAMERS_V2/
  index.html
  style.css
  script.js
  admin/
    index.html
    admin.css
    admin.js

2) CONFIGURAR
Abre admin/index.html en tu navegador.
Configura:
- WhatsApp: ejemplo Ecuador 5939XXXXXXXX
- Facebook: URL de tu página real
- Instagram: URL de tu cuenta real
Pulsa Guardar configuración.

3) PRODUCTOS
Desde Administrador puedes crear, editar precio, stock, nombre e icono.
IMPORTANTE: esta V2 guarda los cambios en localStorage del navegador. No es un panel centralizado de servidor.

4) PUBLICAR GRATIS
Opción sencilla: GitHub Pages.
- Crea una cuenta en GitHub.
- Crea un repositorio nuevo, por ejemplo "pceyvgamers".
- Sube index.html, style.css, script.js y la carpeta admin.
- En Settings > Pages selecciona Deploy from branch / main / root.
- Guarda y espera la publicación.
- GitHub te dará una dirección *.github.io.

Otra opción: Netlify o Cloudflare Pages. Sube/conecta el mismo proyecto.

5) DOMINIO
El hosting puede ser gratuito. Un dominio propio .com normalmente cuesta dinero. Cuando tengas uno, puedes conectarlo desde el panel del proveedor de hosting.

6) WHATSAPP
El botón abre WhatsApp con el pedido preparado. Para que funcione, cambia el número en el Administrador.

7) FACEBOOK / INSTAGRAM
Son enlaces directos a tus perfiles/página. No requiere API.

8) PAGOS
Esta V2 NO cobra tarjetas directamente. Envía el pedido a WhatsApp. Para pagos online reales hay que integrar un proveedor de pagos y sus credenciales.

9) SEGURIDAD
No pongas contraseñas, claves API, tokens privados ni secretos en script.js. Este sitio es estático y todo su JavaScript es visible al visitante.

10) PRUEBA ANTES DE PUBLICAR
Abre index.html -> agrega productos -> carrito -> enviar por WhatsApp.
Luego abre admin/index.html -> cambia un producto -> vuelve a la tienda y verifica.
