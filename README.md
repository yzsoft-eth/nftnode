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

# 钱包及账号的操作
1、进入容器：docker exec -ti yz-chain-agent-node bash

2、创建钱包：clenft wallet create -n yzagent --to-console
   记录并保存下屏幕上显示的钱包密码（如：PW5********************bFE4Sw）
   
3、创建公私密钥对并塞入钱包：clenft wallet create_key -n  yzagent
   Copy屏幕上显示以NFT开头的密钥对公钥（如：NFT********************DodH）
   
4、将上步的公钥以及需要创建的联盟账号名提供给我们，由我们平台创建及激活联盟账号

5、查看钱包中的密钥对，需要输入钱包密码解锁：clenft wallet private_keys
     执行上述命令后，按提示在password: 后输入钱包密码，可获取到钱包里全部的公私钥对
    
     password: [[
        
        "NFT****************************************************************",
        
        "5Hp****************************************************************"
        
    ]]
    
6、退出docker容器，回到宿主机：exit

说明：上述各步操作，如提示钱包锁定，请使用命令解锁钱包：clenft wallet unlock -n yzagent --password PW5********************bFE4Sw


# 链api

域名：nft.chinaqking.com/v1

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

示例：guang1234555转账10个NFTC给cczsgt111345

7.1、交易信息JSON格式序列化为BIN格式字符串
curl -X POST https://nft.chinaqking.com/v1/chain/abi_json_to_bin -d '{
    "code":"nftio.nftc",
    "action":"extransfer",
    "args":{
        "from":"guang1234555",
        "to":"cczsgt111345",
        "quantity":"10.0000000 NFTC", 
        "memo":"buy/transfer"
    }
}'
return（获取到binargs）：{
    "binargs":"504a214304368d6650c8082164863f4200e1f50500000000074e4654430000000c6275792f7472616e73666572"
}

7.2、获取当前最新的区块编号
curl -X POST https://nft.chinaqking.com/v1/chain/get_info

return（获取到head_block_num）：
{
    "server_version":"26a4d285",
    
    "chain_id":"4e020515db057c0f6ae6dfadb134d2252c2ea8a4e8fdd4d8fd4543d23f31e558",
    
    "head_block_num":5103489,
    
    "last_irreversible_block_num":5103451,
    "last_irreversible_block_id":"004ddf5b6f837383b7b7ecb7f6db38f9b43109325f055a6392fd2ddbefd834b0","head_block_id":"004ddf81c58427c5df67e6d75b35198f88067477b4bd49dd8b07501117bd040a",
    
    "head_block_time":"2022-04-12T08:20:37.000",
    
    "head_block_producer":"yznft",
    
    "virtual_block_cpu_limit":100000000,
    
    "virtual_block_net_limit":1048576000,
    
    "block_cpu_limit":99900,
    
    "block_net_limit":1048576,
    
    "server_version_string":"v2.1.0",
    
    "fork_db_head_block_num":5103489,
    
    "fork_db_head_block_id":"004ddf81c58427c5df67e6d75b35198f88067477b4bd49dd8b07501117bd040a",
    
    "server_full_version_string":"v2.1.0-26a4d285d0be1052d962149e431eb81500782991-dirty",
    
    "last_irreversible_block_time":"2022-04-12T08:19:59.000"
    
}


7.3、获取区块详情
curl -X POST https://nft.chinaqking.com/v1/chain/get_block -d '{
    "block_num_or_id":"5103489"
}'

return（获取到timestamp 和ref_block_prefix）：

{
    "timestamp":"2022-04-12T08:20:37.000",
    
    "producer":"yznft",
    
    "confirmed":0,
    "previous":"004ddf8078bf7a2285b944ab3df9a9b087815e8c653aa32eef39276536297918","transaction_mroot":"0000000000000000000000000000000000000000000000000000000000000000","action_mroot":"9c9021c8b38fc5a03a938b4134b25182d2feb365e6f5e4c856750dfbbfcad441",
    
    "schedule_version":3,
    
    "new_producers":null,"producer_signature":"SIG_K1_JxbXucjcSkjQzQED2bDeSkGK3EqXmeEKq167PNWBLhxoj6VeLh3c7zuDd1UP1vRkVaZWTkCdyLJ78G4uJtXU6jXEYaxtPK",
    
    "transactions":[],
    
    "id":"004ddf81c58427c5df67e6d75b35198f88067477b4bd49dd8b07501117bd040a",
    
    "block_num":5103489,
    
    "ref_block_prefix":3622201311
    
}


7.4、查询/记录转账交易用户guang1234555的公钥（用于交易签名）：NFT54ReQMf7XZj9MdqusDVCRoYPaeP9p8zQ1TPqAQnUW9kjwR31uB

7.5、签署交易
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

curl -X POST https://nft.chinaqking.com/v1/wallet/sign_transaction -d '[{

        "ref_block_num": 5103489,
        
        "ref_block_prefix": 3622201311,
        
        "expiration": "2022-04-12T09:20:37.000",
        
        "actions": [{
        
            "account": "nftio.nftc",
            
            "name": "extransfer",
            
            "authorization": [{
            
                "actor": "guang1234555",
                
                "permission": "active"
                
            }],
            
            "data": "504a214304368d6650c8082164863f4200e1f50500000000074e4654430000000c6275792f7472616e73666572"
            
        }],
        
        "signatures": []
        
    },
    
    ["NFT54ReQMf7XZj9MdqusDVCRoYPaeP9p8zQ1TPqAQnUW9kjwR31uB"], 
    
    "4e020515db057c0f6ae6dfadb134d2252c2ea8a4e8fdd4d8fd4543d23f31e558"
]'

return（获取signatures）：

{
    "expiration": "2022-04-12T09:20:37.000",
    
    "ref_block_num": 5183489,
    
    "ref_block_prefix": 3622201311,
    
    "max_net_usage_words": 0,
    
    "max_cpu_usage_ms": 0,
    
    "delay_sec": 0,
    
    "context_free_actions": [],
    
    "actions": [
    
        {
        
            "account": "nftio.nftc",
            
            "name": "extransfer",
            
            "authorization": [
            
                {
                
                    "actor": "guang1234555",
                    
                    "permission": "active"
                    
                }
                
            ],
            
            "data": "504a214304368d6650c8082164863f4200e1f50500000000074e4654430000000c6275792f7472616e73666572"
            
        }
        
    ],
    
    
    "transaction_extensions": [],
    
    "signatures": [
    
        "SIG_K1_**********beJYmA**********tFmywezC**********P4V7NVnJodN**********"
        
    ],
    
    "context_free_data": []
    
}



7.6、提交交易

curl -X POST https://nft.chinaqking.com/v1/chain/push_transaction -d '{ 

  "compression": "none",    // "是否压缩格式，布尔类型，默认值：false"
  
  "transaction": {
  
    "expiration": "2022-04-12T09:20:37.000",
    
    "ref_block_num": 5183489,
    
    "ref_block_prefix": 3622201311,
    
    "context_free_actions": [],
    
    "actions": [
        {
            "account": "nftio.nftc",
            "name": "extransfer",
            "authorization": [
                {
                    "actor": "guang1234555",
                    "permission": "active"
                }
            ],
            "data": "504a214304368d6650c8082164863f4200e1f50500000000074e4654430000000c6275792f7472616e73666572"
        }
    ],
    "transaction_extensions": []
  },
  "signatures": [
        "SIG_K1_**********beJYmA**********tFmywezC**********P4V7NVnJodN**********"
        
   ]    // "签名数组"  
}'


return（包含交易ID：transaction_id）：

{
    "transaction_id": "f6195473e59ee33ea50fe5f69fb4460b361e963e02613be48fbc1b536863c56e",
    
    "processed": {
    
        "id": "f6195473e59ee33ea50fe5f69fb4460b361e963e02613be48fbc1b536863c56e",
        
        "receipt": {
        
            "status": "executed",
            
            "cpu_usage_us": 1537,
            
            "net_usage_words": 17
            
        },
        
        "elapsed": 1537,
        
        "net_usage": 136,
        
        "scheduled": false,
        
        "action_traces": [
        
            {
            
                "receipt": {
                
                    "receiver": "nftio.nftc",
                    
                    "act_digest": "03969694b3defe3cc1107ba4279aa3265e9e96aec1a5615b6d779498cdca63a1",
                    
                    "global_sequence": 32142292,
                    
                    "recv_sequence": 1716642,
                    
                    "auth_sequence": [
                    
                        [
                        
                            "guang1234555",
                            
                            45
                            
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

