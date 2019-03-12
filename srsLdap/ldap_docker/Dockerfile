FROM debian:stretch

MAINTAINER Jérémy WILLIAME <jeremy.williame@vadesecure.com>

RUN apt-get update && LC_ALL=C DEBIAN_FRONTEND=noninteractive \
	apt-get install -y \
	ldap-utils \
	slapd \
	rsync \
	--no-install-recommends \
	&& apt-get clean -y && rm -rf /var/lib/apt/lists/* 

ENV LDAP_ROOTPASS=bla LDAP_ORGANIZATION="BLA CORP" LDAP_DOMAIN=bla.com

COPY start.sh /start.sh

ENTRYPOINT [ "/start.sh" ]
