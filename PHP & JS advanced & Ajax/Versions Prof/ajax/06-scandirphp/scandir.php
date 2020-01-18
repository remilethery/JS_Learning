<?php

$images = glob('img/*.{jpg,png,gif}',GLOB_BRACE);
echo json_encode($images);