<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php
$dbconn = pg_connect("host=localhost port=5432 dbname=CFM5_db user=webonly password=scec");
if (!$dbconn) { die('Could not connect'); }

$query = "SELECT strike FROM OBJECT_tb";
$result = pg_query($dbconn, $query);


$max=0;
$min=1000;
while($row = pg_fetch_row($result)) {
    if ($row[0] == "")
       continue;
    if($row[0] > $max)
       $max=$row[0];
    if($row[0] < $min)
       $min=$row[0];
}

$arr = array('min' => $min, 'max' => $max);
$arrstring = htmlspecialchars(json_encode($arr), ENT_QUOTES, 'UTF-8');

echo "<div data-side=\"strike-range\" data-params=\"";
echo $arrstring;
echo "\" style=\"display:flex\"> Strike range: ";
echo "<input type=\"text\" id=\"strike-range\" readonly style=\"border:0; color:orange; text-align:center;\"><button id=\"strikeBtn\" type=\"button\" title=\"search with strike range\" class=\"btn btn-default\" style=\"border:0; color:blue\" onclick=\"searchWithStrikeRange()\"><span class=\"glyphicon glyphicon-search\"></span></button></div><div id=\"slider-strike-range\"></div><br>";

pg_close($dbconn);
?>
</body>
</html>

