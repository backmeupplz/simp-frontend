import miniAppSdk from '@farcaster/frame-sdk'
import { farcasterFrame } from '@farcaster/frame-wagmi-connector'
import contractAddress from 'contractAddress'
import InitialFeedEnding from 'InitialFeedEnding'
import { MiniAppContext } from 'MiniAppContext'
import { useContext, useMemo } from 'preact/hooks'
import toast from 'react-hot-toast'
import simpAbi from 'simpAbi'
import { Terminal } from 'TerminalComponent'
import { createPublicClient, erc20Abi, formatUnits, http } from 'viem'
import { base } from 'viem/chains'
import { useAccount, useConnect, useWriteContract } from 'wagmi'

const publicClient = createPublicClient({
  chain: base,
  transport: http(),
})

const initialFeed = `Welcome to StupidInternetMoneyProtocol ($SIMP)! The larger the stake, the more it rewards. The future and the past of crypto: many play, fewer get much more! Available commands: help, info, airdrop, buy, rules, participate.`

export default function () {
  const { ready, context } = useContext(MiniAppContext)
  const account = useAccount()
  const { connectors, connectAsync } = useConnect()
  const { writeContractAsync } = useWriteContract()

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
                <b>rules</b>: Rules of the game
              </li>
              <li>
                <b>participate</b>: Purchase a ticket with $SIMP
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
                  target="_blank"
                  className="underline"
                  href={
                    ready && !context
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
                  target="_blank"
                  className="underline"
                  href={
                    ready && !context
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
                  target="_blank"
                  className="underline"
                  href={
                    ready && !context
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
                  target="_blank"
                  className="underline"
                  href={
                    ready && !context
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
        command: 'rules',
        result: (
          <div>
            <p>
              The rules are simple: you get tickets by sending the participate
              command, then at random dates and random times the great random
              decides 50 lucky people who split the pot. There is no need to
              take any actions after you get the ticket, randomness is fully
              automated.
            </p>
            <ul>
              <li>
                <b>Legendary Gem</b>: 1 winner, 29% of the pot
              </li>
              <li>
                <b>Mythic Duo</b>: 2 winners, each gets 10% (20% total)
              </li>
              <li>
                <b>Rare Relics</b>: 5 winners, each gets 4% (20% total)
              </li>
              <li>
                <b>Curious Coins</b>: 10 winners, each gets 1.5% (15% total)
              </li>
              <li>
                <b>Lucky Loot</b>: 32 winners, each gets 0.5% (16% total)
              </li>
              <li>10% of the pot always goes to the team</li>
            </ul>
            <p>
              Remember, this is a game, and while there are rewards, there are
              also risks involved. Play responsibly!
            </p>
          </div>
        ),
      },
      {
        command: 'participate',
        result: (
          <div>
            <p>
              You should see the popup to get a ticket with $SIMP. Make sure you
              have enough $SIMP or transaction will fail!
            </p>
            <p>Remember, you can get as many tickets as you want.</p>
            <p>
              You will not see your tickets anywhere, and there's no next step
              required, the great random will distribute the pot at the best
              date and time in the future.
            </p>
          </div>
        ),
        sideEffect: async () => {
          if (!ready) {
            toast.error("Looks like we're not ready yet!")
            return
          }
          if (context) {
            await connectAsync({ connector: farcasterFrame() })
          } else {
            if (!connectors[0]) {
              toast.error(
                "Can't find a connected wallet! Try on desktop or inside a Farcaster mini app or a mobile wallet built-in browser."
              )
              return
            }
            if (!account.isConnected) {
              await connectAsync({ connector: connectors[0] })
            }
          }
          try {
            await writeContractAsync({
              address: contractAddress,
              abi: simpAbi,
              functionName: 'enterDraw',
              args: [1n],
            })
            toast.success(
              'Participation successful! You will not see tickets anywhere, but rest assured: you got it.'
            )
            const balanceData = await publicClient.readContract({
              address: contractAddress,
              abi: erc20Abi,
              functionName: 'balanceOf',
              args: [contractAddress],
            })
            if (context) {
              await miniAppSdk.actions.composeCast({
                text: `I just participated in the $SIMP! Let's see if I win! The pot is ${formatUnits(balanceData, 18)} $SIMP 🔥🔥🔥`,
                close: false,
                embeds: ['https://stupidinternetmoneyprotocol.com'],
              })
            } else {
              const url = encodeURIComponent(
                'https://stupidinternetmoneyprotocol.com'
              )
              const text = encodeURIComponent(
                `I just participated in the $SIMP! Let's see if I win! The pot is ${formatUnits(balanceData, 18)} $SIMP 🔥🔥🔥`
              )
              window.open(
                `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
                '_blank'
              )
            }
          } catch (error) {
            console.error('Error participating:', error)
            toast.error(
              'An error occurred while trying to participate. Please check your wallet and try again.'
            )
          }
        },
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
                  target="_blank"
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
    [
      ready,
      context,
      connectAsync,
      connectors,
      account.isConnected,
      writeContractAsync,
    ]
  )
  return (
    <div className="flex h-screen w-screen p-2 bg-black break-words">
      <Terminal
        commands={commands}
        userName={
          ready && context?.user.username ? context.user.username : 'anon'
        }
        initialFeedEnding={<InitialFeedEnding />}
        machineName="simp"
        initialFeed={initialFeed}
      />
    </div>
  )
}
