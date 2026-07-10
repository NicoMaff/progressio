import { client } from "~/client"
import Layout from "~/layouts/default"
import { type Data } from "@generated/data"
import ReactDOMServer from "react-dom/server"
import { createInertiaApp } from "@inertiajs/react"
import { type Page } from "@inertiajs/core"
import { TuyauProvider } from "@adonisjs/inertia/react"
import { type ComponentType, type ReactElement } from "react"

type InertiaPage = ComponentType & {
  layout?: (page: ReactElement<Data.SharedProps>) => ReactElement
}

export default function render(initialPage: Page<Data.SharedProps>) {
  return createInertiaApp({
    page: initialPage,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = import.meta.glob<{ default: InertiaPage }>("./pages/**/*.tsx", { eager: true })
      const resolvedPage = pages[`./pages/${name}.tsx`]!

      resolvedPage.default.layout = resolvedPage.default.layout || ((pageElement) => <Layout>{pageElement}</Layout>)

      return resolvedPage
    },
    setup: ({ App, props }) => {
      return (
        <TuyauProvider client={client}>
          <App {...props} />
        </TuyauProvider>
      )
    },
  })
}
