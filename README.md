# nftnode
NFT confirm blockchain node docker setup guid file

# 拉取仓库
1、拉取打包源文件项目
git clone https://github.com/yzsoft-eth/nftnode.git
# 打包 Dock File
1、进入git下的项目目录nftnode下的打包目录eos-nft/docker
2、执行打包命令：docker build -t yz-chain-nft:v2.1.0 .
# 启动运行docker镜像
1、回到上级目录，即项目目录nftnode
2、执行脚本命令：./start_yz_chain.sh