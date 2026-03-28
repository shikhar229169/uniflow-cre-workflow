import { type Runtime, encodeCallMsg, EVMClient, LAST_FINALIZED_BLOCK_NUMBER } from "@chainlink/cre-sdk";
import { bytesToHex, decodeFunctionResult, encodeFunctionData, erc20Abi, zeroAddress } from "viem";
import { IConfig } from "../interfaces/IConfig";

export const getERC20Decimals = (token: string, runtime: Runtime<IConfig>, evmClient: EVMClient) => {
    const callData = encodeFunctionData({
        abi: erc20Abi,
        functionName: "decimals",
    });

    const result = evmClient.callContract(runtime, {
        call: encodeCallMsg({
            from: zeroAddress,
            to: token as `0x${string}`,
            data: callData,
        }),
        blockNumber: LAST_FINALIZED_BLOCK_NUMBER,
    }).result();

    const decimals = decodeFunctionResult({
        abi: erc20Abi,
        functionName: 'decimals',
        data: bytesToHex(result.data)
    });

    return decimals;
}