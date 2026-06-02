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
$permission  = isset($_POST['permission']) ? 1 : 0;

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

// Save to database
require_once __DIR__ . '/db-config.php';

try {
    $pdo = new PDO(
        'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
        DB_USER,
        DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    $pdo->exec("CREATE TABLE IF NOT EXISTS reviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        project VARCHAR(255),
        rating TINYINT NOT NULL,
        review TEXT NOT NULL,
        permission TINYINT(1) DEFAULT 0,
        status ENUM('pending','approved','rejected') DEFAULT 'pending',
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");

    $stmt = $pdo->prepare(
        "INSERT INTO reviews (name, email, project, rating, review, permission)
         VALUES (:name, :email, :project, :rating, :review, :permission)"
    );
    $stmt->execute([
        ':name'       => $name,
        ':email'      => $email ?: null,
        ':project'    => $project ?: null,
        ':rating'     => $rating,
        ':review'     => $review,
        ':permission' => $permission,
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Could not save review. Please try again.']);
    exit;
}

// Send email notification
$stars   = str_repeat('★', $rating) . str_repeat('☆', 5 - $rating);
$display = $permission ? 'Yes' : 'No';

$body = "New review submitted on Raedwulf Productions\n";
$body .= "================================================\n\n";
$body .= "Name:          {$name}\n";
$body .= "Email:         " . ($email ?: '(not provided)') . "\n";
$body .= "Project:       " . ($project ?: '(not provided)') . "\n";
$body .= "Rating:        {$stars} ({$rating}/5)\n";
$body .= "Show on site:  {$display}\n\n";
$body .= "Review:\n{$review}\n";

$to      = 'ben@benmuratet.com';
$subject = "New Review from {$name} — Raedwulf Productions";
$headers = "From: noreply@raedwulfproductions.com\r\n";
$headers .= "Reply-To: " . ($email ?: 'noreply@raedwulfproductions.com') . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

mail($to, $subject, $body, $headers);

echo json_encode(['success' => true, 'message' => 'Review submitted. Thank you.']);
