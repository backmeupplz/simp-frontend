import miniAppSdk, { Context } from '@farcaster/frame-sdk'
import {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from 'preact/compat'

export const MiniAppContext = createContext<{
  context: Context.FrameContext | null
  ready: boolean
}>({ context: null, ready: false })

export default function MiniAppContextProvider({
  children,
}: PropsWithChildren) {
  const [context, setContext] = useState<Context.FrameContext | null>(null)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    async function loadContext() {
      const context = await miniAppSdk.context
      setContext(context)
      await miniAppSdk.actions.ready()
      setReady(true)
    }
    void loadContext()
  }, [setReady, setContext])
  return (
    <MiniAppContext.Provider value={{ context, ready }}>
      {children}
    </MiniAppContext.Provider>
  )
}
