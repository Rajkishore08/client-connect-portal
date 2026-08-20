declare module "@tanstack/react-start/server" {
  export function createAPIFileRoute(path: string): (options: any) => any;
}

declare module "@tanstack/react-start/api" {
  export function createAPIFileRoute(path: string): (options: any) => any;
}
