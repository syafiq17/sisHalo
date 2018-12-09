<?php
//$kodetable = $_POST['q'];

header("Content-type: text/xml");
echo "<?xml version=\"1.0\" ?>\n";
echo "<fields>\n";

// Opening the file for reading...
$fp = fopen('../data/mfield.csv', 'r');

// Headrow
$head = fgetcsv($fp, 4096, ',', '"');

$nmfield = array();
$year = array();
$idfield = array();
$result = array();
// Rows
$x= 0;
while($column = fgetcsv($fp, 4096, ',', '"'))
{
    								
    
    $column = array_combine($head, $column);
    
    //if ($column['nmfile']== $kodetable  ){

        $nmfield[$x] = $column['year'];
        $year[$x] = $column['year'];
        $idfield[$x] = $column['idfield'];
        $resultnm = array_unique($year);
        $resultyear = array_unique($year);
        $resultid = array_unique($idfield);

        $x++;        
    //}    
}
//print_r($result);
$resultnm = array_values($resultnm); 
for ($x = 0; $x < count($resultnm); $x++) {
    //echo "The number is: $result[$x] <br>";
    echo "<field>\n\t<id>".$resultnm[$x]."</id>\n\t<name>".$resultnm[$x]."</name>\n</field>\n";
/*     echo "<field>\n\t<id>".$resultid[$x]."</id>\n\t<name>".$resultnm[$x]."</name>\n</field>\n";
	*/
}

echo "</fields>";