<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php

$dbconn = pg_connect("host=localhost port=5432 dbname=CFM5_db user=webonly password=scec");
if (!$dbconn) { die('Could not connect'); }

$query = "SELECT gid,name,url FROM OBJECT_1000m_tb";
$result = pg_query($dbconn, $query);

$obj1000mList=array();

while($row = pg_fetch_row($result)) {
    $item = new \stdClass();
    $item->gid=$row[0];
    $item->name=$row[1];
    $item->url=$row[2];
    array_push($obj1000mList, json_encode($item));
}

$objstring = htmlspecialchars(json_encode($obj1000mList), ENT_QUOTES, 'UTF-8');

echo "<div data-side=\"obj1000m\" data-params=\"";
echo $objstring;
echo "\" style=\"display:flex\"></div>";

pg_close($dbconn);
?>
</body>
</html>

