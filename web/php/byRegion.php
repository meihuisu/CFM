<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php

include("declare.php");
include("util.php");

$dbconn = pg_connect("host=localhost port=5432 dbname=CFM5_db user=webonly password=scec");
if (!$dbconn) { die('Could not connect'); }

$q = ($_GET['q']);

$query = "SELECT OBJECT_tb.gid,OBJECT_tb.name,OBJECT_tb.alternative,OBJECT_tb.source_Author,OBJECT_tb.CFM_version,OBJECT_tb.model_description,OBJECT_tb.descriptor,OBJECT_tb.strike,OBJECT_tb.dip,OBJECT_tb.area,OBJECT_tb.exposure,OBJECT_tb.final_slip_sense,OBJECT_tb.reference,OBJECT_tb.reference_check,OBJECT_tb.ID_comments,OBJECT_tb.USGS_ID,REGION_tb.name from OBJECT_tb,REGION_tb where REGION_tb.abb=$1 and REGION_tb.gid=OBJECT_tb.REGION_tb_gid";

$result = pg_prepare($dbconn, "my_query", $query);

$data = array($q);

print "looking up for : ";
print $q;
$result = pg_execute($dbconn, "my_query", $data);

$metaList=array();
while($row = pg_fetch_row($result)) {
    array_push($metaList, makeObj($row));
}

$metastring = htmlspecialchars(json_encode($metaList), ENT_QUOTES, 'UTF-8');

echo "<div data-side=\"metaByRegion\" data-params=\"";
echo $metastring;
echo "\" style=\"display:flex\"></div>";
pg_close($dbconn);
?>
</body>
</html>

