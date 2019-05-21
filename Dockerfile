    
FROM ipfs/go-ipfs:latest
RUN echo $(ls /data)
COPY ./.ipfs/swarm.key /data/ipfs/swarm.key
RUN ls /data/ipfs
RUN cat /data/ipfs/swarm.key
# COPY init.sh /usr/local/bin/start_ipfs
# # RUN chown ipfs:users /usr/local/bin/start_ipfs
# RUN echo $(whoami)
# # RUN chown ipfs /usr/local/bin/start_ipfs
# # RUN chmod +x /usr/local/bin/start_ipfs
# ENTRYPOINT ["/sbin/tini", "--", "/usr/local/bin/start_ipfs"]
