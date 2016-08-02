<?php

$currentTime = time();

// 남은 시간 안내 메세지
$remainText = "2016년 10월 8일 결혼식까지 남은 시간은";

// 하단 메세지
$welcomeText = "꼭 와주실거죠?";
        
        
// 1주일 전            
if ($currentTime >= strtotime("-1 week", mktime(0, 0, 0, 10, 08, 2016))) {
    $welcomeText = "긴장되는 1주일, 꼭 와주실거죠?";
} 

// 당일
if ($currentTime >= mktime(0, 0, 0, 10, 08, 2016)) {
    $remainText = "오늘은 정병열 <i class=\"fa fa-heart icon-first\" style=\"color:#ED5A64\"></i> 김재영의 결혼식입니다.";
    $welcomeText = "먼저 가서 기다리고 있겠습니다.";
} 

// 당일 1시간 전
if ($currentTime >= mktime(13, 0, 0, 10, 08, 2016)) {
    $welcomeText = "아직 늦지 않았습니다! 서둘러 주세요~";
} 

// 당일 0시간 전
if ($currentTime >= mktime(14, 0, 0, 8, 1, 2016)) {
    $welcomeText = "결혼식이 시작되었습니다. 참석해주신 내빈 여러분 감사합니다.";
} 

//당일 15시 이후
if ($currentTime >= mktime(15, 0, 0, 10, 08, 2016)) {
    $welcomeText = "오늘 와주신 분들께 진심으로 감사드립니다. 여러분들의 응원을 꼭 기억하여 행복하게 잘 살겠습니다.";
}

die(json_encode(array('remainText' => $remainText, 'welcomeText' =>$welcomeText), JSON_UNESCAPED_UNICODE));

