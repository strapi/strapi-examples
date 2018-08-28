export const Table = ({ thead, tbody }) => (
  <div>
    <table>
      <thead>{thead}</thead>
      <tbody>{tbody}</tbody>
    </table>
    <style jsx>{`
      div {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        -ms-overflow-style: -ms-autohiding-scrollbar;
      }
      table {
        border-spacing: 0;
        padding: 1em 0;
        text-align: left;
      }
    `}</style>
  </div>
)

export const Head = ({ children }) => (
  <th>
    {children}
    <style jsx>{`
      th {
        padding: 0.3em 0.5em;
      }
    `}</style>
  </th>
)

export const Cell = ({ children }) => (
  <td>
    {children}
    <style jsx>{`
      td {
        padding: 0.3em 0.5em;
        vertical-align: top;
        white-space: nowrap;
      }
    `}</style>
  </td>
)
