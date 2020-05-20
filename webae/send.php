<?php
$items = json_encode($_POST["items"]);
$items = substr($items, 1);
$items = substr($items, 0, -1);
$items = str_replace('\\"', '"', $items);
file_put_contents("items.json", $items);