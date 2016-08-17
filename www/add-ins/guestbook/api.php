<?php
// var_dump($_POST);
// error_reporting(0);

function getTotalCount($db) {

    $sql = "select count(*) cnt from guestbook";
    $result = $db->query($sql);
    $countResult = $result->fetchArray();
    
    $totalCount = $countResult['cnt'];
    return $totalCount;
}

if ($_GET['m'] == 'show-recent-messages') {
    $db = new SQLite3('wedding.sqlite');
    $sql = "select * from guestbook order by timestamp desc limit 4";
    $result = $db->query($sql);
    $data = array();
    while($row = $result->fetchArray()) {
        $data[] = $row;
    }
    // var_dump($ret);
    $totalCount = getTotalCount($db);

    echo json_encode(array(
        'data' => $data,
        'totalPage' => $totalPage,
        'currentPage' => 1,
        ));
    
}
elseif ($_GET['m'] == 'show-more-messages') {
    $minMsgId = $_GET['minMsgId'];
    $db = new SQLite3('wedding.sqlite');
    $sql = "select * from guestbook where id < :minMsgId order by timestamp desc limit 4";

    $stmt = $db->prepare($sql);
    $stmt->bindValue(':minMsgId', $minMsgId, SQLITE3_INTEGER);
    $result = $stmt->execute();

    $data = array();
    while($row = $result->fetchArray()) {
        $data[] = $row;
    }
    // var_dump($ret);
    $totalCount = getTotalCount($db);

    echo json_encode(array(
        'data' => $data,
        'totalPgae' => $totalPage,
        'currentPage' => 1,
        ));
    
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
        
        $totalCount = getTotalCount($db);

        $result = $stmt->execute();
        if ($db->lastInsertRowID() > 0) {
            $code = $db->lastInsertRowID();
        }
        else {
            $code = 'fail';
        }

        echo json_encode(array(
            'code' => $code,
            'totalPage' => $totalPage,
            ));    

    }
    catch (Exception $e) {
        echo json_encode(array(
            'code' => $code,
            ));    
    }
    
    
    
}

