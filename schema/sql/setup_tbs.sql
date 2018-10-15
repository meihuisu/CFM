COPY SYSTEM_tb(name, abb)
FROM '/Users/mei/scec/CFM/CFM-github/schema/data/system_tb.csv' DELIMITER ',' CSV HEADER;

COPY REGION_tb(name, abb)
FROM '/Users/mei/scec/CFM/CFM-github/schema/data/region_tb.csv' DELIMITER ',' CSV HEADER;

COPY SECTION_tb(name, abb)
FROM '/Users/mei/scec/CFM/CFM-github/schema/data/section_tb.csv' DELIMITER ',' CSV HEADER;

COPY FAULT_tb(name, abb)
FROM '/Users/mei/scec/CFM/CFM-github/schema/data/fault_tb.csv' DELIMITER ',' CSV HEADER;
