<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$name        = trim(strip_tags($_POST['name'] ?? ''));
$email       = trim(strip_tags($_POST['email'] ?? ''));
$project     = trim(strip_tags($_POST['project'] ?? ''));
$rating      = intval($_POST['rating'] ?? 0);
$review      = trim(strip_tags($_POST['review'] ?? ''));
$permission  = isset($_POST['permission']) ? 'Yes' : 'No';

if (!$name || !$review || $rating < 1 || $rating > 5) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please fill in all required fields.']);
    exit;
}

if ($email && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please enter a valid email address.']);
    exit;
}

$stars = str_repeat('★', $rating) . str_repeat('☆', 5 - $rating);

$body = "New review submitted on Raedwulf Productions\n";
$body .= "================================================\n\n";
$body .= "Name:          {$name}\n";
$body .= "Email:         " . ($email ?: '(not provided)') . "\n";
$body .= "Project:       " . ($project ?: '(not provided)') . "\n";
$body .= "Rating:        {$stars} ({$rating}/5)\n";
$body .= "Show on site:  {$permission}\n\n";
$body .= "Review:\n{$review}\n";

$to      = 'ben@benmuratet.com';
$subject = "New Review from {$name} — Raedwulf Productions";
$headers = "From: noreply@raedwulfproductions.com\r\n";
$headers .= "Reply-To: " . ($email ?: 'noreply@raedwulfproductions.com') . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$sent = mail($to, $subject, $body, $headers);

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Review submitted. Thank you.']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Mail could not be sent. Please try again or email directly.']);
}
