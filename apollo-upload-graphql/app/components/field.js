const Field = ({ children }) => (
  <label>
    {children}
    <style jsx>{`
      label {
        display: block;
        margin-bottom: 0.5em;
      }
    `}</style>
  </label>
)

export default Field
