# 软件环境
1、ubuntu 16.04以上

2、安装git和docker

# 拉取仓库
1、拉取打包源文件项目
git clone https://github.com/yzsoft-eth/nftnode.git

# 打包 Dock File
1、进入git下的项目目录nftnode下的打包目录eos-nft/docker

2、执行打包命令：docker build -t yz-chain-nft:v2.1.0 .

# 准备宿主机目录挂载到容器（说明：要保存有一定的存贮空间>=100G）
1、节点数据目录：mkdir -p /data/yz-node/data

2、钱包目录：mkdir -p /data/yz-node/wallet

# 启动运行docker镜像
1、回到上上级目录，即项目目录nftnode

2、执行赋予脚本文件执行权限命令：sudo chmod +x ./start_yz_chain.sh

3、执行脚本命令：./start_yz_chain.sh

4、docker正常运行后，如需提供对外的rpc及p2p通迅，请开启宿主机防火墙的8888和9010端口

# 命令行命令
1、和链交互、管理钱包：clenft

2、区块产生、操作链API：nodenft

3、和钱包交互，用于存储私钥：ksdnft

# 钱包 RPC Apis 操作 #https://developers.fioprotocol.io/docs/chain/fio-wallet

URL：http://127.0.0.1:8900/v1/wallet

1、新建钱包：
接口地址：/create
调用方法：POST
调用参数：钱包名称
返回值：钱包密码
示例：
curl -X POST   http://127.0.0.1:8900/v1/wallet/create   -H 'Cache-Control: no-cache'   -H 'Content-Type: application/json'  -d '"yzagent"'
# 返回钱包密码字符串，请妥善保证，用于后续的钱包解锁
"PW5*******************************"

2、打开已存在钱包：
接口地址：/open
调用方法：POST
调用参数：钱包名称
返回值：成功，返回空括号
示例：
curl -X POST   http://127.0.0.1:8900/v1/wallet/open   -H 'Cache-Control: no-cache'   -H 'Content-Type: application/json'  -d '"yzagent"'
# 打开成功，返回空括号
{}

3、锁定钱包：
接口地址：/lock
调用方法：POST
调用参数：钱包名称
返回值：成功，返回空括号
示例：
示例：
curl -X POST   http://127.0.0.1:8900/v1/wallet/lock   -H 'Cache-Control: no-cache'   -H 'Content-Type: application/json'  -d '"yzagent"'
# 锁定成功，返回空括号
{}

4、锁定所有已解锁的钱包：
接口地址：/lock_all
调用方法：GET
调用参数：无
返回值：成功，返回空括号
示例：
curl http://127.0.0.1:8900/v1/wallet/lock_all
# 锁定成功，返回空括号
{}

5、解锁钱包：
接口地址：/unlock
调用方法：POST
调用参数：钱包名称，钱包密码（上面新建钱包时返回的密码字符串）
返回值：成功，返回空括号
示例：
curl -X POST http://127.0.0.1:8900/v1/wallet/unlock   -H 'Cache-Control: no-cache'   -H 'Content-Type: application/json'  -d '["yzagent", "PW5*******************************"]'
# 锁定成功，返回空括号
{}

6、导入私钥：
接口地址：/import_key
调用方法：POST
调用参数：钱包名称，私钥
返回值：成功，返回空括号
示例：
curl -X POST http://127.0.0.1:8900/v1/wallet/import_key -H 'Cache-Control: no-cache'   -H 'Content-Type: application/json'  -d '["yzagent", "私钥"]'
# 成功，返回空括号
{}

7、移除钱包私钥：
接口地址：/remove_key 
调用方法：POST
调用参数：钱包名称，钱包密码，私钥
返回值：成功，返回空括号
示例：
curl -X POST http://127.0.0.1:8900/v1/wallet/remove_key -H 'Cache-Control: no-cache'   -H 'Content-Type: application/json'  -d '["yzagent", "钱包密码", "私钥"]'
# 成功，返回空括号
{}

8、创建公私密钥对并塞入钱包：
接口地址：/create_key 
调用方法：POST
调用参数：钱包名称，密钥类型（指定为K1）
返回值：返回与新私钥关联的 NFT 公钥
示例：
curl -X POST http://127.0.0.1:8900/v1/wallet/create_key  -H 'Cache-Control: no-cache'   -H 'Content-Type: application/json'  -d '["yzagent", "K1"]'
# 成功，返回关联的 NFT 公钥
"NFT*******************************"
说明：
成功建立公私钥对后，请将上述以NFT开头的公钥以及需要创建的联盟账号名提供给我们，由我们平台创建并激活联盟账号

9、列表显示已打开的钱包：
接口地址：/list_wallets 
调用方法：GET
调用参数：无
返回值：返回打开的钱包数组
示例：
curl http://127.0.0.1:8900/v1/wallet/list_wallets
# 成功，返回打开的钱包数组，钱包标有“*”代表此钱包已解锁
["yzagent *"]

10、列表显示所有解锁钱包的公钥/私钥对：
接口地址：/list_keys 
调用方法：POST
调用参数：钱包名称，钱包密码
返回值：返回钱包里的 NFT 公钥/私钥对数组
示例：
curl -X POST http://127.0.0.1:8900/v1/wallet/list_keys -H 'Cache-Control: no-cache' -H 'Content-Type: application/json'  -d '["yzagent", "钱包密码"]'
# 成功，返回钱包里的 NFT 公钥/私钥对数组
[["NFT*******************************","5JW*******************************"]]

11、列表显示钱包以 NFT 为前缀的公钥：
接口地址：/get_public_keys 
调用方法：POST
调用参数：钱包名称，钱包密码
返回值：返回钱包里以 NFT 为前缀的公钥数组
示例：
curl -X POST http://127.0.0.1:8900/v1/wallet/get_public_keys -H 'Cache-Control: no-cache'   -H 'Content-Type: application/json'  -d '["yzagent", "钱包密码"]'
# 成功，返回钱包里以 NFT 为前缀的公钥数组
[["NFT*******************************"]]

# 钱包及账号的操作 #https://developers.fioprotocol.io/docs/chain/fio-wallet
1、进入容器：docker exec -ti yz-chain-agent-node bash

2、创建钱包：clenft wallet create -n yzagent --to-console
   记录并保存下屏幕上显示的钱包密码（如：PW5********************bFE4Sw）   
   
3、创建公私密钥对并塞入钱包：clenft wallet create_key -n  yzagent
   Copy屏幕上显示以NFT开头的密钥对公钥（如：NFT********************DodH）
   
4、将上步的公钥以及需要创建的联盟账号名提供给我们，由我们平台创建及激活联盟账号

5、查看钱包中的密钥对，需要输入钱包密码解锁：clenft wallet private_keys -n yzagent
     执行上述命令后，按提示在password: 后输入钱包密码，可获取到钱包里全部的公私钥对
    
     password: [[
        
        "NFT****************************************************************",
        
        "5Hp****************************************************************"
        
    ]]

4、创建账号
     clenft system newaccount creater agentuser  NFT7Vy1pXqgycdPmPGct7T6tMPV6543jLkjMXbQdGB5ibkhk6DodH
5、成功创建账号后，请将账号名和公钥提供给我们，由我们激活。
    
6、退出docker容器，回到宿主机：exit

说明：上述各步操作，如提示钱包锁定，请使用命令解锁钱包：clenft wallet unlock -n yzagent --password PW5********************bFE4Sw


# 链api

域名：（除特别说明外，其它默认值）

        公网：nft.chinaqking.com/v1

        内网：127.0.0.1:8888/v1        

1、获取链当前区块的最新高度

调用url：/chain/get_info

调用方法：POST

调用参数：无

返回值：
   返回包含当前链区块最新高度的总体信息


   {
      
      "server_version": "节点版本",
      
      "head_block_num": "链头区块序号",
      
      "lase_irreversible_block_num": "不可逆区块号",
      
      "head_block_id": "链头区块ID",
      
      "head_block_time": "链头区块生成时间",
      
      "head_block_producer": "链头区块出块账号"
    
}

示例：

curl -X POST https://nft.chinaqking.com/v1/chain/get_info

2、查询指定区块的详细数据
调用url：/chain/get_block

调用方法：POST

调用参数：JSON Object


{

    "block_num_or_id": "字符串，要提取数据的区块序号或ID"
  
}

返回值：返回查询到描述指定区块数据的JSON对象

示例：

curl -X POST https://nft.chinaqking.com/v1/chain/get_block -d '{ 
    "block_num_or_id": "10444813"
}'


3、查询指定账号的描述信息
调用url：/chain/get_account

调用方法：POST

调用参数：JSON Object
{
  "account_name": "账号名称，字符串"
}

返回值：返回描述账号信息的JSON对象

示例：
curl -X POST https://nft.chinaqking.com/v1/chain/get_account -d '{ 
    "account_name": "yzsoft"
}'

4、查询指定账户的代币余额信息

调用url：/chain/get_currency_balance

调用方法：POST

调用参数：JSON Object

{

  "code":"代币合约托管账户名称，字符串",

  "account": "要查询账户的名称，字符串",

  "symbol": "要查询的代码符号，字符串"

}

返回值：返回指定账号所持有的代币余额

示例：
curl -X POST https://nft.chinaqking.com/v1/chain/get_currency_balance -d '{ 

  "code":"nftio.nftc",

  "account": "guang1234555",

  "symbol": "NFTC"

}'

5、查询历史交易数据

调用url：/history/get_transaction

调用方法：POST

调用参数：JSON Object

{

  "id": "交易ID，字符串"

}

返回值：查询到交易描述的JSON对象

示例：
curl -X POST https://nft.chinaqking.com/v1/history/get_transaction -d '{ 
    "id": "3f639408decbe6ac60d62dfcd13dd3fabdc867f206e56afd7ef203299b86a27a"
}'

6、提交交易数据到链上

调用url：/chain/push_transaction

调用方法：POST

调用参数：JSON Object

{
  "signatures"："签名数组",

  "compression"："是否压缩格式，布尔类型，默认值：false",

  "packed_context_free_data"："上下文无关的数据",

  "packed_tx"："序列化的交易数据"

}

返回值：调用的返回结果包含交易ID

示例：
curl -X POST https://nft.chinaqking.com/v1/chain/push_transaction -d '{ 
    ...
}'

返回结果：
{
    'transaction_id' = "交易ID"
}

7、充值/转账    // https://blog.csdn.net/akai9898/article/details/83447788

示例：youdunpp转账1个NFTC给cczsgt111345

7.1、交易信息JSON格式序列化为BIN格式字符串

curl -X POST http://127.0.0.1:8888/v1/chain/abi_json_to_bin -d '{

    "code":"nftio.nftc",

    "action":"extransfer",

    "args":{

        "from":"youdunpp",

        "to":"cczsgt111345",

        "quantity":"1.0000000 NFTC", 

        "memo":"buy/transfer"

    }

}'

return（获取到binargs）：{

    "binargs":"000000b54e9d34f550c8082164863f428096980000000000074e4654430000000c6275792f7472616e73666572"

}

7.2、获取当前最新的区块编号

curl -X POST http://127.0.0.1:8888/v1/chain/get_info

return（获取到head_block_num=13374721）：

{
    
    "server_version":"26a4d285",

    "chain_id":"4e020515db057c0f6ae6dfadb134d2252c2ea8a4e8fdd4d8fd4543d23f31e558",

    "head_block_num":13374721,
    
    "last_irreversible_block_num":13374681,
    
    "last_irreversible_block_id":"00cc14d998e177176e8b31c1ae5ab5340fda087efcd4f40f5d8a18945e11221f",
    
    "head_block_id":"00cc15011b64105ff3825544a8ac3bc4cc6947fc1fd6a1133a3151686107be6e",
    
    "head_block_time":"2022-04-26T03:44:03.000",
    
    "head_block_producer":"yznft",
    
    "virtual_block_cpu_limit":100000000,
    
    "virtual_block_net_limit":1048576000,
    
    "block_cpu_limit":99900,
    
    "block_net_limit":1048576,
    
    "server_version_string":"v2.1.0",
    
    "fork_db_head_block_num":13374721,
    
    "fork_db_head_block_id":"00cc15011b64105ff3825544a8ac3bc4cc6947fc1fd6a1133a3151686107be6e",
    
    "server_full_version_string":"v2.1.0-26a4d285d0be1052d962149e431eb81500782991-dirty",

    "last_irreversible_block_time":"2022-04-26T03:43:23.000"

}

7.3、获取区块详情

curl -X POST http://127.0.0.1:8888/v1/chain/get_block -d '{

    "block_num_or_id":"13374721"

}'

return（获取到timestamp=2022-04-26T03:44:03.000 和ref_block_prefix=1146454771）：

{
    
    "timestamp":"2022-04-26T03:44:03.000",

    "producer":"yznft",

    "confirmed":0,
    
    "previous":"00cc150026f294d4c996c2c75c7eaa567fc6df74dd3a9b157ee62258b83e9278",
    
    "transaction_mroot":"0000000000000000000000000000000000000000000000000000000000000000",
    
    "action_mroot":"dfc0ffba4bec1377bedd86430083b87b516749e602491f26e32c5d01474a0db9",
    
    "schedule_version":3,
    
    "new_producers":null,
    
    "producer_signature":"SIG_K1_KbcNgzm1d8QyMivYqDQoPLB8koTsEoWwNh4uVXUdYJ4kzK79hmMbTTiGM5WzGNYgFzknwPoVsWEwdPKXK7kKaPUSx2JjMn",
    
    "transactions":[],
    
    "id":"00cc15011b64105ff3825544a8ac3bc4cc6947fc1fd6a1133a3151686107be6e",
    
    "block_num":13374721,
    
    "ref_block_prefix":1146454771
    
}


7.4、查询/记录转账交易用户youdunpp的公钥（用于交易签名）：NFT692YHJvAKtbmS77N3uTS2vqc1b24jip6vyc24tM3zSprdUia2R

7.5、签署交易

调用URL：http://127.0.0.1:8900/v1/wallet/sign_transaction

调用参数：JSON Arrary

[{
    
    expiration："过期时间。这里将timestamp加上了60分钟。可以根据需要来增加时长",
    
    ref_block_num："前面获取的最新区块号",
    
    ref_block_prefix："前面获取的ref_block_prefix",
    
    account："合约名称。这里是转账NFTC，使用的是nftio.nftc",
    
    name："调用的合约方法。这里调用的是转账方法transfer",
    
    actor："调用者。这里相当于转账方",
    
    permission："使用的权限类型",
    
    data："之前生成的bin字符串",
    
    signatures："签署交易后生成的签名字符串",
    
}]

curl -X POST http://127.0.0.1:8900/v1/wallet/sign_transaction -d '[
    
    {
    
    "ref_block_num": 13374721,
    
    "ref_block_prefix": 1146454771,
    
    "expiration": "2022-04-26T06:44:03.000",
    
    "actions": [{
        
        "account": "nftio.nftc",
        
        "name": "extransfer",
        
        "authorization": [{
            
            "actor": "youdunpp",

            "permission": "active"

         }],

         "data": "000000b54e9d34f550c8082164863f428096980000000000074e4654430000000c6275792f7472616e73666572"

     }],

     "signatures": []

 },

 ["NFT692YHJvAKtbmS77N3uTS2vqc1b24jip6vyc24tM3zSprdUia2R"],

 "4e020515db057c0f6ae6dfadb134d2252c2ea8a4e8fdd4d8fd4543d23f31e558"

]'

return（获取signatures=["SIG_K1_JyMdDoP3TWEmddK4bqfFiqZfjMpquvrXmfV4WTunVHACib8aadEDc1Z1fGn4bgyXK6m2Ass824JDLTWLXpVFmEzhSYDsuK"]）：

{
    
    "expiration":"2022-04-26T06:44:03",
    
    "ref_block_num":5377,
    
    "ref_block_prefix":1146454771,
    
    "max_net_usage_words":0,
    
    "max_cpu_usage_ms":0,
    
    "delay_sec":0,
    
    "context_free_actions":[],
    
    "actions":[{
            
            "account":"nftio.nftc",
            
            "name":"extransfer",
            
            "authorization":[{
                
                "actor":"youdunpp",
                
                "permission":"active"
                    
            }],
            
            "data":"000000b54e9d34f550c8082164863f428096980000000000074e4654430000000c6275792f7472616e73666572"
    }],
    
    "transaction_extensions":[],
    
    "signatures":["SIG_K1_JyMdDoP3TWEmddK4bqfFiqZfjMpquvrXmfV4WTunVHACib8aadEDc1Z1fGn4bgyXK6m2Ass824JDLTWLXpVFmEzhSYDsuK"],
    
    "context_free_data":[]
    
}

7.6、提交交易

curl -X POST http://127.0.0.1:8888/v1/chain/push_transaction -d '{ 
    
    "compression": "none",    // "是否压缩格式，布尔类型，默认值：false"
    
    "transaction": {
        
        "expiration": "2022-04-26T06:44:03.000",
      
        "ref_block_num": 13374721,
      
        "ref_block_prefix": 1146454771,
      
        "context_free_actions": [],
      
        "actions": [{
            
            "account": "nftio.nftc",
            
            "name": "extransfer",
            
            "authorization": [{
                
                "actor": "youdunpp",
                
                "permission": "active"
                
            }],
            
            "data": "000000b54e9d34f550c8082164863f428096980000000000074e4654430000000c6275792f7472616e73666572"
            
        }],
        
        "transaction_extensions": []
        
    },
    
    "signatures": [

        "SIG_K1_JyMdDoP3TWEmddK4bqfFiqZfjMpquvrXmfV4WTunVHACib8aadEDc1Z1fGn4bgyXK6m2Ass824JDLTWLXpVFmEzhSYDsuK"
        
    ]    // "签名数组"  

}'

return（包含交易ID：transaction_id=0dba6c95ca8c5bafef8435e2fc9ae6f2ca9f7a409d2a125ba4275bcc72bf0657）：

{
    
    "transaction_id": "0dba6c95ca8c5bafef8435e2fc9ae6f2ca9f7a409d2a125ba4275bcc72bf0657",
    
    "processed": {
    
        "id": "0dba6c95ca8c5bafef8435e2fc9ae6f2ca9f7a409d2a125ba4275bcc72bf0657",
        
        "receipt": {
        
            "status": "executed",
            
            "cpu_usage_us": 392,
            
            "net_usage_words": 18
            
        },
        
        "elapsed": 392,
        
        "net_usage": 136,
        
        "scheduled": false,
        
        "action_traces": [
        
            {
            
                "receipt": {
                
                    "receiver": "nftio.nftc",
                    
                    "act_digest": "5b199d5cb97b0a1264fe3fc2cc9133663e579d0d0bbf13e4c309c2b354cfefc7",
                    
                    "global_sequence": 13386897,
                    
                    "recv_sequence": 125,
                    
                    "auth_sequence": [
                    
                        [
                        
                            "youdunpp",
                            
                            5
                            
                        ]
                        
                    ],
                    
                    "code_sequence": 1,
                    
                    "abi_sequence": 1
                    
                },
                
                "act": {
                
                    "account": "nftio.nftc",
                    
                    "name": "extransfer",
                    
                    "authorization": [
                    
                        {
                        
                            "actor": "youdunpp",
                            
                            "permission": "active"
                            
                        }
                        
                    ],
                    
                    "data": {
                    
                        "from": "youdunpp",
                        
                        "to": "cczsgt111345",    
                        
                        "quantity":"1.0000000 NFTC", 
                        
                        "memo":"buy/transfer"
                        
                    },
                    
                    "hex_data": "000000b54e9d34f550c8082164863f428096980000000000074e4654430000000c6275792f7472616e73666572"
                    
                },
                
                "elapsed": 942,
                
                "cpu_usage": 0,
                
                "console": "",
                
                "total_cpu_usage": 0,
                
                "trx_id": "f6195473e59ee33ea50fe5f69fb4460b361e963e02613be48fbc1b536863c56e",
                
                "inline_traces": [
                                
                    {
                    
                        "receipt": {
                        
                            "receiver": "cczsgt111345",
                            
                            "act_digest": "03969694b3defe3cc1107ba4279aa3265e9e96aec1a5615b6d779498cdca63a1",
                            
                            "global_sequence": 32142293,
                            
                            "recv_sequence": 16,
                            
                            "auth_sequence": [
                            
                                [
                                    "cczsgt111345",
                                    
                                    38
                                    
                                ]
                                
                            ],
                            
                            "code_sequence": 3,
                            
                            "abi_sequence": 3
                            
                        },
                        
                        "act": {
                        
                            "account": "nftio.nftc",
                            
                            "name": "extransfer",
                            
                            "authorization": [
                            
                                {
                                
                                    "actor": "guang1234555",
                                    
                                    "permission": "active"
                                    
                                }
                                
                            ],
                            
                            "data": {
                            
                                "from": "guang1234555",
                                
                                "to": "cczsgt111345",     
                                
                                "quantity":"10.0000000 NFTC", 
                                
                                "memo":"buy/transfer"
                                
                            },
                            
                            "hex_data": "504a214304368d66104208ffe1abaac600ca9a3b00000000074e46544300000000"
                            
                        },
                        
                        "elapsed": 100,
                        
                        "cpu_usage": 0,
                        
                        "console": "",
                        
                        "total_cpu_usage": 0,
                        
                        "trx_id": "f6195473e59ee33ea50fe5f69fb4460b361e963e02613be48fbc1b536863c56e",
                        
                        "inline_traces": []
                        
                    },
                    
                    {
                    
                        "receipt": {
                        
                            "receiver": "cczsgt111345",
                            
                            "act_digest": "03969694b3defe3cc1107ba4279aa3265e9e96aec1a5615b6d779498cdca63a1",
                            
                            "global_sequence": 32142294,
                            
                            "recv_sequence": 7,
                            
                            "auth_sequence": [
                            
                                [
                                    "cczsgt111345",
                                    
                                    39
                                ]
                                
                            ],
                            
                            "code_sequence": 3,
                            
                            "abi_sequence": 3
                            
                        },
                        
                        "act": {
                        
                            "account": "nftio.nftc",
                            
                            "name": "extransfer",
                            
                            "authorization": [
                            
                                {
                                
                                    "actor": "guang1234555",
                                    
                                    "permission": "active"
                                    
                                }
                                
                            ],
                            
                            "data": {
                            
                                "from": "guang1234555",
                                
                                "to": "cczsgt111345",    
                                
                                "quantity":"10.0000000 NFTC", 
                                
                                "memo":"buy/transfer"
                                
                            },
                            
                            "hex_data": "504a214304368d66104208ffe1abaac600ca9a3b00000000074e46544300000000"
                            
                        },
                        
                        "elapsed": 23,
                        
                        "cpu_usage": 0,
                        
                        "console": "",
                        
                        "total_cpu_usage": 0,
                        
                        "trx_id": "f6195473e59ee33ea50fe5f69fb4460b361e963e02613be48fbc1b536863c56e",
                        
                        "inline_traces": []
                        
                    }
                    
                ]
                
            }
            
        ],
        
        "except": null
        
    }
        
}

# 转账 https://blog.csdn.net/w88193363/article/details/86302753
重启nodeos，使用控制台转一次账，然后查询交易即可获得交易内容
cleos --wallet-url http://127.0.0.1:8900 --url http://127.0.0.1:8888 transfer eosio wjl “1.0000 SYS”

# Docker运行钱包：https://medium.com/@nalamsubash/step-by-step-guide-for-cleos-wallet-c58c0ebbc4cd
# https://steemit.com/eoskorea/@clayop/easy-docker-guide-for-eos
# https://eoswiki.readthedocs.io/zh_CN/latest/Docker%E5%AE%B9%E5%99%A8/
# EOS quick start：https://www.jianshu.com/p/4fe40e8529d3
