declare namespace Icon {
  export interface Props extends React.HTMLAttributes<any> {
    type: 'import' | 'export' | 'add' | 'down' | 'up'
    size?: number
  }
}