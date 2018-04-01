import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { injectGlobal } from 'styled-components'

import styledNormalize from 'styled-normalize'
injectGlobal`
${styledNormalize}
:root{
    font-family: 'Roboto', sans-serif;
}
`
ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
