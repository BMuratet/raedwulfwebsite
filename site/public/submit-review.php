<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$name       = trim(strip_tags($_POST['name'] ?? ''));
$email      = trim(strip_tags($_POST['email'] ?? ''));
$project    = trim(strip_tags($_POST['project'] ?? ''));
$rating     = intval($_POST['rating'] ?? 0);
$review     = trim(strip_tags($_POST['review'] ?? ''));
$permission = isset($_POST['permission']) ? 1 : 0;

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

require_once __DIR__ . '/db-config.php';

// Save to database
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

// Send notification via Gmail SMTP
$stars   = str_repeat('★', $rating) . str_repeat('☆', 5 - $rating);
$display = $permission ? 'Yes' : 'No';

$subject = "New Review from {$name} — Raedwulf Productions";
$body    = "New review submitted on Raedwulf Productions\r\n";
$body   .= "================================================\r\n\r\n";
$body   .= "Name:          {$name}\r\n";
$body   .= "Email:         " . ($email ?: '(not provided)') . "\r\n";
$body   .= "Project:       " . ($project ?: '(not provided)') . "\r\n";
$body   .= "Rating:        {$stars} ({$rating}/5)\r\n";
$body   .= "Show on site:  {$display}\r\n\r\n";
$body   .= "Review:\r\n{$review}\r\n";

smtp_send(SMTP_USER, NOTIFY_TO, $subject, $body, SMTP_USER, SMTP_PASS);

echo json_encode(['success' => true, 'message' => 'Review submitted. Thank you.']);

// ---

function smtp_send($from, $to, $subject, $body, $user, $pass) {
    $fp = @fsockopen('ssl://smtp.gmail.com', 465, $errno, $errstr, 15);
    if (!$fp) return false;

    $read = function() use ($fp) {
        $out = '';
        while ($line = fgets($fp, 515)) {
            $out .= $line;
            if (substr($line, 3, 1) === ' ') break;
        }
        return $out;
    };

    $read();
    fputs($fp, "EHLO raedwulfproductions.com\r\n"); $read();
    fputs($fp, "AUTH LOGIN\r\n");                   $read();
    fputs($fp, base64_encode($user) . "\r\n");      $read();
    fputs($fp, base64_encode($pass) . "\r\n");      $read();
    fputs($fp, "MAIL FROM:<{$from}>\r\n");          $read();
    fputs($fp, "RCPT TO:<{$to}>\r\n");              $read();
    fputs($fp, "DATA\r\n");                         $read();

    $headers  = "From: Raedwulf Productions <{$from}>\r\n";
    $headers .= "To: {$to}\r\n";
    $headers .= "Subject: {$subject}\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    fputs($fp, $headers . "\r\n" . $body . "\r\n.\r\n"); $read();
    fputs($fp, "QUIT\r\n");
    fclose($fp);
    return true;
}
