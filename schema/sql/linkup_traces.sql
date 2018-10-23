CREATE TEMP TABLE tmp_x AS
     SELECT name, concat(name,'-trace'), gid from OBJECT_tb;

UPDATE OBJECT_tb 
    SET (TRACE_tb_gid) = (TRACE_tb.gid)
    FROM tmp_x, TRACE_tb
    WHERE TRACE_tb.layer = tmp_x.concat
    AND tmp_x.gid = OBJECT_tb.gid;

DROP TABLE tmp_x;

