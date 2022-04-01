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
1、和EOS区块链交互、管理钱包：clenft
2、区块产生、操作链API：nodenft
3、和钱包交互，用于存储私钥：ksdnft

# 钱包及账号的操作
1、进入容器：docker exec -ti yz-chain-agent-node bash
2、创建钱包：clenft wallet create -n yzagent --to-console
     记录并保存下屏幕上显示的钱包密码（如：PW5********************bFE4Sw）
3、创建公私密钥对并塞入钱包：clenft wallet create_key -n  yzagent
    Copy屏幕上显示以NFT开头的密钥对公钥（如：NFT********************DodH）
4、将上步的公钥以及需要创建的联盟账号名提供给我们，由我们平台创建及激活联盟账号
