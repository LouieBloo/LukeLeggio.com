<?php


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // collect value of input field
    $lukesName = $_REQUEST['fname'];
    if (empty($lukesName)) {
        echo "Name is empty";
    } else {
        echo $lukesName;
    }
}


?>