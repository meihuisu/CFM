# CFM

Community Fault Model

## Software requirements

This is the software stack at the backend server node 
when postgres and postgis are being built from source:

      git

      gcc
      readline-develp
      zlib-devel
      json-c
      autoconf
      libxml2-devel
      libtool

      postgres version a10.5
        
      proj5
      gdal

      postgis version 2.5.1

      apache web service

      install cfm viewer from git to /var/www/html 

Following instructions were used on bringing up the cfm viewer
on a micro node reserved from AWS cloud service

`run-as-me` are the instructions for the installer who is
installing the software stack

`run-as-postgres` are the instructions for user, postgres,
who is bringing up the postgres server

`run-as-httpd` are the instructions for installing and
bringing up the web serviceo


## 

  ... Server Side ...
       
    Postgres/Postgis database
    TS/SHP data files
    PHP scripts for accessing database
    Apache web service to manage incoming
       and outgoing instruction/data

  ... Client Side ...

    JS scripts to process and manage data
    Html web page to display graphics
       

       
    
        
