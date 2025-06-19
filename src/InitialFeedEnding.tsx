import contractAddress from 'contractAddress'
import simpAbi from 'simpAbi'
import { erc20Abi, formatUnits } from 'viem'
import { useReadContract } from 'wagmi'
import { base } from 'wagmi/chains'

function formatNumber(n: string) {
  return n.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export default function InitialFeedEnding() {
  const { data: balanceData } = useReadContract({
    address: contractAddress,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [contractAddress],
    chainId: base.id,
    query: {
      refetchInterval: 1000 * 10,
    },
  })
  const { data: entryData } = useReadContract({
    address: contractAddress,
    abi: simpAbi,
    functionName: 'currentDrawEntryFee',
    chainId: base.id,
  })
  return (
    <div>
      <p>
        Current pot is{' '}
        {balanceData !== undefined
          ? formatNumber(formatUnits(balanceData, 18))
          : '~~~'}{' '}
        $SIMP.
      </p>
      <p>
        Entry cost is{' '}
        {entryData !== undefined
          ? formatNumber(formatUnits(entryData as bigint, 18))
          : '~~~'}{' '}
        $SIMP
      </p>
    </div>
  )
}
