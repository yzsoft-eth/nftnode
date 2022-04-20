docker run --name yz-chain-agent-node -d \
-v /data/yz-node/data:/yzchain/data \
-v /data/yz-node/wallet:/root/eosio-wallet \
-p 8888:8888 -p 9010:9010 -p 8900:8900 \
yz-chain-nft:v2.1.0 /bin/bash -c "nodenft --genesis-json  /yzchain/config/genesis.json --data-dir /yzchain/data/ --config-dir /yzchain/config/ --disable-replay-opts && ksdnft --http-server-address=0.0.0.0:8900 --http-validate-host 0 --verbose-http-errors --unlock-timeout=9999999"