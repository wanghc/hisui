<?php
$version = $PAGE_CONTEXT['version'] ?? '';
if ($version === 'blue' || $version === '') {
    include __DIR__ . '/icon-img.php';
} else {
    include __DIR__ . '/icon-fa.php';
}
?>