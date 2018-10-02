COPY SYSTEM_tb(name, abb)
FROM '/Users/mei/scec/CFM/schema/data/system_tb.csv' DELIMITER ',' CSV HEADER;

COPY REGION_tb(name, abb)
FROM '/Users/mei/scec/CFM/schema/data/region_tb.csv' DELIMITER ',' CSV HEADER;

COPY SECTION_tb(name, abb)
FROM '/Users/mei/scec/CFM/schema/data/section_tb.csv' DELIMITER ',' CSV HEADER;

COPY FAULT_tb(name, abb)
FROM '/Users/mei/scec/CFM/schema/data/fault_tb.csv' DELIMITER ',' CSV HEADER;
