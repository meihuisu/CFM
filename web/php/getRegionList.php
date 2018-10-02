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
$dbconn = pg_connect("host=localhost port=5432 dbname=mei_test user=webonly password=scec");
if (!$dbconn) { die('Could not connect'); }

$query = "SELECT name,abb FROM REGION_tb";
$result = pg_query($dbconn, $query);

echo "
<form autocomplete=\"off\"> <select name=\"users\" onchange=\"searchByRegion(this.value)\">
  <option value=\"\">  Click to select</option>";

while($row = pg_fetch_row($result)) {
    echo "<option value=\"" . $row[1] . "\">". $row[0] . "</option>";
}

echo "</select></form>";
pg_close($dbconn);
?>
</body>
</html>

