# CFM
Community Fault Model


Setting up on linux node: 

yum install git
yum -y install gcc
yum -y install readline-devel
yum -y install zlib-devel

wget https://ftp.postgresql.org/pub/source/v10.5/postgresql-10.5.tar.gz
tar -xzf postgresql-10.5.tar.gz
cd postgresql-10.5
./configure --prefix=/usr/local
make
sudo make install

echo "Update postgres user  .. "
sudo /usr/sbin/userdel postgres 
##scec
sudo /usr/sbin/useradd -d /home/postgres -m postgres
read -s -p "Enter password for postgres: " password
echo $password |sudo passwd --stdin postgres
sudo chage postgres -M -1

echo "Adding cfmuser .. "
##scec
sudo /usr/sbin/useradd -d /home/cfmuser -m cfmuser
read -s -p "Enter password for cfmuser: " password
echo $password |sudo passwd --stdin cfmuser
sudo chage cfmuser -M -1

##
su - postgres
initdb /home/postgres/cfm_db
pg_ctl -D /home/postgres/cfm_db -l logfile start
createuser --interactive

## 
su - cfmuser
cd 
git clone https://github.com/meihuisu/CFM.git




