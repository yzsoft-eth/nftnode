# 名词解释
1、悦智联盟链
中创硕丰链是广州悦智计算机自主研发的区块链服务平台，作为数字经济可信基础设施，提供“底层+智能合约+服务”的私有化部署或公网调用服务，支持底链管理、运维监控、钱包、区块链浏览器、智能合约开发等功能，可帮助客户一站式创建、管理和运维区块链网络及应用，降低企业使用门槛和建设使用成本。为身份认证、数据存证、公益及物流溯源、数字藏品交易、企业数字通证等各类区块链业务场景提供服务支撑能力。

2、RAM
RAM 充当永久存储，用于存储账户名称、权限、代币余额和其他数据，以实现快速的链上数据访问。RAM 需要购买并且不是基于质押，因为它是一种有限的持久性资源，以字节（byte）为单位。

3、CPU
CPU 代表一个方法的处理时间，以微秒（us）为单位。如get account，表示将交易推送到合约帐户时可以支配的处理时间量。CPU是一种瞬态系统资源，属于EOSIO的抵押机制，会在使用后的24小时内线性恢复。

4、NET
NET 是交易的网络带宽，以字节（byte）为单位。当区块链执行交易时，它会消耗CPU和NET，因此必须抵押足够的NET才能完成交易。NET也是一种瞬态系统资源，属于EOSIO的抵押机制，会在使用后的24小时内线性恢复。

5、公私钥对：
在联盟链系统中，账户的控制不直接由密钥或钱包支配，而是由账户本身决定。每个链账户都有两个权限：owner 权限和 active 权限。
Owner 权限更高，可以执行高级操作，如重置 active 权限、更改自身公钥以转让账号等。
Active 权限用于日常操作，如转账和投票。
每个权限可以对应一个公钥，这意味着一个账户可以对应两个私钥。一般情况下，我们不使用 owner 权限，而是使用 active 权限进行操作。
联盟链私钥通常以 51 位（以 5 开头）表示，公钥以 53 位（以 NFT或ZCF等 开头）表示。

6、链账户：
链账号是是存储在区块链上的人类可读名称，它代表着用户在联盟链网络上的用户身份。可以根据权限配置，通过个人或个人组的授权来拥有。需要一个账户才能将任何有效交易转移或推送到联盟链上，账号一般是由1-5、a-z组成的 12 位字符，如： myaccount123。
请确保备份好账号的 owner 和 active 私钥，以防丢失。

7、钱包：
钱包是存储密钥（公私钥对）的客户端工具，这些密钥可能与一个或多个帐户的权限相关联，也可能不相关。理想情况下，钱包具有受高熵密码保护的锁定（加密）和解锁（解密）状态。一个钱包可管理多对公私钥，一对公私钥可与一个或多个帐户相关联，也可能不关联。
钱包主要用于签署交易和操作账户。
钱包采用“单私钥模式”，即 owner 和 active 使用同一把私钥。但也有“双私钥模式”，允许分别管理 owner 和 active 私钥。
无论是 owner 还是 active 私钥，钱包 APP 都没有权利控制它们，因此请确保自己备份了对应的私钥。

8、授权和权限
权限是任意名称，用于定义代表该权限发送的事务的要求。可以通过链接授权或链接身份来为特定合约操作的权限分配权限。

9、智能合约：
智能合约是一段代码，可以在区块链上执行，并将合约执行状态作为该区块链实例的不可变历史的一部分。因此，开发者可以依赖区块链作为可信计算环境，智能合约的输入、执行和结果是独立的，不受外部影响。

# 硬件环境
1、主机：阿里云或腾讯云等云服务商，主机区域最好选择 阿里云华北6区

2、CPU：8核

3、内存：32G

4、带宽：100M

5、硬盘：系统盘 40G ， 数据盘：200G

# 软件环境
1、ubuntu 16.04以上

2、安装nginx、git和docker

3、需开放对外端口 SSH端口80，链p2p监听端口9010，链RPC端口8888，钱包RPC端口8900，如果能提供链RPC和钱包RPC的访问域名，刚可以不开放对外的8888和8900端口。

# 拉取仓库
```
git clone https://github.com/yzsoft-eth/nftnode.git
```

# 打包 Dock File
```bash
# 进入git下的项目目录nftnode下的打包目录eos-nft/docker
cd ./nftnode/eos-nft/docker

# 执行打包命令：
docker build -t yz-chain-nft:v2.1.0 .
```

# 准备宿主机目录挂载到容器
说明：要保存有一定的存贮空间>=100G

```bash
# 节点数据目录
mkdir -p /data/yz-node/data

# 钱包目录
mkdir -p /data/yz-node/wallet
```

# 启动运行docker镜像
1、回到 项目目录: nftnode

2、执行脚本：sh start_yz_chain.sh

4、docker正常运行后，如需提供对外的rpc及p2p通迅，请开启宿主机防火墙的8888和9010端口

# 命令行命令
1、和链交互、管理钱包：clenft

2、区块产生、操作链API：nodenft

3、和钱包交互，用于存储私钥：ksdnft

# 钱包 RPC Apis 操作
URL：http://127.0.0.1:8900/v1/wallet

1、新建钱包：

    接口地址：/create
    调用方法：POST
    调用参数：钱包名称
    返回值：钱包密码
    示例：
```bash
curl -X POST http://127.0.0.1:8900/v1/wallet/create \
    -H 'Cache-Control: no-cache' \
    -H 'Content-Type: application/json' \
    -d '"yzagent"'
```
    返回钱包密码字符串，请妥善保证，用于后续的钱包解锁

```json
"PW5*******************************"
```

2、打开已存在钱包：

    接口地址：/open
    调用方法：POST
    调用参数：钱包名称
    返回值：成功，返回空括号
    示例：
```bash
curl -X POST http://127.0.0.1:8900/v1/wallet/open \
    -H 'Cache-Control: no-cache' \
    -H 'Content-Type: application/json' \
    -d '"yzagent"'
```
    打开成功，返回空括号
```json
    {}
```

3、锁定钱包：

    接口地址：/lock
    调用方法：POST
    调用参数：钱包名称
    返回值：成功，返回空括号
    示例：
```bash
curl -X POST http://127.0.0.1:8900/v1/wallet/lock \
    -H 'Cache-Control: no-cache' \
    -H 'Content-Type: application/json' \
    -d '"yzagent"'
```
    锁定成功，返回空括号
```json
    {}
```

4、锁定所有已解锁的钱包：

    接口地址：/lock_all
    调用方法：GET
    调用参数：无
    返回值：成功，返回空括号
    示例：
```bash
curl http://127.0.0.1:8900/v1/wallet/lock_all
```
    锁定成功，返回空括号
```json
    {}
```

5、解锁钱包：

    接口地址：/unlock
    调用方法：POST
    调用参数：钱包名称，钱包密码（上面新建钱包时返回的密码字符串）
    返回值：成功，返回空括号
    示例：
```bash
curl -X POST http://127.0.0.1:8900/v1/wallet/unlock \
    -H 'Cache-Control: no-cache' \
    -H 'Content-Type: application/json' \
    -d '["yzagent", "PW5*******************************"]'
```
    解锁成功，返回空括号
```json
    {}
```

6、导入私钥：

    接口地址：/import_key
    调用方法：POST
    调用参数：钱包名称，私钥
    返回值：成功，返回空括号
    示例：
```bash
curl -X POST http://127.0.0.1:8900/v1/wallet/import_key \
    -H 'Cache-Control: no-cache' \
    -H 'Content-Type: application/json' \
    -d '["yzagent", "私钥"]'
```
    成功，返回空括号
```json
    {}
```

7、移除钱包私钥：

    接口地址：/remove_key
    调用方法：POST
    调用参数：钱包名称，钱包密码，私钥
    返回值：成功，返回空括号
    示例：
```bash
curl -X POST http://127.0.0.1:8900/v1/wallet/remove_key \
    -H 'Cache-Control: no-cache' \
    -H 'Content-Type: application/json' \
    -d '["yzagent", "钱包密码", "私钥"]'
```
    成功，返回空括号
```json
    {}
```

8、创建公私密钥对并塞入钱包：

    接口地址：/create_key
    调用方法：POST
    调用参数：钱包名称，密钥类型（指定为K1）
    返回值：返回与新私钥关联的 NFT 公钥
    示例：
```bash
curl -X POST http://127.0.0.1:8900/v1/wallet/create_key \
    -H 'Cache-Control: no-cache' \
    -H 'Content-Type: application/json' \
    -d '["yzagent", "K1"]'
```
    成功，返回关联的 NFT 公钥
```string
    "NFT*******************************"
```
    说明：
    成功建立公私钥对后，请将上述以NFT开头的公钥以及需要创建的联盟账号名提供给我们，由我们平台创建并激活联盟账号

9、列表显示已打开的钱包：

    接口地址：/list_wallets
    调用方法：GET
    调用参数：无
    返回值：返回打开的钱包数组
    示例：
```bash
curl http://127.0.0.1:8900/v1/wallet/list_wallets
```
    成功，返回打开的钱包数组，钱包标有“*”代表此钱包已解锁
```arrary
    ["yzagent *"]
```

10、列表显示所有解锁钱包的公钥/私钥对：

    接口地址：/list_keys
    调用方法：POST
    调用参数：钱包名称，钱包密码
    返回值：返回钱包里的 NFT 公钥/私钥对数组
    示例：
```bash
curl -X POST http://127.0.0.1:8900/v1/wallet/list_keys \
    -H 'Cache-Control: no-cache' \
    -H 'Content-Type: application/json' \
    -d '["yzagent", "钱包密码"]'
```
    成功，返回钱包里的 NFT 公钥/私钥对数组
```arrary
    [["NFT*******************************","5JW*******************************"]]
```

11、列表显示钱包以 NFT 为前缀的公钥：

    接口地址：/get_public_keys
    调用方法：POST
    调用参数：钱包名称，钱包密码
    返回值：返回钱包里以 NFT 为前缀的公钥数组
    示例：
```bash
curl -X POST http://127.0.0.1:8900/v1/wallet/get_public_keys \
    -H 'Cache-Control: no-cache' \
    -H 'Content-Type: application/json' \
    -d '["yzagent", "钱包密码"]'
```
    成功，返回钱包里以 NFT 为前缀的公钥数组
```arrary
    [["NFT*******************************"]]
```

12、设置钱包自动锁定超时（以秒为单位）：

  接口地址：/set_timeout 
  调用方法：POST
  调用参数：锁定的 timeout 值（以秒为单位）
  返回值：成功，返回空括号
  示例：
```bash
curl -X POST http://127.0.0.1:8900/v1/wallet/set_timeout \
    -H 'Cache-Control: no-cache' \
    -H 'Content-Type: application/json' \
    -d '10'
```
    成功，返回空括号
```json
    {}
```

13、签名交易，需要公钥和链ID：

  接口地址：/sign_transaction 
  调用方法：POST
  调用参数：[{
              expiration："过期时间",    
              ref_block_num："链最新区块号，引用区块号",    
              ref_block_prefix："引用区块的前缀",
              actions: [{
                  account："合约账号",
                  name："合约方法",
                  authorization: [{
                      actor："调用者",
                      permission："使用的权限类型"
                  }],
                  data："合约 Data 数据json格式序列化为bin格式字符串"
              }],
              signatures："签名字符串"  
            },
            ["签署此交易的公钥"],
            "链ID"      
            ]
  返回值：成功，返回签名结果 signatures
  示例：
```bash
curl -X POST http://127.0.0.1:8900/v1/wallet/sign_transaction \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -d '[
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
```
  成功，返回返回签名结果
```json
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
```

# 链接口 RPC API

域名：（除特别说明外，其它默认值）

        公网：nft.chinaqking.com/v1
    
        内网：127.0.0.1:8888/v1

1、获取与节点相关的最新信息

调用url：/chain/get_info

调用方法：POST

调用参数：无

返回值：返回包含当前链区块最新高度的节点相关信息
{
  "server_version": "节点版本",
  "head_block_num": "链头区块序号",
  "lase_irreversible_block_num": "不可逆区块号",
  "head_block_id": "链头区块ID",
  "head_block_time": "链头区块生成时间",
  "head_block_producer": "链头区块出块账号"
}

示例：
```bash
curl -X POST https://nft.chinaqking.com/v1/chain/get_info
```

2、查询指定区块的详细数据

调用url：/chain/get_block

调用方法：POST

调用参数：JSON Object
{
  "block_num_or_id": "字符串，要提取数据的区块序号或ID"
}

返回值：返回查询到描述指定区块数据的JSON对象

示例：
```bash
curl -X POST https://nft.chinaqking.com/v1/chain/get_block -d '{
    "block_num_or_id": "10444813"
}'
```

3、获取一个区块的信息

调用url：/chain/get_block_info

调用方法：POST

调用参数：JSON Object
{
  "block_num": "字符串，要提取数据的区块序号或ID"
}

返回值：与get_block类似，但返回块数据的固定大小的较小子集。

示例：
```bash
curl -X POST https://nft.chinaqking.com/v1/chain/get_block_info -d '{ 
    "block_num": "10444813"
}'
```

4、获取账户的信息

调用url：/chain/get_account

调用方法：POST

调用参数：JSON Object
{
  "account_name": "账号名称，字符串"
}

返回值：返回描述账号信息的JSON对象

示例：
```bash
curl -X POST https://nft.chinaqking.com/v1/chain/get_account -d '{
    "account_name": "yzsoft"
}'
```

5、根据账户名获取智能合约的 ABI

调用url：/chain/get_abi

调用方法：POST

调用参数：JSON Object
{
  "account_name": "合约账号名称，字符串"
}

返回值：返回描述智能合约代码信息的JSON对象

示例：
```bash
curl -X POST https://nft.chinaqking.com/v1/chain/get_abi -d '{ 
    "account_name": "nftio.token"
}'
```

6、获取智能合约代码

调用url：/chain/get_code

调用方法：POST

调用参数：JSON Object
{
    "account_name": "合约账号名称，字符串",
    "code_as_wasm": "传入值必须是数值 1 ",
}

返回值：返回描述智能合约 WASM 代码的JSON对象

示例：
```bash
curl -X POST https://nft.chinaqking.com/v1/chain/get_code -d '{ 
  "account_name": "nftio.token",
	"code_as_wasm":1
}'
```

7、获取包含智能合约 abi 的对象。

调用url：/chain/get_raw_abi

调用方法：POST

调用参数：JSON Object
{
  "account_name": "账号名称，字符串"
}

返回值：返回包含智能合约 abi 的对象。

示例：
```bash
curl -X POST https://nft.chinaqking.com/v1/chain/get_raw_abi -d '{ 
    "account_name": "nftio.token"
}'
```

8、查询指定账户的代币余额信息

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
```bash
curl -X POST https://nft.chinaqking.com/v1/chain/get_currency_balance -d '{
  "code":"nftio.nftc",
  "account": "guang1234555",
  "symbol": "NFTC"
}'
```

9、查询代币发行信息

调用url：/chain/get_currency_stats

调用方法：POST

调用参数：JSON Object
{
  "code":"代币合约托管账户名称，字符串",
  "symbol": "要查询的代码符号，字符串"
}

返回值：返回代币的统计信息

示例：
```bash
curl -X POST https://nft.chinaqking.com/v1/chain/get_currency_stats -d '{
  "code":"nftio.nftc",
  "symbol": "NFTC"
}'
```

10、调用返回签名一个交易时需要的公钥清单

调用url：/chain/get_required_keys

调用方法：POST

调用参数：JSON Object
{
  "transaction": "交易数据，JSON对象"
  "available_keys": "可用公钥，数组"
}

返回值：返回一组必须的用于签名的公钥

示例：
```bash
curl -X POST https://nft.chinaqking.com/v1/chain/get_required_keys -d '{ 
    "transaction": {
        "ref_block_num": 13374721,  
        "ref_block_prefix": 1146454771,      
        "expiration": "2022-04-26T06:44:03.000",
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
    "available_keys": [
        "NFT4toFS3YXEQCkuuw1aqDLrtHim86Gz9u3hBdcBw5KNPZcursVHq",
        "NFT7d9A3uLe6As66jzN8j44TXJUqJSK3bFjjEEqR4oTvNAB3iM9SA",
        "NFT6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
        "NFT692YHJvAKtbmS77N3uTS2vqc1b24jip6vyc24tM3zSprdUia2R"
    ]
}'
```

11、获取生产者

调用url：/chain/get_producers

调用方法：POST

调用参数：JSON Object
{
  "limit": "返回数量",
  "lower_bound": "起始位置",
  "json": "布尔值，返回 JSON 格式的结果"
}

返回值：生产者对象数组

示例：
```bash
curl -X POST https://nft.chinaqking.com/v1/chain/get_producers -d '{
    "limit": 10,
    "lower_bound": 0,
    "json": true
}'
```

12、根据账户名检索合约的原始代码和 ABI

调用url：/chain/get_raw_code_and_abi

调用方法：POST

调用参数：JSON Object
{
  "account_name": "账户名称，字符串"
}

返回值：合约的原始代码和 ABI

示例：
```bash
curl -X POST https://nft.chinaqking.com/v1/chain/get_raw_code_and_abi -d '{ 
    "account_name": "nftio.nftc"
}'
```

13、按范围检索表

调用url：/chain/get_table_by_scope

调用方法：POST

调用参数：JSON Object
{
  "code": "表数据合约账号，字符串",
  "table": "表名，字符串",
  "lower_bound": "表行中最低的匹配起点。对于从前向后看很有用。字符串",
  "upper_bound": "表行中的最高匹配点。对于从后向前看很有用。字符串",
  "limit": "要返回的数量，整数",
  "reverse": "返回结果的排序顺序,布尔值"
}

返回值：返回特定合约账户名称的可用表及其给定范围。对于查看表中包含哪些条目以及该表中的行数很有用。

示例：
```bash
curl -X POST https://nft.chinaqking.com/v1/chain/get_table_by_scope -d '{ 
  "code": "nftio.token",
  "table": "accounts",
  "limit": 10
}'
```

14、获取表行

调用url：/chain/get_table_rows

调用方法：POST

调用参数：JSON Object
{
  "code": "表数据合约账号，字符串",
  "table": "表名，字符串",
  "scope": "该数据所属的帐户，字符串",  
  "index_position": "使用的索引的位置，接受的参数primary , secondary , tertiary , fourth , fifth , sixth , seventh , August , eighth ninth tenth，字符串",  
  "key_type": "密钥类型，由 index_position 指定的键类型（例如 - uint64_t或name ），字符串",  
  "encode_type": "编码类型，字符串"
}

返回值：返回表中的行

示例：
```bash
curl -X POST https://nft.chinaqking.com/v1/chain/get_table_rows -d '{ 
  "code": "nftio.token",
  "table": "accounts",
  "scope": "guang1234555"
}'
```

15、获取操作数据序列化后对象二进制数据。

调用url：/chain/abi_json_to_bin

调用方法：POST

调用参数：JSON Object
{  
  "code": "合约账号，字符串",
  "action": "合约行为，字符串",
  "args": "合约参数，JSON对象"
}

返回值：{ "binargs": "序列化后的二进制数据"}

示例：
```bash
curl -X POST https://nft.chinaqking.com/v1/chain/abi_json_to_bin -d '{ 
  "code":"nftio.nftc",
  "action":"extransfer",
  "args":{
      "from":"youdunpp",
      "to":"cczsgt111345",
      "quantity":"1.0000000 NFTC", 
      "memo":"buy/transfer"
  }
}'
```

16、获取反序列化操作数据的对象。

调用url：/chain/abi_bin_to_json

调用方法：POST

调用参数：JSON Object
{
  "code": "合约账号，字符串",
  "action": "合约行为，字符串",
  "binargs": "二进制参数，字符串"
}

返回值：包含反序列化操作数据的对象。

示例：
```bash
curl -X POST https://nft.chinaqking.com/chain/abi_bin_to_json -d '{ 
  "code": "nftio.nftc",
  "action": "extransfer",
  "binargs": "000000b54e9d34f550c8082164863f428096980000000000074e4654430000000c6275792f7472616e73666572"
}'
```

17、查询历史交易数据

调用url：/history/get_transaction

调用方法：POST

调用参数：JSON Object
{
  "id": "交易ID，字符串"
}

返回值：查询到交易描述的JSON对象

示例：
```bash
curl -X POST https://nft.chinaqking.com/v1/history/get_transaction -d '{
    "id": "3f639408decbe6ac60d62dfcd13dd3fabdc867f206e56afd7ef203299b86a27a"
}'
```

18、提交交易数据到链上

调用url：/chain/push_transaction

调用方法：POST

调用参数：JSON Object
{
  "signatures"："签名数组",
  "compression"："是否压缩格式，布尔类型，默认值：false",
  "packed_context_free_data"："上下文无关的数据，json to hex",
  "packed_tx"："序列化的交易数据，Transaction object json to hex"
}

返回值：调用的返回结果包含交易ID

示例：
```bash
curl -X POST https://nft.chinaqking.com/v1/chain/push_transaction -d '{
    ...
}'
```

返回结果：
{
    'transaction_id' = "交易ID"
}

19、充值/转账

示例：guang1234555转账10个NFTC给cczsgt111345

19.1、交易信息JSON格式序列化为BIN格式字符串

```bash
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
```

return（获取到binargs）：{
    "binargs":"504a214304368d6650c8082164863f4200e1f50500000000074e4654430000000c6275792f7472616e73666572"
}

19.2、获取当前最新的区块编号

```bash
curl -X POST https://nft.chinaqking.com/v1/chain/get_info
```

return（获取到head_block_num）：
{
    "server_version":"26a4d285",
    "chain_id":"4e020515db057c0f6ae6dfadb134d2252c2ea8a4e8fdd4d8fd4543d23f31e558",
    "head_block_num":5103489,
    "last_irreversible_block_num":5103451,
    "last_irreversible_block_id":"004ddf5b6f837383b7b7ecb7f6db38f9b43109325f055a6392fd2ddbefd834b0",
    "head_block_id":"004ddf81c58427c5df67e6d75b35198f88067477b4bd49dd8b07501117bd040a",
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


19.3、获取区块详情

```bash
curl -X POST https://nft.chinaqking.com/v1/chain/get_block -d '{
    "block_num_or_id":"5103489"
}'
```

return（获取到timestamp 和ref_block_prefix）：
{
    "timestamp":"2022-04-12T08:20:37.000",
    "producer":"yznft",
    "confirmed":0,
    "previous":"004ddf8078bf7a2285b944ab3df9a9b087815e8c653aa32eef39276536297918",
    "transaction_mroot":"0000000000000000000000000000000000000000000000000000000000000000",
    "action_mroot":"9c9021c8b38fc5a03a938b4134b25182d2feb365e6f5e4c856750dfbbfcad441",
    "schedule_version":3,
    "new_producers":null,
    "producer_signature":"SIG_K1_JxbXucjcSkjQzQED2bDeSkGK3EqXmeEKq167PNWBLhxoj6VeLh3c7zuDd1UP1vRkVaZWTkCdyLJ78G4uJtXU6jXEYaxtPK",
    "transactions":[],
    "id":"004ddf81c58427c5df67e6d75b35198f88067477b4bd49dd8b07501117bd040a",
    "block_num":5103489,
    "ref_block_prefix":3622201311
}

19.4、查询/记录转账交易用户guang1234555的公钥（用于交易签名）：NFT54ReQMf7XZj9MdqusDVCRoYPaeP9p8zQ1TPqAQnUW9kjwR31uB

19.5、签署交易

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

```bash
curl -X POST http://127.0.0.1:8900/v1/wallet/sign_transaction -d '[
  {
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
```

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
  "signatures": [ "SIG_K1_**********beJYmA**********tFmywezC**********P4V7NVnJodN**********" ],
  "context_free_data": []
}

19.6、提交交易

```bash
curl -X POST https://nft.chinaqking.com/v1/chain/push_transaction -d '{
  "compression": "none",    // "是否压缩格式，布尔类型，默认值：false"
  "transaction": 
  {
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
  "signatures": [ "SIG_K1_**********beJYmA**********tFmywezC**********P4V7NVnJodN**********" ]    // "签名数组"
}'
```

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
