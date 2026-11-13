<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$host = '191.6.138.226';
$port = 3306;
$waitTimeoutInSeconds = 5; 

echo "<h3>Testando conexão de socket...</h3>";

if($fp = fsockopen($host, $port, $errCode, $errStr, $waitTimeoutInSeconds)){   
   echo "✅ SUCESSO: O PHP conseguiu alcançar o IP externo na porta 3306.";
   fclose($fp);
} else {
   echo "❌ ERRO: O PHP não conseguiu alcançar o IP externo.<br>";
   echo "Código do Erro: " . $errCode . "<br>";
   echo "Mensagem: " . $errStr;
}
?>