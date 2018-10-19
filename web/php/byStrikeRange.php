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

$min = floatVal($_GET['min']);
$max = floatVal($_GET['max']);

$query = "SELECT gid,name,strike FROM OBJECT_tb WHERE strike IS NOT NULL AND strike > $1 AND strike < $2";
$result = pg_prepare($dbconn, "my_query", $query);

$data = array($min,$max);
$result = pg_execute($dbconn, "my_query", $data);

$arr = array();
$idx = 0;

echo "<table>
<tr>
<th>gid</th>
<th>CFM5.2 Fault Object Name</th>
<th>strike</th>
</tr>";
while($row = pg_fetch_row($result)) {
    echo "<tr>";
    echo "<td>" . $row[0] . "</td>";
    echo "<td>" . $row[1] . "</td>";
    echo "<td>" . $row[2] . "</td>";
    echo "</tr>";
    $arr[$idx] = intVal($row[0]);
    $idx += 1;
}
echo "</table>";

$arrstring = htmlspecialchars(json_encode($arr,JSON_FORCE_OBJECT), ENT_QUOTES, 'UTF-8');
echo "<div data-side=\"gitListByStrikeRange\" data-params=\""; 
echo $arrstring;
echo "\" style=\"display:flex\"></div>";

pg_close($dbconn);
?>
</body>
</html>

