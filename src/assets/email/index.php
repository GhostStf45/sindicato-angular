<?php

require __DIR__ . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if(isset($_GET["key"]) && $_GET["key"] == "AIzaSyACGsYD_RQ62dON-rMJhfNhHFEa355eV1E"){

	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
	header('content-type: application/json; charset=utf-8');

	if(isset($_POST["email"]) && $_POST["email"] == "yes"){

		/*=============================================
		Enviamos correo electrónico
		=============================================*/

		date_default_timezone_set("America/Lima");

		$mail = new PHPMailer;

		$mail->Charset = "UTF-8";

		$mail->isMail();

		$mail->setFrom("noreply@sindicatoSUTRASAF.com", "Sindicato SUTRASAF");

		$mail->Subject  = $_POST["comment"];

		$mail->addAddress($_POST["address"]);

		$mail->msgHTML('

			<div>

				Hola, '.$_POST["name"].':

				<a href="'.$_POST["url"].'">Click this link for more information</a>

				Ha recibido una actualizacion de su perfil o ha recibido un mensaje nuevo

				Gracias,

				Sindicato Unitario de Trabajadores de Saga Falabella

			</div>

		');

		$send = $mail->Send();

		if(!$send){

			$json = array(

			 	'status' => 404,
			 	'result' =>$mail->ErrorInfo

			);

			echo json_encode($json, true);

			return;

		}else{

			$json = array(

			 	'status' => 200,
			 	'result' =>"ok"

			);

			echo json_encode($json, true);

			return;
		}
	}


}
