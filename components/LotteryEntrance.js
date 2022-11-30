import { useMoralis, useWeb3Contract } from "react-moralis";
import abi from "../constants/abi.json";
import { useState, useEffect } from "react";

const CONTRACT_ADDRESS = "0xa42FaE009b4656a7DD32a59033aac0999B2b466f"

export default function LotteryEntrance(){

    const[recentWinner, setRecentWinner] = useState("0");
    const[ numPlayers, setNumPlayers] = useState("0");
    const{ isWeb3Enabled } = useMoralis();

    //Enter lottery Button Function
    const { runContractFunction: enterRaffle } = useWeb3Contract({
        abi: abi,
        contractAddress: CONTRACT_ADDRESS,
        functionName: "enterRaffle",
        msgValue: "100000000000000000",//0.1 eth
        params: {}
    })
    
    // ViewFunction
    const { runContractFunction: getRecentWinner} = useWeb3Contract({
        abi: abi,
        contractAddress: CONTRACT_ADDRESS,
        functionName: "s_recentWinner",
        params: {},
    })

    useEffect(() => {

        async function updateUI(){
            const recentWinnerFromCall = await getRecentWinner();
            console.log("The recent winner from call is___---", recentWinnerFromCall)
            setRecentWinner(recentWinnerFromCall);
        }
        if(isWeb3Enabled){
            updateUI()
        }
    }, []);

    return(
        <div>
            <button className="rounded ml-auto font-bold bg-blue-500 mt-4 text-white p-2" onClick={async() => {
               await enterRaffle();
            }}>
                Enter Lottery
            </button>
            <p>The recent winner is :{recentWinner}</p>
        </div>
    )
}