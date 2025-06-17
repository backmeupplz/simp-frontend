import miniAppSdk from '@farcaster/frame-sdk'
import { MiniAppContext } from 'MiniAppContext'
import { useContext, useMemo } from 'preact/hooks'
import { Terminal } from 'react-terminal-emulator-ui'

const initialFeed = `Welcome to StupidInternetMoneyProtocol ($SIMP)! The larger the stake, the more it rewards.

available commands: help, info, airdrop, buy, participate.

when $SIMP launches, you will only need the "participate" command.`

export default function () {
  const { ready, context } = useContext(MiniAppContext)
  const commands = useMemo(
    () => [
      {
        command: 'help',
        result: (
          <div>
            <p>Available commands:</p>
            <ul>
              <li>
                <b>help</b>: List of available commands
              </li>
              <li>
                <b>info</b>: Information about $SIMP
              </li>
              <li>
                <b>airdrop</b>: Information about the airdrop
              </li>
              <li>
                <b>buy</b>: Buy $SIMP
              </li>
              <li>
                <b>participate</b>: Participate in the $SIMP ecosystem
              </li>
            </ul>
          </div>
        ),
      },
      {
        command: 'info',
        result: (
          <div>
            <p>
              Only 69,420,000 $SIMP will ever exist. 3% to the team. 17% to the
              airdrops. 10% contingency fund locked behind 2/3 multisig between{' '}
              <code>borodutch.eth</code>, <code>vitalik.eth</code>, and{' '}
              <code>jessepollak.eth</code>. The rest goes into the liquidity
              pool.
            </p>
            <ul>
              <li>
                ca: <code>0x568664cb237D2a730e9B8C11850Ec62B633C5C45</code>
              </li>
              <li>
                <a
                  className="underline"
                  href={
                    !ready && !context
                      ? 'https://dexscreener.com/base/0x568664cb237D2a730e9B8C11850Ec62B633C5C45'
                      : undefined
                  }
                  onClick={() => {
                    if (ready && context) {
                      return miniAppSdk.actions.openUrl(
                        'https://dexscreener.com/base/0x568664cb237D2a730e9B8C11850Ec62B633C5C45'
                      )
                    }
                  }}
                >
                  Dex
                </a>
                ,{' '}
                <a
                  className="underline"
                  href={
                    !ready && !context
                      ? 'https://basescan.org/address/0x568664cb237D2a730e9B8C11850Ec62B633C5C45'
                      : undefined
                  }
                  onClick={() => {
                    if (ready && context) {
                      return miniAppSdk.actions.openUrl(
                        'https://basescan.org/address/0x568664cb237D2a730e9B8C11850Ec62B633C5C45'
                      )
                    }
                  }}
                >
                  Exp
                </a>
                ,{' '}
                <a
                  className="underline"
                  href={
                    !ready && !context
                      ? 'https://farcaster.xyz/simpdotcom'
                      : undefined
                  }
                  onClick={() => {
                    if (ready && context) {
                      return miniAppSdk.actions.openUrl(
                        'https://farcaster.xyz/simpdotcom'
                      )
                    }
                  }}
                >
                  Farcaster
                </a>
                ,{' '}
                <a
                  className="underline"
                  href={
                    !ready && !context
                      ? 'https://x.com/sinternetmoneyp/'
                      : undefined
                  }
                  onClick={() => {
                    if (ready && context) {
                      return miniAppSdk.actions.openUrl(
                        'https://x.com/sinternetmoneyp/'
                      )
                    }
                  }}
                >
                  X
                </a>
              </li>
            </ul>
          </div>
        ),
      },
      {
        command: 'airdrop',
        result: (
          <div>
            <p>
              The first airdrop will commence on June 20, 2025, at 09:00 LA
              time. This airdrop will be the first of many. It will happen as a
              native Farcaster airdrop. The eligibility criteria are secret.
              Farcaster folks don't sell the airdrops, and seeding the network
              with participants is crucial.
            </p>
            <p>
              Then, the airdrops will be proportional to: $SIMP holdings, number
              of Farcaster and X posts with "$SIMP" in them. Posts containing
              "What's $SIMP?" get 2x the weight. $SIMP trading volume. And a few
              secret variables. Obviously, the criteria will be subject to
              change.
            </p>
          </div>
        ),
      },
      {
        command: 'participate',
        result: (
          <div>
            <p>
              [REDACTED] [REDACTED] [REDACTED] [REDACTED] [REDACTED] [REDACTED]
              [REDACTED] [REDACTED] [REDACTED] [REDACTED] [REDACTED] [REDACTED]
              [REDACTED] [REDACTED] [REDACTED]
            </p>
          </div>
        ),
      },
      {
        command: 'buy',
        result:
          ready && context ? (
            <div>
              <p>The swap UI should've opened!</p>
            </div>
          ) : (
            <div>
              <p>
                You can buy $SIMP on Uniswap{' '}
                <a
                  className="underline"
                  href="https://app.uniswap.org/swap?outputCurrency=0x568664cb237D2a730e9B8C11850Ec62B633C5C45&chain=base"
                >
                  here
                </a>{' '}
                (should have opened in a new tab).
              </p>
            </div>
          ),
        sideEffect: () => {
          if (ready && context) {
            return miniAppSdk.actions.swapToken({
              buyToken:
                'eip155:8453/erc20:0x568664cb237D2a730e9B8C11850Ec62B633C5C45',
            })
          }
          window.open(
            'https://app.uniswap.org/swap?outputCurrency=0x568664cb237D2a730e9B8C11850Ec62B633C5C45&chain=base',
            '_blank'
          )
        },
      },
    ],
    [ready, context]
  )
  return (
    <div className="flex h-screen w-screen p-2 bg-black">
      <Terminal
        commands={commands}
        userName={
          ready && context?.user.username ? context.user.username : 'anon'
        }
        machineName="simp"
        initialFeed={initialFeed}
      />
    </div>
  )
}
