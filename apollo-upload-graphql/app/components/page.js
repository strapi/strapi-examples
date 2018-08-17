import Head from 'next/head'

const Page = ({ title, children }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#22a699" />
      <link rel="manifest" href="/static/manifest.webmanifest" />
      <link rel="icon" sizes="192x192" href="/static/apollo-icon.png" />
      <link rel="apple-touch-icon" href="/static/apollo-launcher-icon.png" />
    </Head>
    {children}
    <style jsx global>{`
      html {
        font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial,
          sans-serif;
        color: white;
        background-color: #22a699;
      }
      body {
        margin: 2em;
      }
    `}</style>
  </div>
)

export default Page
