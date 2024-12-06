FROM ubuntu:20.04

RUN apt update && apt install -y openssh-server
RUN apt install -y software-properties-common
RUN add-apt-repository ppa:deadsnakes/ppa
RUN apt update
RUN apt install -y python3.12 python3-pip
RUN mkdir /var/run/sshd

RUN mkdir -p /root/.ssh && chmod 700 /root/.ssh

COPY id_ed25519.pub /root/.ssh/authorized_keys
RUN chmod 600 /root/.ssh/authorized_keys

RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

EXPOSE 22

CMD ["/usr/sbin/sshd", "-D"]
