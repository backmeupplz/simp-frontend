import 'index.css'
import MiniAppContextProvider from 'MiniAppContext'
import { render } from 'preact'
import Terminal from 'Terminal'

render(
  <MiniAppContextProvider>
    <Terminal />
  </MiniAppContextProvider>,
  document.getElementById('root') as Element
)
