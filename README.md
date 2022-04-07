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

# 链api

域名：nft.chinaqking.com/v1

1、查询指定区块的详细数据
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

2、查询指定账号的描述信息
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

3、查询指定账户的代币余额信息
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

4、查询历史交易数据
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

5、提交交易数据到链上
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