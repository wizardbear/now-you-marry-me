<?php
// var_dump($_POST);
// error_reporting(0);
if ($_GET['m'] == 'show-recent-messages') {
    $db = new SQLite3('wedding.sqlite');
    $sql = "select * from guestbook order by timestamp desc limit 2";
    $result = $db->query($sql);
    $ret = array();
    while($row = $result->fetchArray()) {
        $ret[] = $row;
    }
    // var_dump($ret);
    echo json_encode($ret);
    
}
else {
    extract($_POST);
    
    $timestamp = time();
    $meta = date('[Y-m-d H:i:s]',time());
    // name message timestamp meta
    try {
        $db = new SQLite3('wedding.sqlite');
        $sql = "insert into guestbook (name, message, timestamp, meta) values (:name, :message, :timestamp, :meta)";
        
        $stmt = $db->prepare($sql);
        $stmt->bindValue(':name', $name, SQLITE3_TEXT);
        $stmt->bindValue(':message', $message, SQLITE3_TEXT);
        $stmt->bindValue(':timestamp', $timestamp, SQLITE3_INTEGER);
        $stmt->bindValue(':meta', $meta, SQLITE3_TEXT);
        
        $result = $stmt->execute();
        if ($db->lastInsertRowID() > 0) echo $db->lastInsertRowID();
        else echo 'fail';
        
    }
    catch (Exception $e) {
        echo 'fail';
    }
    
    
    
}

