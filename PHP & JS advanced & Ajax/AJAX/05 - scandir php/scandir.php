<?php
// Scandir version PHP //

$images = glob("img/*.{jpg,png,jpeg,gif}", GLOB_BRACE);
echo json_encode($images);


?>