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

$dbconn = pg_connect("host=localhost port=5432 dbname=mei_test user=webonly password=scec");
if (!$dbconn) { die('Could not connect'); }

$query = "SELECT OBJECT_tb_idx, name FROM OBJECT_tb WHERE to_tsvector(name) @@ to_tsquery($1)";
$result = pg_prepare($dbconn, "my_query", $query);

$data = array($q);

print "looking up for : ";
print $q;
$result = pg_execute($dbconn, "my_query", $data);

echo "<table>
<tr>
<th>idx</th>
<th>CFM5.2 Fault Object Name</th>
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
