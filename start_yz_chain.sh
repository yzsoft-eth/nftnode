docker run --name yz-chain-agent -d \
-p 8888:8888 -p 9876:9876 \
yzsoft/yz-chain:v1.0.0 /bin/bash -c "nodeos --genesis-json  /yzchain/config/genesis.json --data-dir /yzchain/data/ --config-dir /yzchain/config/"