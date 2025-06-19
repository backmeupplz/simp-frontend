import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'index.css'
import MiniAppContextProvider from 'MiniAppContext'
import { render } from 'preact'
import { Toaster } from 'react-hot-toast'
import Terminal from 'Terminal'
import { base } from 'viem/chains'
import { createConfig, http, WagmiProvider } from 'wagmi'

const queryClient = new QueryClient()

const wagmiConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
})

render(
  <QueryClientProvider client={queryClient}>
    <WagmiProvider config={wagmiConfig}>
      <MiniAppContextProvider>
        <Toaster position="top-center" />
        <Terminal />
      </MiniAppContextProvider>
    </WagmiProvider>
  </QueryClientProvider>,
  document.getElementById('root') as Element
)
