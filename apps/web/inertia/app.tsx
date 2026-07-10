import "virtual:uno.css"
import "./css/app.css"
import { client } from "./client"
import Layout from "~/layouts/default"
import { type Data } from "@generated/data"
import { createRoot } from "react-dom/client"
import { createInertiaApp } from "@inertiajs/react"
import { TuyauProvider } from "@adonisjs/inertia/react"
import { type ComponentType, type ReactElement } from "react"

const appName = import.meta.env.VITE_APP_NAME || "AdonisJS"
type InertiaPage = ComponentType & {
  layout?: (page: ReactElement<Data.SharedProps>) => ReactElement
}

createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),
  resolve: (name) => {
    const pages = import.meta.glob<{ default: InertiaPage }>("./pages/**/*.tsx", { eager: true })
    const resolvedPage = pages[`./pages/${name}.tsx`]!

    resolvedPage.default.layout = resolvedPage.default.layout || ((pageElement) => <Layout>{pageElement}</Layout>)

    return resolvedPage
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <TuyauProvider client={client}>
        <App {...props} />
      </TuyauProvider>
    )
  },
  progress: {
    color: "#4B5563",
  },
})
