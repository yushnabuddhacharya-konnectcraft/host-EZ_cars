<?php
$data = array(
    'status' => "error",
    'msg' => '<div class="alert alert-danger">Something went wrong!</div>'
);
if( isset( $_POST['action'] ) && $_POST['action'] == "sendEmail" ){
	$errmsg = array();

	// init error message 
	$errmsg = array();

	// Check if name has been entered
	if (!$_POST['name']) {
		$errmsg[] = '<p>Please enter your name.</p>';
	}
  
	// Check if email has been entered
	if ( ! $_POST['email'] ) {
		$errmsg[] = '<p>Please enter your email address.</p>';
	}
	
	// Check if email is valid
	if ( !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
		$errmsg[] = '<p>Please enter a valid email address</p>';
	}
	
	// Check if name has been entered
	if (!$_POST['phone']) {
		$errmsg[] = '<p>Please enter your phone.</p>';
	}

	//Check if message has been entered
	if (!$_POST['message']) {
		$errmsg[] = '<p>Please enter your message.</p>';
	}

	if ( ! empty( $errmsg ) ) {
    	$errors = implode(' ', $errmsg ) ;
        $result = '<div class="alert alert-danger"><p>Enter required fields.</p>' . $errors . '</div>';
        $data   = array(
            'status' => "error",
            'msg'    => $result
        );
    } else {
		$name    = $_POST['name'];              // Sender's name
		$email   = $_POST['email'];             // Sender's email address
		$phone   = $_POST['phone'];             // Sender's email address
		$message = $_POST['message'];           // Sender's message  
		
		$to      = 'demo@domain.com';           // Recipient's email address
		$subject = 'Message from Contact Demo';
		$body    = "From: $name \n E-Mail: $email \n Phone : $phone \n Message : $message"  ;
		$headers = 'From: Demo Contact Form <demo@domain.com>' . "\r\n";

		if ( mail( $to, $subject, $body, $headers ) ) {
			$result='<div class="alert alert-success">Thank you for contacting us. Your message has been successfully sent. We will contact you very soon!</div>'; 
		} 
		else {
			$result='<div class="alert alert-danger">Sorry there was an error sending your message. Please try again later.</div>';
		}
		$data = array(
            'status' => "success",
            'msg'    => $result
        );
	}
	header('Content-Type: application/json');
	echo json_encode( $data );
    exit();
}
echo json_encode( $data );
