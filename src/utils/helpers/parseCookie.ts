export default function parseCookie(cookie: string): { [key: string]: string } {
  return cookie.split("; ").reduce((prev, current) => {
    const [name, ...value] = current.split("=");
    // @ts-ignore
    prev[name] = value.join("=");
    return prev;
  }, {});
}
