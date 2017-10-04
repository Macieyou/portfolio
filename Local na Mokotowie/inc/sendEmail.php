<?php

// Replace this with your own email address
$siteOwnersEmail = 'biuro@lokalnamokotowie.pl';


if($_POST) {

    $name = trim(stripslashes($_POST['contactName']));
    $email = trim(stripslashes($_POST['contactEmail']));
    $subject = trim(stripslashes($_POST['contactSubject']));
    $contact_message = trim(stripslashes($_POST['contactMessage']));

    // Check Name
    if (strlen($name) < 2) {
        $error['name'] = "Proszę wpisać swoje imię.";
    }
    // Check Email
    if (!preg_match('/^[a-z0-9&\'\.\-_\+]+@[a-z0-9\-]+\.([a-z0-9\-]+\.)*+[a-z]{2}/is', $email)) {
        $error['email'] = "
Proszę wpisać poprawny adres e-mai.";
    }
    // Check Message
    if (strlen($contact_message) < 15) {
        $error['message'] = "Wiadomość powinna zawierać minimum 15 znaków.";
    }
    // Subject
    if ($subject == '') { $subject = "Temat"; }


    // Set Message
    $message .= "Od: " . $name . "<br />";
    $message .= "Email: " . $email . "<br />";
    $message .= "Temat: " . $subject . "<br />";
    $message .= "Wiadomość: <br />";
    $message .= $contact_message;
    $message .= "<br /> ----- <br /> 
Ten e-mail został wysłany z formularza kontaktowego witryny. <br />";

    // Set From: header
    $from =  $name . " <" . $email . ">";

    // Email Headers
    $headers = "From: " . $from . "\r\n";
    $headers .= "Reply-To: ". $email . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";


    if (!$error) {

        ini_set("sendmail_from", $siteOwnersEmail); // for windows server
        $mail = mail($subject, $message, $headers, $siteOwnersEmail);

        if ($mail) { echo "OK"; }
        else { echo "
Coś poszło nie tak. Proszę spróbuj ponownie."; }

    } # end if - no validation error

    else {

        $response = (isset($error['name'])) ? $error['name'] . "<br /> \n" : null;
        $response .= (isset($error['email'])) ? $error['email'] . "<br /> \n" : null;
        $response .= (isset($error['message'])) ? $error['message'] . "<br />" : null;

        echo $response;

    } # end if - there was a validation error

}

?>