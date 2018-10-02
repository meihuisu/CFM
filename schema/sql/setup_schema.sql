CREATE TABLE SYSTEM_tb (
   SYSTEM_tb_idx serial PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   abb VARCHAR(5) NOT NULL
);

CREATE TABLE REGION_tb (
   REGION_tb_idx serial PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   abb VARCHAR(5) NOT NULL
);

CREATE TABLE SECTION_tb (
   SECTION_tb_idx serial PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   abb VARCHAR(4) NOT NULL
);

CREATE TABLE FAULT_tb (
   FAULT_tb_idx serial PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   abb VARCHAR(4) NOT NULL
);


CREATE TABLE OBJECT_tb (
   OBJECT_tb_idx serial PRIMARY KEY,

   SYSTEM_tb_idx integer DEFAULT 1,
   CONSTRAINT SYSTEM_tb_idx_fkey FOREIGN KEY (SYSTEM_tb_idx)
      REFERENCES SYSTEM_tb (SYSTEM_tb_idx) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,

   REGION_tb_idx integer DEFAULT 1,
   CONSTRAINT REGION_tb_idx_fkey FOREIGN KEY (REGION_tb_idx)
      REFERENCES REGION_tb (REGION_tb_idx) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,

   SECTION_tb_idx integer DEFAULT 1,
   CONSTRAINT SECTION_tb_idx_fkey FOREIGN KEY (SECTION_tb_idx)
      REFERENCES SECTION_tb (SECTION_tb_idx) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,

   FAULT_tb_idx integer DEFAULT 1,
   CONSTRAINT FAULT_tb_idx_fkey FOREIGN KEY (FAULT_tb_idx)
      REFERENCES FAULT_tb (FAULT_tb_idx) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,

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
