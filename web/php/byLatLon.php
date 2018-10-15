<!DOCTYPE html>
<html>
<head>
<style>
table {
    width: 100%;
    border-collapse: collapse;
}

table, td, th {
    border: 1px solid black;
    padding: 5px;
}

th {text-align: left;}
</style>
</head>
<body>

<?php
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

$query0 = "SELECT OBJECT_tb.name, TRACE_tb.gid from TRACE_tb INNER JOIN OBJECT_tb ON TRACE_tb.gid = OBJECT_tb.trace_tb_gid where ST_Intersects(ST_MakePoint($1,$2)::geography, (ST_Transform(geom,4326)::geography))";

$query = "SELECT OBJECT_tb.name, TRACE_tb.gid from TRACE_tb INNER JOIN OBJECT_tb ON TRACE_tb.gid = OBJECT_tb.trace_tb_gid where TRACE_tb.geom && ST_Transform(ST_MakeEnvelope( $1, $2, $3, $4, 4326), 26711)";
$result = pg_prepare($dbconn, "my_query", $query);

$data = array($minlon, $minlat, $maxlon, $maxlat);
$result = pg_execute($dbconn, "my_query", $data);

echo "<table>
<tr>
<th>CFM5.2 Fault Object Name</th>
<th>trace_tb:gid</th>
</tr>";
while($row = pg_fetch_row($result)) {
    echo "<tr>";
    echo "<td>" . $row[0] . "</td>";
    echo "<td>" . $row[1] . "</td>";
    echo "</tr>";
}
echo "</table>";

pg_close($dbconn);
?>
</body>
</html>

