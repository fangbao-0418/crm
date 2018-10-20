import React from 'react'
import Bundle from '@/components/Bundle'
import * as loadFile from './load-file'
const modules = {}
for (const key in loadFile) {
  ((k) => {
    if (k) {
      const Component = (props) => {
        return (
          <Bundle
            load={loadFile[k]}
          >
            {(C) => <C {...props}/>}
          </Bundle>
        )
      }
      modules[k.replace('load', '')] = Component
    }
  })(key)
}
export default modules
