# comision41070-Coder-Montalbetti

# E-commerce LaChauffer
## E-commerce generico Version 1.0
[![Netlify Status](https://api.netlify.com/api/v1/badges/fc31b6e1-d5e0-48ce-ab4e-0441b535429a/deploy-status)](https://app.netlify.com/sites/chimerical-cannoli-089be7)https://chimerical-cannoli-089be7.netlify.app

## Demo
https://github.com/germanClaudio/comision41070-Coder-Montalbetti/blob/master/Demo%20E-Commerce%2018-8-2022.MP4


https://user-images.githubusercontent.com/94622380/185395160-8a3e1e12-f148-42dc-976f-143e895c80dd.mp4


## Descripción

E-commerce generico que permite navegacion por categoria de detales y global. Elegir items donde muetra descripcion de productos y aumentar/disminiur cantidad del mismo item a comprar y adjuntar al carrito de compras. En el carrito se listan los detalles con sus decripciones y cantiddades elegidas. Se puede eliminar de a un item o elimnar el carrito completo con confirmaciones. Además, introduiir datos de usuario por Formulario, chequear estos datos y generar order. Por ultimo, generar pdf que se descarga a la maquina del usuario con todos los datos de la orden. Esta SPA está conectada a la BBDD de Firebase donde se alojan los datos de los productos y el stock de los mismos, a su vez, es donde se alojan las ordenes generadas por el usuaio en sus compras.

## Depencences

- @emotion/react: version: 11.9.3  (Libreria diseñada para escritura de estilos en css con JavaScript)
- @emotion/styled: version: 11.9.3 (Creacion de componentes en React con estilos)
- @mui/icons-material: version: 5.8.4 (Iconos listos para usar en React)
- @mui/material: version: 5.8.6 (Libreria de componentes listos para usar en React)
- bootstrap: version: 5.1.3 (Herramienta de frontend con plugins JavaScript)
- firebase: version: 9.9.1 (Firebase es una plataforma de BBDD NoSql para almacenamiento de datos. Mantenido por Google)
- jspdf: version: 2.5.1 (Creacion de documentos en PDF en JavaScript)
- react: version: 18.0.0 (Biblioteca Javascript de código abierto diseñada para crear interfaces de usuario con el objetivo de facilitar el desarrollo de aplicaciones en una sola página. Es mantenido por Facebook y la comunidad de software libre)
- react-bootstrap: version: 2.4.0 (Componentes listos para usar con estilos)
- react-dom: version: 18.0.0 (El paquete react-dom proporciona métodos específicos del DOM que pueden ser utilizados en el nivel más alto de la aplicación como una vía de escape del modelo de React)
- react-router-dom: version: 6.3.0 (React Router DOM es un paquete npm que permite implementar ruteo dinámico en una app web )
- sweetalert2: version: 11.4.20 (Popup y alerts, responsivas, customizable y accesible (WAI-ARIA) que reemplaza los boxes popups tradionales de los navegadoes)

## DevDepencences
- @types/react: version: 18.0.0 (Representa cualquier nodo que puede ser renderizado en una aplicacion de React)
- @types/react-dom: version: 18.0.0 (Paquete de npm que contine definiciones types para React (react-dom))
- @vitejs/plugin-react: version: 1.3.0 (Vite pluging para proyectos de React)
- vite: version: 2.9.9 (Vite es una herramienta de frontend para crear proyectos de forma agnóstica (sin atarse a ningún framework concreto) y que su desarrollo y construcción final sea lo más sencilla y cómoda posible. Está desarrollada por Evan You, el creador de Vue.)


## Avance Proyecto

Proximas funcionalidades a implementar en el E-Commerce

- Agregar pantalla landing, Logeo de usuarios y administrados
- Nuevas funcionalidades para administrador (agregado de nuevos productos, actualización de stock)
- Agregado de filtros (por precio, valores maximos y minimos, capacidades, etc.)
