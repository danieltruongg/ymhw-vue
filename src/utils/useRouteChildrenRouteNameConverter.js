export default function useRouteNameArrayConverter(routeObject) {
  return routeObject.children.reduce((acc, child) => {
    const key =
      child.path === ''
        ? 'main'
        : child.path
            .replace(/[-/]([a-z])/g, (g) => g[1].toUpperCase())
            .replace(/^\w/, (c) => c.toLowerCase())
    acc[key] = child.name
    return acc
  }, {})
}
