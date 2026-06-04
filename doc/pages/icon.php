<?php
// 防止直接访问
if (!defined('ACCESS_FROM_INDEX')) {
    http_response_code(403);
    die('Direct access forbidden.');
}
$PAGE_CONTEXT = $PAGE_CONTEXT ?? [];
$version = $PAGE_CONTEXT['version'] ?? '';
if ($version === 'blue' || $version === '') {
    include __DIR__ . '/icon-img.php';
} else {
    include __DIR__ . '/icon-fa.php';
}
?>