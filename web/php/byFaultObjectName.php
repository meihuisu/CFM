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

$query = "SELECT gid,name,alternative,source_Author,CFM_version,model_description,descriptor,strike,dip,area,exposure,final_slip_sense,reference,reference_check,ID_comments,USGS_ID FROM OBJECT_tb WHERE name = $1";

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

echo "<div data-side=\"metaByFaultName\" data-params=\""; 
echo $metastring;
echo "\" style=\"display:flex\"></div>"; 

pg_close($dbconn);
?>    
</body>
</html>

