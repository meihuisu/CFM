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

$lat = floatVal($_GET['lat']);
$lon = floatVal($_GET['lon']);
$minlat = $lat-0.0001;
$maxlat = $lat+0.0001;
$minlon = $lon-0.0001;
$maxlon = $lon+0.0001;

echo "lat range: ", $minlat,", ",$maxlat,"<br>";
echo "lon range: ", $minlon,", ",$maxlon,"<br>";

$query00 = "SELECT OBJECT_tb.name, TRACE_tb.gid from TRACE_tb INNER JOIN OBJECT_tb ON TRACE_tb.gid = OBJECT_tb.trace_tb_gid where ST_Intersects(ST_MakePoint($1,$2)::geography, (ST_Transform(geom,4326)::geography))";

$query01 = "SELECT OBJECT_tb.gid, OBJECT_tb.name, TRACE_tb.gid from TRACE_tb INNER JOIN OBJECT_tb ON TRACE_tb.gid = OBJECT_tb.trace_tb_gid where TRACE_tb.geom && ST_Transform(ST_MakeEnvelope( $1, $2, $3, $4, 4326), 26711)";

$query = "SELECT OBJECT_tb.gid,OBJECT_tb.name,OBJECT_tb.alternative,OBJECT_tb.source_Author,OBJECT_tb.CFM_version,OBJECT_tb.model_description,OBJECT_tb.descriptor,OBJECT_tb.strike,OBJECT_tb.dip,OBJECT_tb.area,OBJECT_tb.exposure,OBJECT_tb.final_slip_sense,OBJECT_tb.reference,OBJECT_tb.reference_check,OBJECT_tb.ID_comments,OBJECT_tb.USGS_ID,TRACE_tb.gid from TRACE_tb INNER JOIN OBJECT_tb ON TRACE_tb.gid = OBJECT_tb.trace_tb_gid where TRACE_tb.geom && ST_Transform(ST_MakeEnvelope( $1, $2, $3, $4, 4326), 26711)";
$result = pg_prepare($dbconn, "my_query", $query);

$data = array($minlon, $minlat, $maxlon, $maxlat);
$result = pg_execute($dbconn, "my_query", $data);

$metaList=array();

while($row = pg_fetch_row($result)) {
    array_push($metaList, makeObj($row));
}

$metastring = htmlspecialchars(json_encode($metaList), ENT_QUOTES, 'UTF-8');

echo "<div data-side=\"metaByLatLon\" data-params=\"";
echo $metastring;
echo "\" style=\"display:flex\"></div>";

pg_close($dbconn);
?>
</body>
</html>

