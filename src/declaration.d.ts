declare module '*.jpg' {
  const value: string;
  export = value;
}

declare module '*.png' {
  const value: string;
  export = value;
}

interface CardInfo {
  id: string,
  description: string,
  [key: string]: string | boolean,
}
