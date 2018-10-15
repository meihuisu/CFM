CREATE TABLE REGION_tb (
   gid serial PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   abb VARCHAR(5) NOT NULL
);
CREATE TABLE SYSTEM_tb (
   gid serial PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   abb VARCHAR(5) NOT NULL
);

CREATE TABLE SECTION_tb (
   gid serial PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   abb VARCHAR(4) NOT NULL
);

CREATE TABLE FAULT_tb (
   gid serial PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   abb VARCHAR(4) NOT NULL
);


CREATE TABLE OBJECT_tb (
   gid serial PRIMARY KEY,

   SYSTEM_tb_gid integer DEFAULT 1,
   CONSTRAINT SYSTEM_tb_gid_fkey FOREIGN KEY (SYSTEM_tb_gid)
      REFERENCES SYSTEM_tb (gid) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,

   REGION_tb_gid integer DEFAULT 1,
   CONSTRAINT REGION_tb_gid_fkey FOREIGN KEY (REGION_tb_gid)
      REFERENCES REGION_tb (gid) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,

   SECTION_tb_gid integer DEFAULT 1,
   CONSTRAINT SECTION_tb_gid_fkey FOREIGN KEY (SECTION_tb_gid)
      REFERENCES SECTION_tb (gid) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,

   FAULT_tb_gid integer DEFAULT 1,
   CONSTRAINT FAULT_tb_gid_fkey FOREIGN KEY (FAULT_tb_gid)
      REFERENCES FAULT_tb (gid) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,

   TRACE_tb_gid integer DEFAULT 0,
/* 
   CONSTRAINT TRACE_tb_gid_fkey FOREIGN KEY (TRACE_tb_gid)
      REFERENCES TRACE_tb (gid) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
*/
   trace_geojson VARCHAR(3000),

   name VARCHAR(100) UNIQUE NOT NULL,
   url VARCHAR(200) UNIQUE,

   alternative VARCHAR(3),
   source_Author VARCHAR(20),
   CFM_version VARCHAR(6),
   model_description VARCHAR(100),
   descriptor VARCHAR(10),
   strike real DEFAULT 0.0,
   dip real DEFAULT 0.0,
   area numeric DEFAULT 0,
   exposure VARCHAR(10),
   final_slip_sense VARCHAR(6),
   reference VARCHAR(100),
   reference_check boolean,
   ID_comments VARCHAR(100),
   USGS_ID VARCHAR(100)
);
