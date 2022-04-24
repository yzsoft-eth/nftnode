docker run --name yz-chain-agent-wallet -d \
-v /data/yz-node/wallet:/root/eosio-wallet \
-p 8900:8900 \
yz-chain-nft:v2.1.0 /bin/bash -c "ksdnft --plugin eosio::http_plugin --plugin eosio::wallet_api_plugin --http-server-address=0.0.0.0:8900 --http-validate-host 0 --verbose-http-errors --unlock-timeout=9999999"
