FROM ubuntu:16.04
WORKDIR /ipfs
RUN sudo apt-get update
RUN sudo apt-install -y jq
RUN curl -O https://storage.googleapis.com/golang/go1.23.4.linux-amd64.tar.gz
RUN sudo tar -C /usr/local -xzf go1.23.4.linux-amd64.tar.gz
RUN export PATH=$PATH:/usr/local/go/bin
RUN source $HOME/.profile
RUN sudo apt-get update
RUN wget https://dist.ipfs.io/go-ipfs/v0.4.19/go-ipfs_v0.4.19_linux-amd64.tar.gz
RUN tar xvfz go-ipfs_v0.4.18_linux-amd64.tar.gz
RUN sudo mv go-ipfs/ipfs /usr/local/bin/ipfs
RUN rm go-ipfs_v0.4.19_linux-amd64.tar.gz
RUN rm -R ./go-ipfs
RUN ipfs init
# RUN sudo apt-get install git
# RUN go get -u github.com/Kubuxu/go-ipfs-swarm-key-gen/ipfs-swarm-key-gen
# RUN ./go/bin/ipfs-swarm-key-gen > ~/.ipfs/swarm.key
# Pregenerated swarm key?
COPY ./.ipfs ~/.ipfs 
RUN ipfs bootstrap rm --all
# IP address of bootnode
# PeerID of bootnode
RUN ipfs config show > config.json
ENV PeerID = $(jq -r '.Identity.PeerID' config.json)
RUN echo ${PeerID}
