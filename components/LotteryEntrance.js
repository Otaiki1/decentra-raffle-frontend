import { useWeb3Contract } from "react-moralis";
import abi from "../constants/abi.json"

export default function LotteryEntrance(){
    //Enter lottery Button Function
    const { runContractFunction: enterRaffle } = useWeb3Contract({
        abi: abi,
        contractAddress: "0xa42FaE009b4656a7DD32a59033aac0999B2b466f",
        functionName: "enterRaffle",
        msgValue: "100000000000000000",//0.1 eth
        params: {}
    })

    return(
        <div>
            <button class="rounded ml-auto font-bold bg-blue-500 mt-4 text-white p-2" onClick={async() => {
               await enterRaffle();
            }}>
                Enter Lottery
            </button>
        </div>
    )
}