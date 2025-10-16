// Declarations for importing CSS files in TypeScript
// Supports both global side-effect imports and CSS modules (*.module.css)

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.css' {
  // Allow importing plain CSS as a side-effect (no typing information)
  const css: { [key: string]: string };
  export default css;
}
