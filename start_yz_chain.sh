docker run --name yz-chain-agent-node -d \
-p 8888:8888 -p 9876:9876 \
eos-nft:v1:v1 /bin/bash -c "nodeos --genesis-json  /yzchain/config/genesis.json --data-dir /yzchain/data/ --config-dir /yzchain/config/ --disable-replay-opts"