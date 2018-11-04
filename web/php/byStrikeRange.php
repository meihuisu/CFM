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

$min = floatVal($_GET['min']);
$max = floatVal($_GET['max']);

$query = "SELECT gid,name,alternative,source_Author,CFM_version,model_description,descriptor,strike,dip,area,exposure,final_slip_sense,reference,reference_check,ID_comments,USGS_ID FROM OBJECT_tb WHERE strike IS NOT NULL AND strike > $1 AND strike < $2";

$result = pg_prepare($dbconn, "my_query", $query);

$data = array($min,$max);
$result = pg_execute($dbconn, "my_query", $data);

$metaList=array();

while($row = pg_fetch_row($result)) {
    array_push($metaList, makeObj($row));
}

$metastring = htmlspecialchars(json_encode($metaList), ENT_QUOTES, 'UTF-8');

echo "<div data-side=\"metaByStrikeRange\" data-params=\"";
echo $metastring;
echo "\" style=\"display:flex\"></div>";

pg_close($dbconn);
?>
</body>
</html>

