const Section = ({ heading, children }) => (
  <section>
    <h1>{heading}</h1>
    {children}
    <style jsx>{`
      h1 {
        margin-top: 1.5em;
        margin-bottom: 0.5em;
        font-size: 120%;
      }
    `}</style>
  </section>
)

export default Section
