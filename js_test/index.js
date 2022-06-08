const { Api, JsonRpc, RpcError } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');
const fetch = require('node-fetch');
const { TextEncoder, TextDecoder } = require('util');


const NftTransfer = async (fromAccount, toAccount, quantityNft, memo, code, pkey) => {
    const transferSignatureProvider = new JsSignatureProvider([pkey]);
    const rpc = new JsonRpc("http://127.0.0.1:8888", { fetch });

    const transferApi = new Api({
        rpc,
        signatureProvider: transferSignatureProvider, 
        textDecoder: new TextDecoder(), 
        textEncoder: new TextEncoder() 
    });

    const action = {
        account: code,
        name: 'extransfer',
        authorization: [{
            actor: fromAccount,
            permission: 'active',
        }],
        data: {
            from:     fromAccount,
            to:       toAccount,
            quantity: quantityNft,
            memo:     memo,
        },
    };

    try {
        let result = await transferApi.transact(
            { actions: [action] },
            { blocksBehind: 3, expireSeconds: 30 },
        )
        return result["transaction_id"]
    } catch (err) {
        console.error('\nCaught exception: ' + err);
        if (err instanceof RpcError){
            console.error("details: " + JSON.stringify(err.details, null, 2));
        }
        throw err;
    }
}

(async () => {
    const fromAccoun = "cczsgt111345"
    const toAccount = "youdunpp"
    const quantityNft ="1.0000000 NFTC"
    const code = "nftio.nftc"
    const memo = "Buy NFTC"
    const private_key = "5JpEwvKvzVxnEBznpP2RcnefQWy3mwHHabeT6JKNGx11Txd4ENv"
    const trx_id = await NftTransfer(fromAccoun, toAccount, quantityNft, memo, code, private_key)
    console.log(`private_key=${trx_id}`)
})();