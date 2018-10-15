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
$q = ($_GET['q']);

$dbconn = pg_connect("host=localhost port=5432 dbname=CFM5_db user=webonly password=scec");
if (!$dbconn) { die('Could not connect'); }

$query = "SELECT OBJECT_tb.name,REGION_tb.name,OBJECT_tb.strike 
   from OBJECT_tb,REGION_tb 
   where REGION_tb.abb=$1 and REGION_tb.gid=OBJECT_tb.REGION_tb_gid";
$result = pg_prepare($dbconn, "my_query", $query);

$data = array($q);

print "looking up for : ";
print $q;
$result = pg_execute($dbconn, "my_query", $data);

echo "<table>
<tr>
<th>CFM5.2 Fault Object Name</th>
<th>strike</th>
</tr>";
while($row = pg_fetch_row($result)) {
    echo "<tr>";
    echo "<td>" . $row[0] . "</td>";
    if ($row[2] == "") {
        echo "<td> NA </td>";
        } else {
            echo "<td>" . $row[2] . "</td>";
    }
    echo "</tr>";
}
echo "</table>";
pg_close($dbconn);
?>
</body>
</html>

